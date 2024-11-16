const soap = require('soap');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const IP = '192.168.1.67';

function writeContact(csvData) {
    const filePath = path.resolve(__dirname, 'contactos.csv');
    
    // Verificar si el archivo ya existe
    const existeArchivo = fs.existsSync(filePath);

    // Agregar un salto de línea si ya existe contenido en el archivo
    const dataToWrite = existeArchivo ? '${csvData}' : csvData;

    // Escribir los datos en el archivo
    fs.appendFile(filePath, dataToWrite, (err) => {
        if (err) {
            console.error('Error al escribir en contactos.csv:', err);
        } else {
            console.log('Datos agregados correctamente a contactos.csv.');
        }
    });
}

// Servicio SOAP
const service = {
    ContactListServer: {
        ContactListPort: {
            Add: (args, callback) => {
                const{name,phone,mobile,email} = args;
                console.log(name);   // "Juan Pérez"
                console.log(phone);  // undefined
                console.log(mobile); // undefined
                console.log(email);  // "juan.perez@example.com"
                const stringResult = '${name},${phone},${mobile},${email}\n';

                // Agregar datos al archivo
                writeContact(stringResult);
                callback(null, { AddResult: name });
            }
        }
    }
};

// Leer archivo WSDL
const wsdlPath = path.join(__dirname, 'requirements.wsdl');
let wsdl;

try {
    wsdl = fs.readFileSync(wsdlPath, 'utf8');
} catch (err) {
    console.error('Error al leer el archivo WSDL:', err.message);
    process.exit(1);
}

// Iniciar servidor
app.listen(PORT, () => {
    soap.listen(app, '/contactlist', service, wsdl);
    console.log(`Servicio SOAP corriendo en http://${IP}:${PORT}/contactlist`);
});
