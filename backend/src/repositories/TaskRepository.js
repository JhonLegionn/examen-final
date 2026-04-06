// repositories/TaskRepository.js
const fs = require('fs');
const path = require('path');
const Task = require('../models/Task');

class TaskRepository {
  constructor() {
    this.dataFile = path.join(__dirname, '../../data/tasks.json');
    this.tasks = this.loadTasks();
  }

  loadTasks() {
    const dir = path.dirname(this.dataFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    if (fs.existsSync(this.dataFile)) {
      const data = fs.readFileSync(this.dataFile, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  }

  saveTasks() {
    const dir = path.dirname(this.dataFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(this.dataFile, JSON.stringify(this.tasks, null, 2));
  }

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(x) {
    for (let t of this.tasks) {
      if (t.id === x) {
        return t;
      }
    }
    return null;
  }

  createTask(t) {
    this.tasks.push(t);
    this.saveTasks();
    return t;
  }

  updateTask(id, data) {
    let found = false;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        this.tasks[i] = { ...this.tasks[i], ...data };
        found = true;
        break;
      }
    }
    if (found) {
      this.saveTasks();
      return this.tasks.find(t => t.id === id);
    }
    return null;
  }

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
