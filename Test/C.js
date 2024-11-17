
const soap = require('soap');
const readline = require('readline');
const url = 'http://localhost:3000/agenda?wsdl';

// Configuración del readline para entrada del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Mostrar el menú de opciones
function showMenu() {
    console.log('Seleccione una operación:');
    console.log('1. Agregar contacto');
    console.log('2. Editar contacto');
    console.log('3. Eliminar contacto');
    console.log('4. Buscar contacto');
    console.log('5. Ordenar contactos');
}

// Obtener los datos del usuario
function getContactInputs(callback) {
    rl.question('Ingrese el nombre: ', (name) => {
        rl.question('Ingrese el teléfono principal: ', (mainPhone) => {
            rl.question('Ingrese el teléfono celular: ', (cellPhone) => {
                rl.question('Ingrese el correo electrónico: ', (email) => {
                    callback({ name, mainPhone, cellPhone, email });
                });
            });
        });
    });
}

soap.createClient(url, (err, client) => {
    if (err) throw err;
    showMenu();

    rl.question('Seleccione una opción: ', (choice) => {
        switch (choice) {
            case '1': // Agregar contacto
                getContactInputs((newContact) => {
                    client.AddContact(newContact, (err, result) => {
                        if (err) throw err;
                        console.log(result.message);
                        rl.close();
                    });
                });
                break;

            case '2': // Editar contacto
                getContactInputs((updatedContact) => {
                    client.EditContact(updatedContact, (err, result) => {
                        if (err) throw err;
                        console.log(result.message);
                        rl.close();
                    });
                });
                break;

            case '3': // Eliminar contacto
                rl.question('Ingrese el nombre del contacto a eliminar: ', (name) => {
                    client.DeleteContact({ name }, (err, result) => {
                        if (err) throw err;
                        console.log(result.message);
                        rl.close();
                    });
                });
                break;

            case '4': // Buscar contacto
                rl.question('Ingrese el nombre del contacto a buscar: ', (name) => {
                    client.SearchContact({ name }, (err, contact) => {
                        if (err) throw err;
                        console.log('Contacto encontrado:', contact);
                        rl.close();
                    });
                });
                break;

            case '5': // Ordenar contactos
                rl.question('Ingrese el criterio de ordenamiento (name/email): ', (criteria) => {
                    client.SortContacts({ criteria }, (err, result) => {
                        if (err) throw err;
                        console.log(result.message);
                        rl.close();
                    });
                });
                break;

            default:
                console.log('Opción no válida');
                rl.close();
                break;
        }
    });
});
