const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path=require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const PORT = 3000;

// Configurar middleware
app.use(cors());
app.use(bodyParser.json()); // Permite recibir JSON en las peticiones

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Cambia según tu configuración
  password: '',      // Cambia según tu configuración
  database: 'bd_ventas'
});

db.connect(err => {
  if (err) {
    console.error('Error conectando a la BD:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

// **Rutas del CRUD** 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));

});

// 🔍 Obtener todos los clientes
app.get('/clientes', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// 🔍 Obtener un Cliente por ID
app.get('/clientes/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0] || {}); // Retorna el Cliente o un objeto vacío
  });
});

//  Agregar un nuevo Cliente
app.post('/clientes', (req, res) => {
  const { ci, nombres, apellidos, sexo } = req.body;
  db.query('INSERT INTO clientes (ci,nombres, apellidos, sexo) VALUES (?, ?, ?, ?)',
    [ci, nombres, apellidos, sexo ],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'Cliente agregado', id: result.insertId });
    }
  );
});

//  Actualizar un Cliente
app.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { ci, nombres, apellidos, sexo } = req.body;
  db.query('UPDATE clientes SET ci = ?, nombres = ?, apellidos = ?, sexo = ? WHERE id = ?',
    [ci, nombres, apellidos, sexo, id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'Cliente actualizado' });
    }
  );
});

//  Eliminar un Cliente
app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM clientes WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Cliente eliminado' });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
