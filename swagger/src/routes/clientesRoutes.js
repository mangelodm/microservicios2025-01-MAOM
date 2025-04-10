const express = require("express");
const { getRepository } = require("typeorm");
const { Clientes } = require("../entity/Clientes");
const { obtenerClientes, crearClientes, editarClientes, eliminarClientes } = require("../controller/clientesController");

const router = express.Router();

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     description: Retorna una lista de clientes en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida correctamente.
 */
router.get("/", obtenerClientes);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     description: Retorna un cliente específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a buscar.
 *     responses:
 *       200:
 *         description: Cliente encontrado.
 *       404:
 *         description: Cliente no encontrado.
 */
router.get("/:id", async (req, res) => {
  const cliente = await getRepository(Clientes).findOneBy({ id: req.params.id });
  if (!cliente) {
    return res.status(404).json({ mensaje: "Cliente no encontrado" });
  }
  res.json(cliente);
});

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear un cliente
 *     description: Crea un nuevo cliente en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ci:
 *                 type: int
 *                 example: "123456789"
 *               nombres:
 *                 type: string
 *                 example: "Juan Perez"
 *               apellidos:
 *                 type: string
 *                 example: "Juan Pérez"
 *               sexo:
 *                 type: string
 *                 example: "M"
 *     responses:
 *       201:
 *         description: Cliente creado correctamente.
 */
router.post("/", crearClientes);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Editar un cliente
 *     description: Actualiza los datos de un cliente existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a editar.
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente.
 *       404:
 *         description: Cliente no encontrado.
 */
router.put("/:id", editarClientes);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     description: Elimina un cliente por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a eliminar.
 *     responses:
 *       200:
 *         description: Cliente eliminado correctamente.
 *       404:
 *         description: Cliente no encontrado.
 */
router.delete("/:id", eliminarClientes);

module.exports = router;
