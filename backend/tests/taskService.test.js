// backend/tests/taskService.test.js
const TaskService = require('../src/services/TaskService');
const Task = require('../src/models/Task');

// Mock del Repository
class MockTaskRepository {
  constructor() {
    this.tasks = [];
  }

  getAllTasks() { return this.tasks; }
  getTaskById(id) { return this.tasks.find(t => t.id === id); }
  
  createTask(task) {
    this.tasks.push(task);
    return task;
  }

  updateTask(id, data) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      Object.assign(task, data);
      return task;
    }
    return null;
  }

  deleteTask(id) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }
}

describe('TaskService', () => {
  let taskService;
  let mockRepo;

  beforeEach(() => {
    mockRepo = new MockTaskRepository();
    taskService = new TaskService(mockRepo);
  });

  test('Debe crear una tarea válida correctamente', () => {
    const task = taskService.createNewTask('Mi tarea', 'Descripción de la tarea');
    
    expect(task).toBeDefined();
    expect(task.title).toBe('Mi tarea');
    expect(task.description).toBe('Descripción de la tarea');
    expect(task.status).toBe('pending');
    expect(task.id).toBeDefined();
  });

  test('Debe lanzar error cuando el título está vacío', () => {
    expect(() => taskService.createNewTask('', 'Descripción')).toThrow('titulo vacio');
  });

  test('Debe lanzar error cuando la descripción está vacía', () => {
    expect(() => taskService.createNewTask('Título', '')).toThrow('descripcion vacia');
  });

  test('Debe obtener todas las tareas', () => {
    taskService.createNewTask('Tarea 1', 'Desc 1');
    taskService.createNewTask('Tarea 2', 'Desc 2');
    
    const tasks = taskService.obtenerTareas();
    expect(tasks.length).toBe(2);
  });

  test('Debe obtener tareas pendientes correctamente', () => {
    const task1 = taskService.createNewTask('Tarea 1', 'Desc 1');
    const task2 = taskService.createNewTask('Tarea 2', 'Desc 2');
    
    taskService.completarTarea(task1.id);
    
    const pending = taskService.obtenerTareasPendientes();
    expect(pending.length).toBe(1);
    expect(pending[0].id).toBe(task2.id);
  });

  test('Debe marcar una tarea como completada', () => {
    const task = taskService.createNewTask('Tarea', 'Descripción');
    const completed = taskService.completarTarea(task.id);
    
    expect(completed.status).toBe('completed');
  });

  test('Debe lanzar error al completar tarea inexistente', () => {
    expect(() => taskService.completarTarea('id-inexistente')).toThrow('Tarea no encontrada');
  });

  test('Debe eliminar una tarea correctamente', () => {
    const task = taskService.createNewTask('Tarea', 'Descripción');
    const deleted = taskService.eliminarTarea(task.id);
    
    expect(deleted).toBe(true);
    expect(taskService.obtenerTareas().length).toBe(0);
  });

  test('Debe lanzar error al eliminar tarea inexistente', () => {
    expect(() => taskService.eliminarTarea('id-inexistente')).toThrow('Tarea no encontrada');
  });
});
