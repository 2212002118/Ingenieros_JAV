
const soap = require('soap');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const contactsFilePath = path.join(__dirname, 'contacts.json');

// Carga inicial de contactos desde el archivo
let contacts = [];
if (fs.existsSync(contactsFilePath)) {
    contacts = JSON.parse(fs.readFileSync(contactsFilePath, 'utf8'));
}

// Funciones de la agenda
const service = {
    ContactService: {
        ContactPort: {
            AddContact: function(args, callback) {
                const newContact = {
                    name: args.name,
                    mainPhone: args.mainPhone,
                    cellPhone: args.cellPhone,
                    email: args.email
                };
                contacts.push(newContact);
                saveContacts();
                callback(null, { message: 'Contacto agregado con éxito' });
            },
            EditContact: function(args, callback) {
                const contact = contacts.find(c => c.name === args.name);
                if (contact) {
                    contact.mainPhone = args.mainPhone || contact.mainPhone;
                    contact.cellPhone = args.cellPhone || contact.cellPhone;
                    contact.email = args.email || contact.email;
                    saveContacts();
                    callback(null, { message: 'Contacto editado con éxito' });
                } else {
                    callback({ faultstring: 'Contacto no encontrado' });
                }
            },
            DeleteContact: function(args, callback) {
                const index = contacts.findIndex(c => c.name === args.name);
                if (index !== -1) {
                    contacts.splice(index, 1);
                    saveContacts();
                    callback(null, { message: 'Contacto eliminado con éxito' });
                } else {
                    callback({ faultstring: 'Contacto no encontrado' });
                }
            },
            SearchContact: function(args, callback) {
                const contact = contacts.find(c => c.name === args.name);
                if (contact) {
                    callback(null, contact);
                } else {
                    callback({ faultstring: 'Contacto no encontrado' });
                }
            },
            SortContacts: function(args, callback) {
                const criteria = args.criteria;
                if (criteria === 'name') {
                    contacts.sort((a, b) => a.name.localeCompare(b.name));
                } else if (criteria === 'email') {
                    contacts.sort((a, b) => a.email.localeCompare(b.email));
                }
                saveContacts();
                callback(null, { message: 'Contactos ordenados con éxito' });
            }
        }
    }
};

// Guardar contactos en el archivo
function saveContacts() {
    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));
}

const wsdlPath = path.join(__dirname, 'requirements.wsdl');
const wsdl = fs.readFileSync(wsdlPath, 'utf8');

app.listen(PORT, () => {
    soap.listen(app, '/agenda', service, wsdl);
    console.log(`Servicio SOAP corriendo en http://localhost:${PORT}/agenda`);
});
