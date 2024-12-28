// Lógica del login
async function iniciarSesion(username, password){
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
            window.location.href = 'init.html';
        } else {
            messageElement.textContent = 'Usuario o contraseña incorrectos';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Error al procesar el login:', error);
    }
};

// Lógica del registro
async function agregarUsuario(newUsername, newPassword){
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
    }
};

