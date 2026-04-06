// repositories/TaskRepository.js
const fs = require('fs');
const path = require('path');
const Task = require('../models/Task');

class TaskRepository {
  constructor() {
    this.dataFile = path.join(__dirname, '../../data/tasks.json');
    this.tasks = this.loadTasks();
  }

  /**
   * Asegura que existe el directorio de datos
   */
  ensureDataDirectory() {
    const dir = path.dirname(this.dataFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * Carga tareas del archivo JSON
   * @returns {Array} Array de tareas cargadas
   */
  loadTasks() {
    this.ensureDataDirectory();
    
    if (fs.existsSync(this.dataFile)) {
      const data = fs.readFileSync(this.dataFile, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  }

  /**
   * Persiste las tareas en el archivo JSON
   */
  saveTasks() {
    this.ensureDataDirectory();
    fs.writeFileSync(this.dataFile, JSON.stringify(this.tasks, null, 2));
  }

  /**
   * Obtiene todas las tareas
   * @returns {Array} Array de todas las tareas
   */
  getAllTasks() {
    return this.tasks;
  }

  /**
   * Obtiene una tarea por ID usando find
   * @param {string} id - ID de la tarea
   * @returns {Task|undefined} La tarea o undefined
   */
  getTaskById(id) {
    return this.tasks.find(t => t.id === id);
  }

  /**
   * Crea una nueva tarea
   * @param {Task} task - Tarea a crear
   * @returns {Task} La tarea creada
   */
  createTask(task) {
    this.tasks.push(task);
    this.saveTasks();
    return task;
  }

  /**
   * Actualiza una tarea existente
   * @param {string} id - ID de la tarea
   * @param {Object} data - Datos a actualizar
   * @returns {Task|null} La tarea actualizada o null
   */
  updateTask(id, data) {
    const taskIndex = this.tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return null;
    }

    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...data };
    this.saveTasks();
    return this.tasks[taskIndex];
  }

  /**
   * Elimina una tarea
   * @param {string} id - ID de la tarea a eliminar
   * @returns {boolean} true si se eliminó
   */
  deleteTask(id) {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);
    
    if (this.tasks.length < initialLength) {
      this.saveTasks();
      return true;
    }
    return false;
  }
}

module.exports = TaskRepository;
