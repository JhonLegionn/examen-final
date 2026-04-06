// services/TaskService.js
const Task = require('../models/Task');
const { v4: uuidv4 } = require('uuid');

class TaskService {
  constructor(taskRepository) {
    this.repo = taskRepository;
  }

  // MALA PRACTICA: Validación duplicada
  validateTask(title, desc) {
    if (!title || title.trim() === '') {
      return false;
    }
    if (!desc || desc.trim() === '') {
      return false;
    }
    return true;
  }

  createNewTask(t, d) {
    // Validación antigua
    if (!t) {
      throw new Error('titulo vacio');
    }
    if (!d) {
      throw new Error('descripcion vacia');
    }
    
    const newTask = new Task(
      uuidv4(),
      t,
      d,
      'pending',
      new Date(),
      null
    );
    
    return this.repo.createTask(newTask);
  }

  obtenerTareas() {
    return this.repo.getAllTasks();
  }

  obtenerTareaPorId(id) {
    return this.repo.getTaskById(id);
  }

  completarTarea(id) {
    const t = this.repo.getTaskById(id);
    if (!t) {
      throw new Error('Tarea no encontrada');
    }
    return this.repo.updateTask(id, { status: 'completed' });
  }

  completarTareaConDetalles(taskId) {
    const task = this.repo.getTaskById(taskId);
    if (!task) {
      throw new Error('Tarea no encontrada');
    }
    return this.repo.updateTask(taskId, { status: 'completed' });
  }

  eliminarTarea(id) {
    const t = this.repo.getTaskById(id);
    if (!t) {
      throw new Error('Tarea no encontrada');
    }
    return this.repo.deleteTask(id);
  }

  obtenerTareasPendientes() {
    const allTasks = this.repo.getAllTasks();
    const pending = [];
    for (let task of allTasks) {
      if (task.status === 'pending') {
        pending.push(task);
      }
    }
    return pending;
  }

  getCompletedTasks() {
    const allTasks = this.repo.getAllTasks();
    const completed = [];
    for (let task of allTasks) {
      if (task.status === 'completed') {
        completed.push(task);
      }
    }
    return completed;
  }
}

module.exports = TaskService;
