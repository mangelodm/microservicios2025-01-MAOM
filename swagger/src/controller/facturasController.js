const { getRepository } = require("typeorm");
const bcrypt = require("bcrypt");
const { Facturas } = require("../entity/Facturas");

// Obtener todos los facturas
const obtenerFacturas = async (req, res) => {
   const facturas = await getRepository(Facturas).find();
  res.json(facturas);
    // const facturas = await getRepository(Facturas).find();
    // res.render("facturas/index", { facturas });
};

// Crear un nuevo facturas
const crearFacturas = async (req, res) => {
  const { fecha, cliente_id } = req.body;
  const nuevoFacturas = getRepository(Facturas).create({
    fecha,
    cliente_id,
  });
  const resultado = await getRepository(Facturas).save(nuevoFacturas);
  res.json(resultado);
};

// Actualizar un facturas
const editarFacturas = async (req, res) => {
  const { fecha, cliente_id} = req.body;
  const facturas = await getRepository(Facturas).findOne(req.params.id);
  if (facturas) {
    facturas.fecha = fecha;
    facturas.cliente_id = cliente_id;
    const resultado = await getRepository(Facturas).save(facturas);
    res.json(resultado);
  } else {
    res.status(404).json({ mensaje: "Facturas no encontrado" });
  }
};

// Eliminar un facturas
const eliminarFacturas = async (req, res) => {
  const resultado = await getRepository(Facturas).delete(req.params.id);
  res.json(resultado);
};

module.exports = {
  obtenerFacturas,
  crearFacturas,
  editarFacturas,
  eliminarFacturas,
};
