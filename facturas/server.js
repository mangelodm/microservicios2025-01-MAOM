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

// 🔍 Obtener todos los clientes
app.get('/clientes', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// **Rutas del CRUD** 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));

});

// 🔍 Obtener todos los facturas
app.get('/facturas', (req, res) => {
  db.query('SELECT * FROM facturas', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// 🔍 Obtener un factura por ID
app.get('/facturas/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM facturas WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0] || {}); // Retorna el factura o un objeto vacío
  });
});

//  Agregar un nuevo factura
app.post('/facturas', (req, res) => {
  const { fecha, cliente_id } = req.body;
  db.query('INSERT INTO facturas (fecha,cliente_ID) VALUES (?, ?)',
    [fecha, cliente_id ],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'factura agregado', id: result.insertId });
    }
  );
});

//  Actualizar un factura
app.put('/facturas/:id', (req, res) => {
  const { id } = req.params;
  const { fecha, cliente_id } = req.body;
  db.query('UPDATE facturas SET fecha = ?, cliente_id = ? WHERE id = ?',
    [fecha, cliente_id, id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'factura actualizado' });
    }
  );
});

//  Eliminar un factura
app.delete('/facturas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM facturas WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'factura eliminado' });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
