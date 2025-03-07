const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root', 
    password: '',
    database: 'bd_agenda'
});


db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Crear un nuevo registro 
app.post('/agenda', (req, res) => {
    const { nombres, apellidos, direccion, telefono } = req.body;
    const sql = 'INSERT INTO agenda (nombres, apellidos, direccion, telefono) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombres, apellidos, direccion, telefono], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ id: result.insertId, nombres, apellidos, direccion, telefono });
    });
});

// Leer todos los registros 
app.get('/agenda', (req, res) => {
    const sql = 'SELECT * FROM agenda';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(results);
    });
});

// Leer un registro
app.get('/agenda/:id', (req, res) => {
    const sql = 'SELECT * FROM agenda WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send('Registro no encontrado');
        }
        res.send(result[0]);
    });
});

// Actualizar un registro 
app.put('/agenda/:id', (req, res) => {
    const { nombres, apellidos, direccion, telefono } = req.body;
    const sql = 'UPDATE agenda SET nombres = ?, apellidos = ?, direccion = ?, telefono = ? WHERE id = ?';
    db.query(sql, [nombres, apellidos, direccion, telefono, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Registro no encontrado');
        }
        res.send({ id: req.params.id, nombres, apellidos, direccion, telefono });
    });
});

// Eliminar un registro 
app.delete('/agenda/:id', (req, res) => {
    const sql = 'DELETE FROM agenda WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Registro no encontrado');
        }
        res.send({ message: 'Registro eliminado' });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});