const { EntitySchema } = require("typeorm");

module.exports.gesfacturas = new EntitySchema({
  name: "gesfacturas",
  tableName: "gesfacturas",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    productos_id: {
      type: "int",
    },
    cantidades: {
      type: "int",
    },
    precios: {
      type: "int",
    },
    factura_id: {
      type: "int",
    },
  },
});
