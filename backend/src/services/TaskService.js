// services/TaskService.js
const Task = require('../models/Task');
const { v4: uuidv4 } = require('uuid');

class TaskService {
  constructor(taskRepository) {
    this.repo = taskRepository;
  }

  /**
   * Valida que título y descripción no estén vacíos
   * @param {string} title - Título de la tarea
   * @param {string} description - Descripción de la tarea
   * @throws {Error} Si el título o descripción están vacíos
   */
  validateTaskInput(title, description) {
    if (!title || title.trim() === '') {
      throw new Error('titulo vacio');
    }
    if (!description || description.trim() === '') {
      throw new Error('descripcion vacia');
    }
  }

  /**
   * Obtiene una tarea por ID, lanzando error si no existe
   * @param {string} id - ID de la tarea
   * @returns {Task} La tarea encontrada
   * @throws {Error} Si la tarea no existe
   */
  getTaskOrThrow(id) {
    const task = this.repo.getTaskById(id);
    if (!task) {
      throw new Error('Tarea no encontrada');
    }
    return task;
  }

  /**
   * Filtra tareas por estado
   * @param {string} status - Estado a filtrar
   * @returns {Array} Array de tareas con ese estado
   */
  getTasksByStatus(status) {
    return this.repo.getAllTasks().filter(task => task.status === status);
  }

  /**
   * Crea una nueva tarea
   * @param {string} title - Título de la tarea
   * @param {string} description - Descripción de la tarea
   * @returns {Task} La tarea creada
   */
  createNewTask(title, description) {
    this.validateTaskInput(title, description);
    
    const newTask = new Task(
      uuidv4(),
      title,
      description,
      'pending',
      new Date(),
      null
    );
    
    return this.repo.createTask(newTask);
  }

  /**
   * Obtiene todas las tareas
   * @returns {Array} Array de todas las tareas
   */
  obtenerTareas() {
    return this.repo.getAllTasks();
  }

  /**
   * Obtiene una tarea por ID
   * @param {string} id - ID de la tarea
   * @returns {Task|null} La tarea o null
   */
  obtenerTareaPorId(id) {
    return this.repo.getTaskById(id);
  }

  /**
   * Marca una tarea como completada
   * @param {string} id - ID de la tarea
   * @returns {Task} La tarea actualizada
   */
  completarTarea(id) {
    this.getTaskOrThrow(id);
    return this.repo.updateTask(id, { status: 'completed' });
  }

  /**
   * Elimina una tarea
   * @param {string} id - ID de la tarea
   * @returns {boolean} true si se eliminó
   */
  eliminarTarea(id) {
    this.getTaskOrThrow(id);
    return this.repo.deleteTask(id);
  }

  /**
   * Obtiene todas las tareas pendientes
   * @returns {Array} Array de tareas pendientes
   */
  obtenerTareasPendientes() {
    return this.getTasksByStatus('pending');
  }

  /**
   * Obtiene todas las tareas completadas
   * @returns {Array} Array de tareas completadas
   */
  obtenerTareasCompletadas() {
    return this.getTasksByStatus('completed');
  }
}

module.exports = TaskService;
