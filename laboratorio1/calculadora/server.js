const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/calcular', (req, res) => {
    const { a, b, operacion } = req.body;
    let resultado;

    switch (operacion) {
        case 'sumar':
            resultado = parseFloat(a) + parseFloat(b);
            break;
        case 'restar':
            resultado = parseFloat(a) - parseFloat(b);
            break;
        case 'multiplicar':
            resultado = parseFloat(a) * parseFloat(b);
            break;
        case 'dividir':
            resultado = parseFloat(a) / parseFloat(b);
            break;
        default:
            resultado = 'Operación no válida';
    }

    res.send(`El resultado de ${operacion} ${a} y ${b} es: ${resultado}`);
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});