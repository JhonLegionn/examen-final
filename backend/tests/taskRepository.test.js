// backend/tests/taskRepository.test.js
const TaskRepository = require('../src/repositories/TaskRepository');
const Task = require('../src/models/Task');
const fs = require('fs');
const path = require('path');

describe('TaskRepository', () => {
  let taskRepo;
  const testDataFile = path.join(__dirname, '../../data/tasks.json');

  beforeEach(() => {
    // Limpiar archivo de datos antes de cada test
    const dir = path.dirname(testDataFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (fs.existsSync(testDataFile)) {
      fs.unlinkSync(testDataFile);
    }
    taskRepo = new TaskRepository();
  });

  afterEach(() => {
    // Limpiar después de cada test
    if (fs.existsSync(testDataFile)) {
      fs.unlinkSync(testDataFile);
    }
  });

  test('Debe crear una tarea correctamente', () => {
    const task = new Task('1', 'Test Task', 'Test Description', 'pending', new Date(), null);
    const created = taskRepo.createTask(task);

    expect(created).toBeDefined();
    expect(created.title).toBe('Test Task');
    expect(taskRepo.getAllTasks().length).toBe(1);
  });

  test('Debe obtener todos las tareas', () => {
    const task1 = new Task('1', 'Task 1', 'Desc 1', 'pending', new Date(), null);
    const task2 = new Task('2', 'Task 2', 'Desc 2', 'pending', new Date(), null);

    taskRepo.createTask(task1);
    taskRepo.createTask(task2);

    const tasks = taskRepo.getAllTasks();
    expect(tasks.length).toBe(2);
  });

  test('Debe obtener una tarea por ID', () => {
    const task = new Task('123', 'Test Task', 'Test', 'pending', new Date(), null);
    taskRepo.createTask(task);

    const found = taskRepo.getTaskById('123');
    expect(found).toBeDefined();
    expect(found.title).toBe('Test Task');
  });

  test('Debe retornar null si tarea no existe', () => {
    const found = taskRepo.getTaskById('inexistente');
    expect(found).toBeNull();
  });

  test('Debe actualizar una tarea correctamente', () => {
    const task = new Task('1', 'Original', 'Desc', 'pending', new Date(), null);
    taskRepo.createTask(task);

    const updated = taskRepo.updateTask('1', { status: 'completed' });
    expect(updated.status).toBe('completed');
  });

  test('Debe eliminar una tarea correctamente', () => {
    const task = new Task('1', 'Task', 'Desc', 'pending', new Date(), null);
    taskRepo.createTask(task);

    const deleted = taskRepo.deleteTask('1');
    expect(deleted).toBe(true);
    expect(taskRepo.getAllTasks().length).toBe(0);
  });

  test('Debe persistir datos correctamente', () => {
    const task = new Task('1', 'Persistent Task', 'Desc', 'pending', new Date(), null);
    taskRepo.createTask(task);

    // Crear nuevo repositorio para verificar persistencia
    const newRepo = new TaskRepository();
    const tasks = newRepo.getAllTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Persistent Task');
  });
});
