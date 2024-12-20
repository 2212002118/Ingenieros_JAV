const soap = require('soap');

const IP = '192.168.0.255'; // Poner IP servidor
const url = `http://192.168.0.255:3000/calculator?wsdl`;


//Necesario para lectura y escritura
const readline = require('readline');

//rl, como auxiliar de lectura
const rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Función para obtener los valores de la operación
function getInputs(callback){
    rl.question('Ingrese el primer número: ',(intA)=>{
        rl.question('Ingrese el segundo número: ',(intB)=>{
            callback(parseInt(intA), parseInt(intB));
        });
    });
};

soap.createClient(url, (err, client)=>{
    if (err) throw err;        
    getInputs((intA, intB) => {
        const args = { intA, intB };    
        
        client.Add(args, (err, result) => {
            if (err) throw err;
            console.log("Resultado de la suma:", result.AddResult);
            rl.close();
        });
        
        client.Multiplication(args, (err, result) => {
            if (err) throw err;
            console.log("Resultado de la multiplicación:", result.MultiplicationResult);
            rl.close();
        });
        
        client.Division(args, (err, result) => {
            if (err) throw err;
            console.log("Resultado de la división:", result.DivisionResult);
            rl.close();
        });
        
        client.Power(args, (err, result) => {
            if (err) throw err;
            console.log("Resultado de la potencia:", result.PowerResult);
            rl.close();
        });
    }); //Gets imput
}); //soap