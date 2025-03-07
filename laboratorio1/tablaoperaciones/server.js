const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { resultado: null });
});

app.post('/generar-tabla', (req, res) => {
    const { operacion, numero, inicio, fin } = req.body;
    const num = parseInt(numero);
    const inicioNum = parseInt(inicio);
    const finNum = parseInt(fin);
    let resultado = [];

    for (let i = inicioNum; i <= finNum; i++) {
        let operacionResultado;
        switch (operacion) {
            case 'suma':
                operacionResultado = num + i;
                break;
            case 'resta':
                operacionResultado = num - i;
                break;
            case 'multiplicacion':
                operacionResultado = num * i;
                break;
            case 'division':
                operacionResultado = num / i;
                break;
            default:
                operacionResultado = 'Operación no válida';
        }
        resultado.push({ i, operacionResultado });
    }

    res.render('index', { resultado, operacion, numero, inicio, fin });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});