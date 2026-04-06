// controllers/TaskController.js
class TaskController {
  constructor(taskService) {
    this.srv = taskService;
  }

  createTask(req, res) {
    try {
      const { title, description } = req.body;

      // Validacion repetida
      if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'titulo vacio' });
      }
      if (!description || description.trim() === '') {
        return res.status(400).json({ error: 'descripcion vacia' });
      }

      const task = this.srv.createNewTask(title, description);
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  listAllTasks(req, res) {
    try {
      const tasks = this.srv.obtenerTareas();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  getTask(req, res) {
    try {
      const id = req.params.id;
      const task = this.srv.obtenerTareaPorId(id);
      if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  completeTask(req, res) {
    try {
      const id = req.params.id;
      const updated = this.srv.completarTarea(id);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  removeTask(req, res) {
    try {
      const id = req.params.id;
      const t = this.srv.obtenerTareaPorId(id);

      if (!t) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }

      const success = this.srv.eliminarTarea(id);
      if (success) {
        res.json({ message: 'Tarea eliminada' });
      } else {
        res.status(500).json({ error: 'Error al eliminar' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  pendingTasks(req, res) {
    try {
      const tasks = this.srv.obtenerTareasPendientes();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = TaskController;
