ESTRUCTURA
project-exam/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuración
│   │   ├── controllers/     # Lógica HTTP
│   │   ├── services/        # Lógica de negocio
│   │   ├── models/          # Modelos de datos
│   │   ├── repositories/    # Acceso a datos
│   │   ├── routes/          # Rutas
│   │   └── main.js          # Punto de entrada
│   └── tests/               # Pruebas
├── frontend/
│   └── src/
│       ├── components/      # Componentes reutilizables
│       ├── pages/           # Páginas
│       ├── services/        # Consumo de API
│       ├── assets/          # CSS y JS
│       └── index.html
├── database/
│   └── schema.sql
├── docs/
│   └── architecture.md
├── package.json
├── .env
├── .gitignore
└── README.md
Tipo de Arquitectura
El proyecto sigue una arquitectura por capas, separando responsabilidades para mantener el código ordenado y fácil de mantener:
Presentación: interfaz en frontend y controladores
Lógica de negocio: servicios
Acceso a datos: repositorios
Modelos: definición de entidades
| Componente     | Responsabilidad         |
| -------------- | ----------------------- |
| Task Model     | Estructura de datos     |
| TaskRepository | Acceso y persistencia   |
| TaskService    | Reglas de negocio       |
| TaskController | Manejo de requests      |
| TaskRoutes     | Definición de endpoints |
| Frontend       | Interfaz de usuario     |
Mejoras Propuestas
Implementar inyección de dependencias para desacoplar módulos
Separar validaciones en una carpeta propia
Usar DTOs para controlar entrada y salida de datos
Aplicar patrón Observer para manejar eventos
Incorporar caché para mejorar rendimiento
Agregar logging y monitoreo (por ejemplo con Winston)
Validar esquemas con Joi o Zod
Migrar a una base de datos real (PostgreSQL, MongoDB o SQLite)
Refactorizaciones
TaskService

Problemas:

Validaciones repetidas
Métodos duplicados
Filtros redundantes

Cambios:

Validación centralizada
Eliminación de métodos duplicados
Método genérico para filtrar por estado

Resultado: código más simple y fácil de mantener

TaskRepository

Problemas:

Uso innecesario de bucles
Código duplicado
Nombres poco claros

Cambios:

Uso de métodos de arrays (find, filter)
Función para asegurar directorio de datos
Mejora en nombres de variables

Resultado: mayor claridad y mejor legibilidad

TaskController

Problemas:

Validaciones repetidas
Manejo de errores duplicado
Código anidado

Cambios:

Función de validación reutilizable
Manejo centralizado de errores
Código más limpio

Resultado: menos duplicación y mejor organización

Funcionalidades
Crear tareas
Listar tareas
Obtener tarea por ID
Marcar como completada
Eliminar tareas
Filtrar tareas por estado
Validación de datos
Persistencia en JSON
Pruebas automatizadas
Instalación

Requisitos:

Node.js 14 o superior
npm 6 o superior

Instalar dependencias:

npm install

Ejecutar servidor:

npm start

Ejecutar pruebas:

npm test
Pruebas
TaskService: 12 pruebas
TaskRepository: 4 pruebas

Total: 16 pruebas ejecutadas correctamente

Endpoints

Crear tarea:

POST /api/tasks

Listar:

GET /api/tasks

Obtener por ID:

GET /api/tasks/:id

Completar:

PUT /api/tasks/:id/complete

Eliminar:

DELETE /api/tasks/:id

Pendientes:

GET /api/tasks/filter/pending

Completadas:

GET /api/tasks/filter/completed
Control de Versiones

Commits realizados:

Estructura inicial
Instalación de dependencias
Refactor de TaskService
Mejora de Repository y Controller

Rama:

examen-jhon-leon
Decisiones de Diseño
Uso de JSON para almacenamiento por simplicidad
Persistencia síncrona para asegurar consistencia
Validación en la capa de servicios
Uso de DTOs para controlar datos expuestos
Mejoras Futuras
Autenticación con JWT
Paginación
Soft delete
Base de datos real
Docker

Autor

Jhon León
Ingeniería de Software II
