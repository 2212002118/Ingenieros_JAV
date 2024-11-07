const soap = require('soap');

const url = 'http://192.168.137.1:3000/calculator?wsdl';

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
