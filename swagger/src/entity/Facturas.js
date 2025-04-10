const { EntitySchema } = require("typeorm");

module.exports.Facturas = new EntitySchema({
  name: "Facturas",
  tableName: "facturas",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    fecha: {
      type: "date",
    },
    cliente_id: {
      type: "int",
    },
  },
});
