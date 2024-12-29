const express = require('express');
const fs = require('fs');
const path = require('path');
const soap = require('soap'); //Creo que se va a usar
const http = require('http');
require('dotenv').config(); // Manejar variables de entorno

const app = express();

const cors = require('cors'); // Importar el paquete

// Configurar CORS
app.use(cors({
    origin: 'http://127.0.0.1:3000', // Cambia esto al origen donde está tu cliente
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type'], // Encabezados permitidos
}));


// Configuración de host y puerto
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON en los requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos de la carpeta "public"
app.use(express.static(path.join(__dirname, '../Cliente')));

// Rutas REST para login y registro
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al leer el archivo de usuarios' });
        }

        const users = JSON.parse(data);
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Credenciales incorrectas' });
        }
    });
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al leer el archivo de usuarios' });
        }

        const users = JSON.parse(data);
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            return res.json({ success: false, message: 'El usuario ya existe' });
        }

        users.push({ username, password });

        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al guardar el usuario' });
            }

            res.json({ success: true });
        });
    });
});

// Ruta para servir el archivo de doctores
app.get('/doctores', (req, res) => {
    const filePath = path.join(__dirname, 'doctores.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer el archivo de doctores" });
        }
        res.json(JSON.parse(data));
    });
});

// Ruta para inicializar en localhost 3000 en inicio.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Cliente', 'inicio.html'));
});

/******************************
 * INICIO - Contactanos 
 *****************************/
// No se puede en backend 

/******************************
 * FIN - Contactanos 
 *****************************/

// Crear el servidor HTTP para integrar ambos servicios
const server = http.createServer(app);

// Iniciar el servidor
server.listen(PORT, HOST, () => {
    console.log(`Servidor REST ejecutándose en http://${HOST}:${PORT}`);
});
