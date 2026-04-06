// models/Task.js
class Task {
  constructor(id, title, description, status, createdAt, dueDate) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.dueDate = dueDate;
  }
}

module.exports = Task;
