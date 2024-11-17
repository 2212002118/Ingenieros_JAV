const soap = require('soap');
const express = require('express');
const fs = require('fs');
const path = require("path");
const csvParse = require('csv-parse/sync');
const csvStringify = require('csv-stringify/sync');
const app = express();
const PORT = 3000;

// Leer el archivo CSV
function leerCSV() {
    try {
        const fileContent = fs.readFileSync('./directorio.csv', 'utf-8');
        return csvParse.parse(fileContent, { columns: true });
    } catch (err) {
        console.error("Error al leer el CSV:", err);
        return [];
    }
}

// Escribir en el archivo CSV
function escribirCSV(data) {
    try {
        const csvContent = csvStringify.stringify(data, { header: true });
        fs.writeFileSync('./directorio.csv', csvContent);
    } catch (err) {
        console.error("Error al escribir el CSV:", err);
    }
}

// Servicio SOAP
const service = {
    DirectorioService: {
        DirectorioPort: {
            Añadir: function (args, callback) {
                const fileCSV = leerCSV();
                const nuevoContacto = {
                    nombre: args.nombre,
                    telefono: args.telefono,
                    celular: args.celular,
                    correo: args.correo,
                };

                fileCSV.push(nuevoContacto);
                escribirCSV(fileCSV);

                callback(null, { AñadirResult: `Se añadió el contacto: ${args.nombre}` });
            },
            Buscar: function (args, callback) {
                const fileCSV = leerCSV();
                const contacto = fileCSV.find(row => row.nombre === args.nombre);

                if (contacto) {
                    callback(null, { BuscarResult: JSON.stringify(contacto) });
                } else {
                    callback(null, { BuscarResult: `No se encontró ningún registro con el nombre: ${args.nombre}` });
                }
            },
            Eliminar: function (args, callback) {
                const fileCSV = leerCSV();
                const index = fileCSV.findIndex(row => row.nombre === args.nombre);

                if (index !== -1) {
                    const eliminado = fileCSV.splice(index, 1);
                    escribirCSV(fileCSV);
                    callback(null, { EliminarResult: `Se eliminó el contacto: ${eliminado[0].nombre}` });
                } else {
                    callback(null, { EliminarResult: `No se encontró ningún registro con el nombre: ${args.nombre}` });
                }
            },
            OrdenarAlfabetico: function(callback){
                const data = leerCSV();
                console.log("Datos leídos del CSV:", data);
                data.sort((a, b) => a.nombre.localeCompare(b.nombre));
                const result = { OrdenarAlfabeticoResult: JSON.stringify(data) };
                console.log("Resultado devuelto:", result);
                callback(null, result);               
            },
            OrdenarAlfabeticoCorreo: function(callback){
                const data = leerCSV();
                data.sort((a, b) => a.correo.localeCompare(b.nombre));
                callback(null, { OrdenarAlfabeticoResult: JSON.stringify(data) });  
            }
        }
    }
};

const wsdlPath = path.join(__dirname, 'requirements.wsdl');
const wsdl = fs.readFileSync(wsdlPath, 'utf8');

app.listen(PORT, () => {
    soap.listen(app, '/directorio', service, wsdl);
    console.log('Servicio SOAP corriendo en http://localhost:3000/directorio');
});
