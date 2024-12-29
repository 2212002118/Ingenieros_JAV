document.addEventListener('DOMContentLoaded', () => {
    // Asignar el evento 'submit' al formulario de login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Obtener valores del formulario
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Llamar a la función de inicio de sesión
        await iniciarSesion(username, password);
    });

    // Asignar el evento 'submit' al formulario de registro
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Obtener valores del formulario
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        // Llamar a la función de registro
        await agregarUsuario(newUsername, newPassword);
    });
});

// Función de inicio de sesión
async function iniciarSesion(username, password) {
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        const messageElement = document.getElementById('loginMessage');
        if (result.success) {
            messageElement.textContent = 'Inicio de sesión exitoso';
            messageElement.style.color = 'green';

            // Guardar el nombre de usuario en localStorage
            localStorage.setItem('loggedInUser', username);

            window.location.href = 'inicio.html';
        } else {
            messageElement.textContent = 'Usuario o contraseña incorrectos';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Error al procesar el login:', error);
        alert('Hubo un problema al conectar con el servidor.');
    }
}


// Función de registro
async function agregarUsuario(newUsername, newPassword) {
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: newUsername, password: newPassword }),
        });

        const result = await response.json();
        const messageElement = document.getElementById('registerMessage');
        if (result.success) {
            messageElement.textContent = 'Usuario registrado exitosamente';
            messageElement.style.color = 'green';
        } else {
            messageElement.textContent = 'Error al registrar usuario: ' + result.message;
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Error al procesar el registro:', error);
        alert('Hubo un problema al conectar con el servidor.');
    }
}
