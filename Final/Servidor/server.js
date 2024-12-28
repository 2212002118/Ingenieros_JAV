const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const path = require('path');
app.use('/Cliente', express.static('Cliente'));


// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    console.log('validarUsuario ejecutado');

    const { username, password } = req.body;

    fs.readFile('users.json', 'utf8', (err, data) => {
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

// Ruta para registrar usuario
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al leer el archivo de usuarios' });
        }

        const users = JSON.parse(data);
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            return res.json({ success: false, message: 'El usuario ya existe' });
        }

        users.push({ username, password });

        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al guardar el usuario' });
            }

            res.json({ success: true });
        });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
