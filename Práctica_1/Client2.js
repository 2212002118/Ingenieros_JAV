const soap = require('soap');

const IP = '192.168.0.255'; // Poner IP servidor
const url = `http://${IP}:3000/calculator?wsdl`;


//Necesario para lectura y escritura
const readline = require('readline');

//tl, como auxiliar de lectura
const rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Muestra el menu
function showMenu(){
    console.log('Seleccione una operación');
    console.log('1. Suma');
    console.log('2. Multiplicación');
    console.log('3. División');
    console.log('4. Potencia');
};

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
    
    showMenu();
    
    rl.question("Seleccione una opción: ", (choice) => {

        getInputs((intA, intB) => {
            const args = { intA, intB };
            
            switch(choice) {
                case '1':
                    client.Add(args, (err, result) => {
                        if (err) throw err;
                        console.log("Resultado de la suma:", result.AddResult);
                        rl.close();
                    });
                    break;
                case '2':
                    client.Multiplication(args, (err, result) => {
                        if (err) throw err;
                        console.log("Resultado de la multiplicación:", result.MultiplicationResult);
                        rl.close();
                    });
                    break;
                case '3':
                    client.Division(args, (err, result) => {
                        if (err) throw err;
                            console.log("Resultado de la división:", result.DivisionResult);
                        rl.close();
                    });
                    break;
                case '4':
                    client.Power(args, (err, result) => {
                        if (err) throw err;
                        console.log("Resultado de la potencia:", result.PowerResult);
                        rl.close();
                    });
                    break;
                default:
                    console.log("Opción no válida");
                    rl.close();
                    break;
            } //switch case

        }); //Gets imput

    }); //rl

}); //soap
