const soap = require('soap');
const readline = require('readline');

const url = `http://localhost:3000/directorio?wsdl`;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Mostrar menú
function showMenu() {
    console.log('1. Añadir');
    console.log('2. Editar');
    console.log('3. Eliminar');
    console.log('4. Ordenar');
    console.log('5. Buscar');
    console.log('0. Salir');
}

// Obtener datos del contacto
function getContactInputs(callback) {
    rl.question('Ingrese el nombre: ', (nombre) => {
        rl.question('Ingrese el teléfono: ', (telefono) => {
            rl.question('Ingrese el celular: ', (celular) => {
                rl.question('Ingrese el correo: ', (correo) => {
                    callback({ nombre, telefono, celular, correo });
                });
            });
        });
    });
}

function showOrderBy(callback){
    console.log('1. Ordenar por orden alfabetico');
    console.log('2. Ordenar por orden alfabetico y por correo');
    rl.question('Seleccionar una opcion:', (ordenamiento)=>{
        callback(ordenamiento)
    });
};

// Cliente SOAP
soap.createClient(url, (err, client) => {
    if (err) {
        console.error('Error al crear el cliente SOAP:', err);
        return;
    }

    const preguntarOpcion = () => {
        showMenu();
        rl.question('Seleccionar una opción: ', manejarOpcion);
    };

    const manejarOpcion = (opcion) => {
        switch (opcion) {
            case '1': // Añadir
                getContactInputs((newContact) => {
                    client.Añadir(newContact, (err, result) => {
                        if (err) {
                            console.error("Error:", err);
                        } else {
                            console.log(result.AñadirResult);
                        }
                        preguntarOpcion();
                    });
                });
                break;

            case '2': // Javier (Pendiente)
                console.log("Funcionalidad pendiente.");
                preguntarOpcion();
                break;

            case '3': // Eliminar
                rl.question('Ingrese el nombre del contacto a eliminar: ', (nombre) => {
                    client.Eliminar({ nombre }, (err, result) => {
                        if (err) {
                            console.error("Error:", err);
                        } else {
                            console.log(result.EliminarResult);
                        }
                        preguntarOpcion();
                    });
                });
                break;

            case '4': // Ordenar
                showOrderBy((ordenamiento) => {
                    switch (ordenamiento) {
                        case '1': // Ordenar alfabéticamente
                            client.OrdenarAlfabetico({}, (err, result) => {
                                if (err) {
                                    console.error("Error:", err.message);
                                } else {
                                    const contactos = JSON.parse(result.OrdenarAlfabeticoResult);
                                    contactos.forEach(contacto => {
                                        console.log(`Nombre: ${contacto.nombre}`);
                                        console.log(`\tTeléfono: ${contacto.telefono}`);
                                        console.log(`\tCelular: ${contacto.celular}`);
                                        console.log(`\tCorreo: ${contacto.correo}`);
                                    });
                                }
                                preguntarOpcion();
                            });
                            break;
            
                        case '2': // Ordenar por correo
                            client.OrdenarAlfabeticoCorreo({}, (err, result) => {
                                if (err) {
                                    console.error("Error:", err.message);
                                } else {
                                    const contactos = JSON.parse(result.OrdenarAlfabeticoCorreoResult);
                                    contactos.forEach(contacto => {
                                        console.log(`Nombre: ${contacto.nombre}`);
                                        console.log(`\tTeléfono: ${contacto.telefono}`);
                                        console.log(`\tCelular: ${contacto.celular}`);
                                        console.log(`\tCorreo: ${contacto.correo}`);
                                    });
                                }
                                preguntarOpcion();
                            });
                            break;
            
                        default:
                            console.log('Opción no válida.');
                            preguntarOpcion();
                            break;
                    }
                });
                break;

            case '5': // Buscar
                rl.question('Ingrese el nombre del contacto a buscar: ', (nombre) => {
                    client.Buscar({ nombre }, (err, result) => {
                        if (err) {
                            console.error("Error:", err);
                        } else {
                            console.log("Resultado:", result.BuscarResult);
                        }
                        preguntarOpcion();
                    });
                });
                break;

            case '0': // Salir
                console.log('Saliendo...');
                rl.close();
                break;

            default: // Opción no válida
                console.log('Opción no válida.');
                preguntarOpcion();
                break;
        }
    };

    // Iniciar el programa
    preguntarOpcion();
});

