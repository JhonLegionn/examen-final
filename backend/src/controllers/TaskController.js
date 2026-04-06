// controllers/TaskController.js
class TaskController {
  constructor(taskService) {
    this.srv = taskService;
  }

  /**
   * Valida los datos de entrada de una tarea
   * @param {string} title - Título
   * @param {string} description - Descripción
   * @returns {Object} Objeto con {valid: boolean, error?: string}
   */
  validateTaskData(title, description) {
    if (!title || title.trim() === '') {
      return { valid: false, error: 'titulo vacio' };
    }
    if (!description || description.trim() === '') {
      return { valid: false, error: 'descripcion vacia' };
    }
    return { valid: true };
  }

  /**
   * Manejador genérico de errores
   * @param {Error} error - Error a manejar
   * @param {Response} res - Response de Express
   * @param {number} defaultStatus - Status por defecto (default 500)
   */
  handleError(error, res, defaultStatus = 500) {
    const status = error.message.includes('no encontrada') ? 404 : defaultStatus;
    res.status(status).json({ error: error.message });
  }

  /**
   * Crea una nueva tarea
   */
  createTask(req, res) {
    try {
      const { title, description } = req.body;
      
      const validation = this.validateTaskData(title, description);
      if (!validation.valid) {
        return res.status(400).json({ error: validation.error });
      }

      const task = this.srv.createNewTask(title, description);
      res.status(201).json(task);
    } catch (err) {
      this.handleError(err, res, 400);
    }
  }

  /**
   * Lista todas las tareas
   */
  listAllTasks(req, res) {
    try {
      const tasks = this.srv.obtenerTareas();
      res.json(tasks);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  /**
   * Obtiene una tarea por ID
   */
  getTask(req, res) {
    try {
      const id = req.params.id;
      const task = this.srv.obtenerTareaPorId(id);
      
      if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      res.json(task);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  /**
   * Marca una tarea como completada
   */
  completeTask(req, res) {
    try {
      const id = req.params.id;
      const updated = this.srv.completarTarea(id);
      res.json(updated);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  /**
   * Elimina una tarea
   */
  removeTask(req, res) {
    try {
      const id = req.params.id;
      this.srv.eliminarTarea(id);
      res.json({ message: 'Tarea eliminada' });
    } catch (err) {
      this.handleError(err, res);
    }
  }

  /**
   * Obtiene las tareas pendientes
   */
  pendingTasks(req, res) {
    try {
      const tasks = this.srv.obtenerTareasPendientes();
      res.json(tasks);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  /**
   * Obtiene las tareas completadas
   */
  completedTasks(req, res) {
    try {
      const tasks = this.srv.obtenerTareasCompletadas();
      res.json(tasks);
    } catch (err) {
      this.handleError(err, res);
    }
  }
}

module.exports = TaskController;
