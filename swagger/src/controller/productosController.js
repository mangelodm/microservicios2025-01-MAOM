const { getRepository } = require("typeorm");
const bcrypt = require("bcrypt");
const { Productos } = require("../entity/Productos");

// Obtener todos los prodcutos
const obtenerProductos = async (req, res) => {
   const prodcutos = await getRepository(Productos).find();
  res.json(prodcutos);
    // const prodcutos = await getRepository(Productos).find();
    // res.render("prodcutos/index", { prodcutos });
};

// Crear un nuevo prodcutos
const crearProductos = async (req, res) => {
  const { nombre, descripcion, marca, stock } = req.body;
  const nuevoProductos = getRepository(Productos).create({
    nombre,
    descripcion,
    marca,
    stock,
  });
  const resultado = await getRepository(Productos).save(nuevoProductos);
  res.json(resultado);
};

// Actualizar un prodcutos
const editarProductos = async (req, res) => {
  const { nombre, descripcion, marca, stock } = req.body;
  const prodcutos = await getRepository(Productos).findOne(req.params.id);
  if (prodcutos) {
    prodcutos.nombre = nombre;
    prodcutos.descripcion = descripcion;
    prodcutos.marca = marca;
    prodcutos.stock = stock;
    const resultado = await getRepository(Productos).save(prodcutos);
    res.json(resultado);
  } else {
    res.status(404).json({ mensaje: "Productos no encontrado" });
  }
};

// Eliminar un prodcutos
const eliminarProductos = async (req, res) => {
  const resultado = await getRepository(Productos).delete(req.params.id);
  res.json(resultado);
};

module.exports = {
  obtenerProductos,
  crearProductos,
  editarProductos,
  eliminarProductos,
};
