const { getRepository } = require("typeorm");
const bcrypt = require("bcrypt");
const { gesfacturas } = require("../entity/gesfacturas");

// Obtener todos los gesfacturas
const obtenergesfacturas = async (req, res) => {
   const gesfacturas = await getRepository(gesfacturas).find();
  res.json(gesfacturas);
    // const gesfacturas = await getRepository(gesfacturas).find();
    // res.render("gesfacturas/index", { gesfacturas });
};

// Crear un nuevo gesfacturas
const creargesfacturas = async (req, res) => {
  const { productos_id, cantidades, precios, factura_id } = req.body;
  const nuevogesfacturas = getRepository(gesfacturas).create({
    productos_id,
    cantidades,
    precios,
    factura_id,
  });
  const resultado = await getRepository(gesfacturas).save(nuevogesfacturas);
  res.json(resultado);
};

// Actualizar un gesfacturas
const editargesfacturas = async (req, res) => {
  const { productos_id, cantidades, precios, factura_id } = req.body;
  const gesfacturas = await getRepository(gesfacturas).findOne(req.params.id);
  if (gesfacturas) {
    gesfacturas.productos_id = productos_id;
    gesfacturas.cantidades = cantidades;
    gesfacturas.precios = precios;
    gesfacturas.factura_id = factura_id;
    const resultado = await getRepository(gesfacturas).save(gesfacturas);
    res.json(resultado);
  } else {
    res.status(404).json({ mensaje: "gesfacturas no encontrado" });
  }
};

// Eliminar un gesfacturas
const eliminargesfacturas = async (req, res) => {
  const resultado = await getRepository(gesfacturas).delete(req.params.id);
  res.json(resultado);
};

module.exports = {
  obtenergesfacturas,
  creargesfacturas,
  editargesfacturas,
  eliminargesfacturas,
};
