const soap = require('soap');

const IP = 'localhost'; // Poner IP servidor
const url = `http://${IP}:3000/contactlist?wsdl`;


//Necesario para lectura y escritura
const readline = require('readline');

//tl, como auxiliar de lectura
const rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Función para obtener los valores de la operación agregar
function getInputsAdd(callback){
    rl.question('Ingrese el nombre: ',(stringA)=>{
        rl.question('Ingrese el teléfono principal: ',(stringB)=>{
            rl.question('Ingrese el teléfono celular: ',(stringC)=>{
                rl.question('Ingrese el correo electronico: ',(stringD)=>{
                    callback(stringA, stringB, stringC, stringD);
                });
            });
        });
    });
};

//Funcion para obtener los datos de contacto ordenados, de acuerdo a...
function showOrderBy(){
    console.log("1. algo");
    console.log("2. algo");
}

//Muestra el menu
function showMenu(){
    console.log('Seleccione una operación');
    console.log('1. Agregar un contacto');
    console.log('2. Editar un contacto');
    console.log('3. Eliminar');
    console.log('4. Ordenar un contacto');
    console.log('5. Buscar un contacto');
};



soap.createClient(url, (err, client)=>{
    if (err) throw err;
    
    showMenu();
    
    rl.question("Seleccione una opción: ", (choice) => {
  
            switch(choice) {
                case '1':
                    getInputsAdd((stringA, stringB, stringC, stringD) => {
                        const args = { stringA, stringB, stringC, stringD }; // Usa los nombres correctos
                        client.Add(args, (err, result) => {
                            if (err) throw err;
                            console.log("Se agregó correctamente:", result.AddResult);
                            rl.close();
                        });
                    });
                    break;

                /*case '2':
                    client.Edit(args, (err, result) => {
                        if (err) throw err;
                        console.log("Se editó correctamente");
                        rl.close();
                    });
                    break;
                case '3':
                    client.Erase(args, (err, result) => {
                        if (err) throw err;
                            console.log("Se eliminó correctamente el usuario");
                        rl.close();
                    });
                    break;
                case '4':
                    showMenu();
                    client.OrderBy(args, (err, result) => {
                        if (err) throw err;
                        console.log("Se ordeno correctamente el usuario", result.OrderByResult);
                        rl.close();
                    });
                    break;
                case '5':
                    client.Search(args, (err, result) => {
                        if (err) throw err;
                        console.log("El usuario tiene la información: ", result.SearchResult);
                        rl.close();
                    });
                    break;*/
                default:
                    console.log("Opción no válida");
                    rl.close();
                    break;
            } //switch case

    }); //rl

}); //soap
