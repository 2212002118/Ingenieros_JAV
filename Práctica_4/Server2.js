const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let numeros = [{num1: 8, num2: 2, operacion: 1}];

app.get('/usuarios', (req, res)=>{
    switch(numeros[0]["operacion"]){
        case 1:
            res.json({ resultado: numeros[0]['num1'] + numeros[0]['num2'] });
            break;
        case 3:
            res.json({ resultado: Math.pow(numeros[0]['num1'], numeros[0]['num2']) });
            break;
    
        case 2:
            res.json({ resultado: numeros[0]['num1'] * numeros[0]['num2'] });
            break;
        case 4:
            if (numeros[0]["num2"] == 0) {
                return res.status(400).json({ error: 'División por cero no permitida' });
            }
            res.json({ resultado: numeros[0]['num1'] / numeros[0]['num2'] });
            break;
    }    
});

app.listen(PORT, ()=>{
    console.log(`MUY BIEN!!, el servicio se ejecuta en http://localhost:${PORT}`);
});