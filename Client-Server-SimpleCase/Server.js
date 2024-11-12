const soap = require('soap');
const express= require('express');

//11/11/2024
const fs = require('fs');
const path= require('path');

const app = express();
const PORT = 3000;                                      //Puerto para usarse

const service =  {                                      //Creacion de un servicio
    CalculatorService: {                                //Serivicio a utilizar
        CalculatorPort: {                               //Puerto del servicio que se utiliza
            Add: function(args, callback){              //Uso de funcionalidad del servicio
                const intA = args.intA;                 //Asignacion en constantes
                const intB = args.intB;                 //Arriba x2
                const result=intA+intB;                 //Lo que hace el servicio
                callback(null, {AddResult: result});    //Regresa null si esta vacio, en caso contrario el resultado del servicio
            }
        }
    }
};

const wsdlPath=path.join(__dirname,'requirements.wsdl');
const wsdl= fs.readFileSync(wsdlPath, 'utf8');

app.listen(PORT, ()=>{
    soap.listen(app, '/calculator', service, wsdl);
    console.log('Servicio SOAP corriendo en http://localhost/calculator'); //Poner id del servidor
});



