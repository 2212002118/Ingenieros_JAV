const soap = require('soap');
const express= require('express');

//11/11/2024
const fs = require('fs');
const path= require('path');

const app = express();
const PORT = 3000;     

// Ruta del archivo CSV
const filePath = 'contactos.csv'; 

const service =  {                                      
    ContactListServer: {                                
        ContactListPort: {                               
            Add: function(args, callback){
                const stringResult = args.stringA+","+args.stringB+","+args.stringC+","+args.stringD+"\n";
                fs.appendFile(filePath, stringResult, (err) => {
                    if (err) {
                        console.error('Error al agregar datos al archivo CSV:', err);
                    } else {
                        callback(null, {AddResult: args.stringA}); 
                    }
                }); 
            }
        }
    }
};

const wsdlPath=path.join(__dirname,'requirements.wsdl');
const wsdl= fs.readFileSync(wsdlPath, 'utf8');

app.listen(PORT, ()=>{
    soap.listen(app, '/contactlist', service, wsdl);
    console.log('Servicio SOAP corriendo en http://localhost/contactlist'); //Poner id del servidor
});



