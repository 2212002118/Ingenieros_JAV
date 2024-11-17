const soap = require('soap');
const readline = require('readline');

const IP="localhost";
const PORT="3000";
const url = `http://${IP}:${PORT}/directorio?wsdl`;

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

// Obtener datos del contacto al agregar
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

// Menu para ordenar el directorio
function showOrderBy(callback) {
    console.log('1. Ordenar por orden alfabético');
    console.log('2. Ordenar por orden alfabético y por correo');
    rl.question('Seleccionar una opción:', (ordenamiento) => {
        callback(ordenamiento);
    });
}

//Funcion para leer el directorio
function leerCSV() {
    const fs = require('fs');
    const csvParse = require('csv-parse/sync');

    try {
        const fileContent = fs.readFileSync('./directorio.csv', 'utf-8');
        return csvParse.parse(fileContent, { columns: true });
    } catch (err) {
        console.error("Error al leer el CSV:", err);
        return [];
    }
}

//Funcion para imprimir el directorio
function imprimirDirectorio() {
    const contactos = leerCSV(); // Ya es un arreglo de objetos
    contactos.forEach(contacto => {
        console.log(`Nombre: ${contacto.nombre}`);
        console.log(`\tTeléfono: ${contacto.telefono}`);
        console.log(`\tCelular: ${contacto.celular}`);
        console.log(`\tCorreo: ${contacto.correo}`);
    });
}

//Funcion para llamar a Servidor y ordenar por orden alfabetico
function ordenarAlfabetico(){
    client.OrdenarAlfabetico({}, (err, result) => {
        if (err) {
            console.error("Error al invocar OrdenarAlfabetico:", err.message || err);
        } else {
            console.log(result.OrdenarAlfabeticoResult);
            imprimirDirectorio();
        }
    });
}

//Funcion para llamar a Servidor y ordenar por correo electronico y en orden alfabetico
function ordenarAlfabeticoCorreo(){
    client.OrdenarAlfabeticoCorreo({}, (err, result) => {
        if (err) {
            console.error("Error al invocar OrdenarAlfabeticoCorreo:", err.message || err);
        } else {
            console.log(result.OrdenarAlfabeticoCorreoResult);
            imprimirDirectorio(); // Mostrar directorio ordenado
        }
    });
}

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

            case '2': // Editar (Pendiente)
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
                            ordenarAlfabetico();
                            preguntarOpcion(); // Volver al menú tras completar la operación
                            break;
                        case '2': // Ordenar por dominio de correo
                            ordenarAlfabeticoCorreo();
                            preguntarOpcion(); // Volver al menú
                            break;
                        default:
                            console.log('Opción no válida.');
                            preguntarOpcion(); // Volver al menú para intentar de nuevo
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

