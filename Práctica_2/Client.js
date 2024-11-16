const soap = require('soap');
const readline = require('readline');

const IP = '192.168.1.67'; // Cambia a la IP del servidor si no es localhost
const url = `http://${IP}:3000/contactlist?wsdl`;

// Configuración para lectura de consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para obtener los valores de la operación agregar
function getInputsAdd(callback) {
    rl.question('Ingrese el nombre: ', (name) => {
        rl.question('Ingrese el teléfono principal: ', (phone) => {
            rl.question('Ingrese el teléfono celular: ', (mobile) => {
                rl.question('Ingrese el correo electrónico: ', (email) => {
                    callback({ name, phone, mobile, email });
                });
            });
        });
    });
}

// Mostrar menú
function showMenu() {
    console.log('Seleccione una operación:');
    console.log('1. Agregar un contacto');
    console.log('2. Salir');
}

// Crear cliente SOAP
soap.createClient(url, (err, client) => {
    if (err) {
        console.error('Error al crear cliente SOAP:', err.message);
        process.exit(1);
    }

    showMenu();

    rl.question("Seleccione una opción: ", (choice) => {
        switch (choice) {
            case '1':
                getInputsAdd((args) => {
                    client.Add(args, (err, result) => {
                        if (err) {
                            console.error('Error al agregar contacto:', err.message);
                        } else {
                            console.log("Contacto agregado correctamente:", result.AddResult);
                        }
                        rl.close();
                    });
                });
                break;

            case '2':
                console.log('Saliendo...');
                rl.close();
                break;

            default:
                console.log("Opción no válida");
                rl.close();
                break;
        }
    });
});
