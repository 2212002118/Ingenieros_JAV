//import fetch from 'node-fetch';

async function obtenerUsuarios(){
    const respuesta = await fetch('http://localhost:3000/usuarios');
    const datos = await respuesta.json();
    console.log(datos);
};

obtenerUsuarios();