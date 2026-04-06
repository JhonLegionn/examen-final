// assets/app.js
const API_URL = 'http://localhost:3000/api';

class TaskManager {
    constructor() {
        this.tasks = [];
        this.initEventListeners();
        this.loadTasks();
    }

    initEventListeners() {
        document.getElementById('newTaskBtn').addEventListener('click', () => this.showForm());
        document.getElementById('saveTaskBtn').addEventListener('click', () => this.addTask());
        document.getElementById('cancelBtn').addEventListener('click', () => this.hideForm());
    }

    showForm() {
        document.getElementById('taskForm').classList.remove('hidden');
    }

    hideForm() {
        document.getElementById('taskForm').classList.add('hidden');
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDesc').value = '';
    }

    async loadTasks() {
        try {
            const response = await fetch(`${API_URL}/tasks`);
            this.tasks = await response.json();
            this.renderTasks();
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }

    async addTask() {
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDesc').value;

        if (!title.trim() || !description.trim()) {
            alert('Por favor completa todos los campos');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description })
            });

            if (response.ok) {
                this.hideForm();
                this.loadTasks();
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    async completeTask(id) {
        try {
            await fetch(`${API_URL}/tasks/${id}/complete`, { method: 'PUT' });
            this.loadTasks();
        } catch (error) {
            console.error('Error completing task:', error);
        }
    }

    async deleteTask(id) {
        try {
            await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
            this.loadTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    renderTasks() {
        const container = document.getElementById('tasksList');
        container.innerHTML = '';

        this.tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = `task-item ${task.status === 'completed' ? 'completed' : ''}`;
            
            taskDiv.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.status === 'completed' ? 'checked' : ''} 
                    onchange="taskManager.completeTask('${task.id}')">
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    <div class="task-desc">${task.description}</div>
                </div>
                <div class="task-actions">
                    <button class="btn-delete" onclick="taskManager.deleteTask('${task.id}')">Delete</button>
                </div>
            `;
            
            container.appendChild(taskDiv);
        });
    }
}

const taskManager = new TaskManager();
