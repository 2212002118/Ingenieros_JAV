emailjs.send('default_service', 'template_z1po6kp', {
    nombre: 'Juan Pérez',
    correo: 'juan.perez@example.com',
    mensaje: 'Este es un mensaje de prueba enviado desde la consola.'
}, 'x2vvcMidNsRBgrVr0')
.then(function(response) {
    console.log('Correo enviado con éxito!', response.status, response.text);
})
.catch(function(error) {
    console.error('Error al enviar el correo:', error);
});
