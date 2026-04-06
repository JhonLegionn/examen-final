// main.js - Punto de entrada de la aplicación
const express = require('express');
const bodyParser = require('body-parser');
const TaskRepository = require('./repositories/TaskRepository');
const TaskService = require('./services/TaskService');
const TaskController = require('./controllers/TaskController');
const setupTaskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Inicializar componentes
const taskRepo = new TaskRepository();
const taskService = new TaskService(taskRepo);
const taskController = new TaskController(taskService);

// Rutas
const router = express.Router();
setupTaskRoutes(router, taskController);
app.use('/api', router);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: 'API de Gestión de Tareas - Activa' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});

module.exports = app;
