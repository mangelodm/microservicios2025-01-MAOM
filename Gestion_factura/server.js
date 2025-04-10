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

// 🔍 Obtener todos los facturas
app.get('/facturas', (req, res) => {
  db.query('SELECT * FROM facturas', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// 🔍 Obtener todos los prodcutos
app.get('/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
// **Rutas del CRUD** 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));

});

// 🔍 Obtener todos los gesfacturas
app.get('/gesfacturas', (req, res) => {
  db.query('SELECT * FROM gesfacturas', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// 🔍 Obtener un gesfactura por ID
app.get('/gesfacturas/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM gesfacturas WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0] || {}); // Retorna el gesfactura o un objeto vacío
  });
});

//  Agregar un nuevo gesfactura
app.post('/gesfacturas', (req, res) => {
  const { productos_id, cantidades, precios, factura_id } = req.body;
  db.query('INSERT INTO gesfacturas (productos_id, cantidades, precios, factura_id) VALUES (?, ?, ?, ?)',
    [productos_id, cantidades, precios, factura_id ],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'detalle de factura agregado', id: result.insertId });
    }
  );
});

//  Actualizar un gesfactura
app.put('/gesfacturas/:id', (req, res) => {
  const { id } = req.params;
  const { productos_id, cantidades, precios, factura_id } = req.body;
  db.query('UPDATE gesfacturas SET productos_id = ?, cantidades = ?, precios = ?, factura_id = ? WHERE id = ?',
    [productos_id, cantidades, precios, factura_id, id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'detalle de factura actualizado' });
    }
  );
});

//  Eliminar un gesfactura
app.delete('/gesfacturas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM gesfacturas WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'detalle de factura eliminada' });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
