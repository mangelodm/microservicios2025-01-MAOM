const express = require("express");
const { getRepository } = require("typeorm");
const { gesfacturas } = require("../entity/gesfacturas");
const { obtenergesfacturas, creargesfacturas, editargesfacturas, eliminargesfacturas } = require("../controller/gesfacturasController");

const router = express.Router();

/**
 * @swagger
 * /gesfacturas:
 *   get:
 *     summary: Obtener todos los gesfacturas
 *     description: Retorna una lista de gesfacturas en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de gesfacturas obtenida correctamente.
 */
router.get("/", obtenergesfacturas);

/**
 * @swagger
 * /gesfacturas/{id}:
 *   get:
 *     summary: Obtener un gesfacturas por ID
 *     description: Retorna un gesfacturas específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del gesfacturas a buscar.
 *     responses:
 *       200:
 *         description: gesfacturas encontrado.
 *       404:
 *         description: gesfacturas no encontrado.
 */
router.get("/:id", async (req, res) => {
  const gesfacturas = await getRepository(gesfacturas).findOneBy({ id: req.params.id });
  if (!gesfacturas) {
    return res.status(404).json({ mensaje: "gesfacturas no encontrado" });
  }
  res.json(gesfacturas);
});

/**
 * @swagger
 * /gesfacturas:
 *   post:
 *     summary: Crear un gesfacturas
 *     description: Crea un nuevo gesfacturas en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productos_id:
 *                 type: int
 *                 example: "123456789"
 *               cantidades:
 *                 type: int
 *                 example: "123456789"
 *               precios:
 *                 type: int
 *                 example: "123456789"
 *               facturas_id:
 *                 type: int
 *                 example: "123456789"
 *     responses:
 *       201:
 *         description: gesfacturas creado correctamente.
 */
router.post("/", creargesfacturas);

/**
 * @swagger
 * /gesfacturas/{id}:
 *   put:
 *     summary: Editar un gesfacturas
 *     description: Actualiza los datos de un gesfacturas existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del gesfacturas a editar.
 *     responses:
 *       200:
 *         description: gesfacturas actualizado correctamente.
 *       404:
 *         description: gesfacturas no encontrado.
 */
router.put("/:id", editargesfacturas);

/**
 * @swagger
 * /gesfacturas/{id}:
 *   delete:
 *     summary: Eliminar un gesfacturas
 *     description: Elimina un gesfacturas por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del gesfacturas a eliminar.
 *     responses:
 *       200:
 *         description: gesfacturas eliminado correctamente.
 *       404:
 *         description: gesfacturas no encontrado.
 */
router.delete("/:id", eliminargesfacturas);

module.exports = router;
