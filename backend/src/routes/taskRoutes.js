// routes/taskRoutes.js
const express = require('express');

function setupTaskRoutes(router, taskController) {
  router.post('/tasks', (req, res) => taskController.createTask(req, res));
  router.get('/tasks', (req, res) => taskController.listAllTasks(req, res));
  router.get('/tasks/filter/pending', (req, res) => taskController.pendingTasks(req, res));
  router.get('/tasks/filter/completed', (req, res) => taskController.completedTasks(req, res));
  router.get('/tasks/:id', (req, res) => taskController.getTask(req, res));
  router.put('/tasks/:id/complete', (req, res) => taskController.completeTask(req, res));
  router.delete('/tasks/:id', (req, res) => taskController.removeTask(req, res));
  
  return router;
}

module.exports = setupTaskRoutes;
