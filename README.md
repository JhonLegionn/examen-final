Tipo de Arquitectura
El proyecto sigue una arquitectura por capas, separando responsabilidades para mantener el código ordenado y fácil de mantener:
Presentación: interfaz en frontend y controladores
Lógica de negocio: servicios
Acceso a datos: repositorios
Modelos: definición de entidades
 Componente      Responsabilidad         

 Task Model      Estructura de datos     
 TaskRepository  Acceso y persistencia   
 TaskService     Reglas de negocio       
 TaskController  Manejo de requests      
 TaskRoutes      Definición de endpoints 
 Frontend        Interfaz de usuario     


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
Marcar como completada
Eliminar tareas
Filtrar tareas por estado
