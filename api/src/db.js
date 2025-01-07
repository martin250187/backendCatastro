require("dotenv").config();
const { Sequelize } = require("sequelize");

const { USER, PASSWORD, HOST, PORT, BDD } = process.env;

// Crear la conexión con la base de datos
const database = new Sequelize(
  `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${BDD}`,
  { logging: false }
);

// Verificar la conexión
database.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = database;