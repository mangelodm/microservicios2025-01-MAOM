const { EntitySchema } = require("typeorm");

module.exports.Clientes = new EntitySchema({
  name: "Clientes",
  tableName: "clientes",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    ci: {
      type: "int",
      unique: true,
    },
    nombres: {
      type: "varchar",
    },
    apellidos: {
      type: "varchar",
    },
    sexo: {
      type: "varchar",
    },
  },
});
