/// Carga del módulo Express
const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// =======================================================
// DATOS EN MEMORIA (Simulación de base de datos)
// =======================================================
// **USUARIOS INICIALES PEDRO y ANA**
let usuarios = [
    { id: 1, nombre: "Luis", email: "luis.a@api.com", activo: true, fechaCreacion: new Date("2025-11-14T01:00:00.000Z").toISOString() },
    { id: 2, nombre: "Gina", email: "gina.b@api.com", activo: true, fechaCreacion: new Date("2025-11-14T01:05:00.000Z").toISOString() }
];
let nextId = 3; // Contador para asignar nuevos IDs

// =======================================================
// HELPER FUNCTIONS (Funciones de Ayuda)
// =======================================================

// Helper para validar email básico
function esEmailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Helper para buscar usuario por ID
function encontrarUsuarioPorId(id) {
    // Aseguramos que la comparación sea correcta aunque el id sea string
    return usuarios.find(u => u.id == id);
}

// =======================================================
// HEALTH CHECK (Ruta de Verificación de Salud de la API)
// =======================================================

app.get('/health', (req, res) => {
    res.json({
        status: "✅ API Funcionando",
        timestamp: new Date().toISOString(),
        totalUsuarios: usuarios.length,
        usuariosActivos: usuarios.filter(u => u.activo).length,
    });
});

// =======================================================
// RUTAS CRUD
// =======================================================

// 1. READ (GET): Listar todos los usuarios
app.get('/usuarios', (req, res) => {
    // Retorna solo los usuarios activos (filtrado por si se implementa borrado lógico)
    res.status(200).json(usuarios.filter(u => u.activo));
});

// 2. READ (GET): Obtener un usuario por ID
app.get('/usuarios/:id', (req, res) => {
    const usuario = encontrarUsuarioPorId(req.params.id);

    if (!usuario) {
        // 404 Not Found si el ID no existe
        return res.status(404).json({ error: "Usuario no encontrado." });
    }

    if (!usuario.activo) {
        // 410 Gone si el usuario fue borrado lógicamente
        return res.status(410).json({ error: "Usuario existe, pero está inactivo o ha sido eliminado." });
    }

    res.status(200).json(usuario);
});

// 3. CREATE (POST): Crear un nuevo usuario (Usarás esta ruta para agregar a STIVEN)
app.post('/usuarios', (req, res) => {
    const { nombre, email } = req.body;

    // Validación de datos de entrada
    if (!nombre || !email) {
        return res.status(400).json({ error: "Faltan campos obligatorios: nombre y email." });
    }

    if (!esEmailValido(email)) {
        return res.status(400).json({ error: "El formato del email no es válido." });
    }

    // Creación del nuevo usuario
    const nuevoUsuario = {
        id: nextId++, // Asignamos ID y preparamos el siguiente
        nombre: nombre,
        email: email,
        activo: true,
        fechaCreacion: new Date().toISOString()
    };

    usuarios.push(nuevoUsuario);

    // 201 Created es la respuesta estándar para creación exitosa
    res.status(201).json(nuevoUsuario); 
});

// 4. UPDATE (PUT): Actualizar la información de un usuario
app.put('/usuarios/:id', (req, res) => {
    const { nombre, email, activo } = req.body;
    const usuario = encontrarUsuarioPorId(req.params.id);

    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado para actualizar." });
    }
    
    // Solo actualizamos campos si vienen en el body
    if (nombre) usuario.nombre = nombre;
    if (email) {
        if (!esEmailValido(email)) {
            return res.status(400).json({ error: "El formato del nuevo email no es válido." });
        }
        usuario.email = email;
    }
    // Permite cambiar el estado activo, por si se usa borrado lógico
    if (typeof activo === 'boolean') usuario.activo = activo;

    // 200 OK para actualización exitosa
    res.status(200).json(usuario);
});

// 5. DELETE (DELETE): Eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
    const idABorrar = req.params.id;
    const indice = usuarios.findIndex(u => u.id == idABorrar);

    if (indice === -1) {
        return res.status(404).json({ error: "Usuario no encontrado para eliminar." });
    }

    // BORRADO FÍSICO (elimina el objeto completamente del array)
    usuarios.splice(indice, 1);

    // 204 No Content es la respuesta estándar para eliminación exitosa sin cuerpo de respuesta
    res.status(204).send();
});


// =======================================================
// INICIALIZACIÓN DEL SERVIDOR
// =======================================================

app.listen(port, () => {
    console.log(`API FULL funcionando en: http://localhost:${port}`);
    console.log(`Health check: http://localhost:${port}/health`);
    console.log(`Endpoint usuarios: http://localhost:${port}/usuarios`);
});