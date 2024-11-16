const fs = require('fs');
const path = require('path');

/**
 * Escribe en el archivo contactos.csv una cadena separada por comas.
 * @param {string} csvData - La cadena separada por comas que se desea añadir al archivo.
 */
function escribirEnContactos(csvData) {
    const filePath = path.resolve(__dirname, 'contactos.csv');
    
    // Verificar si el archivo ya existe
    const existeArchivo = fs.existsSync(filePath);

    // Agregar un salto de línea si ya existe contenido en el archivo
    const dataToWrite = existeArchivo ? `\n${csvData}` : csvData;

    // Escribir los datos en el archivo
    fs.appendFile(filePath, dataToWrite, (err) => {
        if (err) {
            console.error('Error al escribir en contactos.csv:', err);
        } else {
            console.log('Datos agregados correctamente a contactos.csv.');
        }
    });
}

// Ejemplo de uso
const nuevaEntrada = "Juan Pérez, juan.perez@gmail.com, +1234567890";
escribirEnContactos(nuevaEntrada);
