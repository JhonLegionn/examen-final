-- database/schema.sql
-- Esquema de la base de datos para aplicación de gestión de tareas

CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    due_date DATETIME,
    CHECK (status IN ('pending', 'completed', 'cancelled'))
);

CREATE INDEX idx_status ON tasks(status);
CREATE INDEX idx_created_at ON tasks(created_at);

-- Datos iniciales opcionales
INSERT OR IGNORE INTO tasks (id, title, description, status) VALUES
('1', 'Revisar documentación', 'Revisar la documentación del proyecto', 'pending'),
('2', 'Implementar pruebas', 'Crear pruebas unitarias', 'pending'),
('3', 'Refactorizar código', 'Limpiar el código legacy', 'completed');
