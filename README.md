# 🚀 API de Usuarios (CRUD Básico)

Proyecto de API básica construida con *Node.js* y el framework *Express*, implementando las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en memoria para gestionar usuarios.

Esta API cumple con los requisitos del proyecto GA7-220501096-AA5-EV03.

## 🛠️ Instalación y Ejecución

1.  *Clonar el repositorio:*
    bash
    git clone (https://github.com/ginaluz3/Api.git)
    cd api-usuarios
    

2.  *Instalar dependencias:*
    bash
    npm install
    

3.  *Ejecutar la API:*
    bash
    node index.js
    
    La API estará disponible en http://localhost:3000.

## 📌 Documentación de Endpoints (Servicios CRUD)

La API opera en el endpoint base /usuarios.

| Método | Ruta | Descripción | Datos de Entrada (Body) | Código de Estado |
| :--- | :--- | :--- | :--- | :--- |
| *GET* | /health | *Estado de salud* de la API y estadísticas. | N/A | *200 OK* |
| *GET* | /usuarios | *LISTAR* todos los usuarios en memoria. | N/A | *200 OK* |
| *GET* | /usuarios/:id | *LEER/BUSCAR* un usuario específico por su ID. | N/A | *200 OK* (Usuario) / *404 Not Found* (Si no existe) |
| *POST* | /usuarios | *CREAR* un nuevo usuario. | { "nombre": "...", "email": "..." } | *201 Created* |
| *PUT* | /usuarios/:id | *ACTUALIZAR* un usuario existente por su ID. | { "nombre": "...", "activo": true/false } | *200 OK* (Actualizado) / *404 Not Found* |
| *DELETE* | /usuarios/:id | *ELIMINAR* un usuario por su ID. | N/A | *204 No Content* (Eliminado) / *404 Not Found* |

### ⚙️ Validación de Datos

* La ruta *POST* requiere que los campos nombre y email estén presentes.
* El campo email debe seguir un formato válido.
* El campo activo se establece por defecto como true.
