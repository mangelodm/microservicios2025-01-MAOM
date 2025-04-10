const { EntitySchema } = require("typeorm");

module.exports.Productos = new EntitySchema({
  name: "Productos",
  tableName: "productos",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    nombre: {
      type: "varchar",
    },
    descripcion: {
      type: "varchar",
    },
    marca: {
      type: "varchar",
    },
    stock: {
      type: "varchar",
    },
  },
});
