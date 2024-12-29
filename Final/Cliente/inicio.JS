//Configuración dinámica del boton de iniciar/cerrar sesion
document.addEventListener('DOMContentLoaded', () => {
    const userGreeting = document.getElementById('userGreeting');
    const logoutButton = document.getElementById('logoutButton');
    const username = localStorage.getItem('loggedInUser');

    // Configurar el saludo y el texto del botón de manera dinámica
    if (username) {
        userGreeting.textContent = `Bienvenido, ${username}!`;
        logoutButton.textContent = 'Cerrar Sesión';
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser'); // Eliminar el usuario almacenado
            alert('Has cerrado sesión exitosamente.');
            window.location.href = 'inicio.html'; // Redirigir al login
        });
    } else {
        userGreeting.textContent = 'Bienvenido, invitado!';
        logoutButton.textContent = 'Iniciar Sesión';
        logoutButton.addEventListener('click', () => {
            window.location.href = 'login.html'; // Redirigir al login
        });
    }
});