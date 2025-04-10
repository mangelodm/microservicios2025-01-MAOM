const express = require("express");
const { getRepository } = require("typeorm");
const { Facturas } = require("../entity/Facturas");
const { obtenerFacturas, crearFacturas, editarFacturas, eliminarFacturas } = require("../controller/facturasController");

const router = express.Router();

/**
 * @swagger
 * /facturas:
 *   get:
 *     summary: Obtener todos los facturas
 *     description: Retorna una lista de facturas en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de facturas obtenida correctamente.
 */
router.get("/", obtenerFacturas);

/**
 * @swagger
 * /facturas/{id}:
 *   get:
 *     summary: Obtener un factura por ID
 *     description: Retorna un factura específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del factura a buscar.
 *     responses:
 *       200:
 *         description: Factura encontrado.
 *       404:
 *         description: Factura no encontrado.
 */
router.get("/:id", async (req, res) => {
  const factura = await getRepository(Facturas).findOneBy({ id: req.params.id });
  if (!factura) {
    return res.status(404).json({ mensaje: "Factura no encontrado" });
  }
  res.json(factura);
});

/**
 * @swagger
 * /facturas:
 *   post:
 *     summary: Crear un factura
 *     description: Crea un nuevo factura en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: date
 *                 example: "2023-07-06"
 *               cliente_id:
 *                 type: int
 *                 example: "123456789"
 *     responses:
 *       201:
 *         description: Factura creado correctamente.
 */
router.post("/", crearFacturas);

/**
 * @swagger
 * /facturas/{id}:
 *   put:
 *     summary: Editar un factura
 *     description: Actualiza los datos de un factura existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del factura a editar.
 *     responses:
 *       200:
 *         description: Factura actualizado correctamente.
 *       404:
 *         description: Factura no encontrado.
 */
router.put("/:id", editarFacturas);

/**
 * @swagger
 * /facturas/{id}:
 *   delete:
 *     summary: Eliminar un factura
 *     description: Elimina un factura por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del factura a eliminar.
 *     responses:
 *       200:
 *         description: Factura eliminado correctamente.
 *       404:
 *         description: Factura no encontrado.
 */
router.delete("/:id", eliminarFacturas);

module.exports = router;
