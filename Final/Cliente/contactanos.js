document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !correo || !mensaje) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if (!correo.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Por favor, ingresa un correo válido.');
        return;
    }

    // Continúa con el envío del correo
    enviarCorreo(nombre, correo, mensaje);
});

function enviarCorreo(nombre, correo, mensaje) {
    console.log(nombre);
    console.log(correo);
    console.log(mensaje);
    emailjs.send('default_service', 'template_z1po6kp', {
        nombre: nombre,
        correo: correo,
        mensaje: mensaje
    }).then(function(response) {
        alert('Correo enviado con éxito!');
        window.location.href = 'contactanos.html';
    }).catch(function(error) {
        alert('Error al enviar el correo: ' + JSON.stringify(error));
    });
}

function iniciarMap(){
    var coord = {lat:-34.5956145 ,lng: -58.4431949};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}

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