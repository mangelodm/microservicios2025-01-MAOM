const { createConnection } = require("typeorm");
const { Clientes } = require("./entity/Clientes");
const { Facturas } = require("./entity/Facturas");
const { Productos } = require("./entity/Productos");
const { gesfacturas } = require("./entity/gesfacturas");

const connectDB = async () => {
  try {
    await createConnection({
      type: "mysql",
      host: process.env.DB_HOST, 
      port: 3306, // Puerto de MySQL (por defecto)
      username: process.env.DB_USER, 
      password: process.env.DB_PASS,
      database: process.env.DB_NAME, //Base de datos
      entities: [Productos, Clientes, Facturas, gesfacturas], 
      synchronize: true, // Solo para desarrollo (crea automáticamente las tablas)
    });
    console.log("Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
