const { getRepository } = require("typeorm");
const bcrypt = require("bcrypt");
const { Clientes } = require("../entity/Clientes");

// Obtener todos los clientes
const obtenerClientes = async (req, res) => {
   const clientes = await getRepository(Clientes).find();
  res.json(clientes);
    // const clientes = await getRepository(Clientes).find();
    // res.render("clientes/index", { clientes });
};

// Crear un nuevo clientes
const crearClientes = async (req, res) => {
  const { ci, nombres, apellidos, sexo } = req.body;
  const nuevoClientes = getRepository(Clientes).create({
    ci,
    nombres,
    apellidos,
    sexo,
  });
  const resultado = await getRepository(Clientes).save(nuevoClientes);
  res.json(resultado);
};

// Actualizar un clientes
const editarClientes = async (req, res) => {
  const { ci, nombres, apellidos, sexo } = req.body;
  const clientes = await getRepository(Clientes).findOne(req.params.id);
  if (clientes) {
    clientes.ci = ci;
    clientes.nombres = nombres;
    clientes.apellidos = apellidos;
    clientes.sexo = sexo;
    const resultado = await getRepository(Clientes).save(clientes);
    res.json(resultado);
  } else {
    res.status(404).json({ mensaje: "Cliente no encontrado" });
  }
};

// Eliminar un clientes
const eliminarClientes = async (req, res) => {
  const resultado = await getRepository(Clientes).delete(req.params.id);
  res.json(resultado);
};

module.exports = {
  obtenerClientes,
  crearClientes,
  editarClientes,
  eliminarClientes,
};
