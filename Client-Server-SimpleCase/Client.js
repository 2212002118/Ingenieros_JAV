const soap = require('soap');

const IP = localhost; // Poner IP servidor
const url = `http://${IP}:3000/calculator?wsdl`;


const requestArgs = {
    intA: 5, intB: 10
};

soap.createClient(url, (err, client)=>{
    if(err) throw err;

    client.Add(requestArgs, (err, result)=>{
        if(err) throw err;
        console.log('Resultado de la suma;', result.AddResult);
    });
});
