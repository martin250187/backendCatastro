if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { Sequelize } = require('sequelize');
const { USER, PASSWORD, HOST, PORT, BDD } = process.env;

// Verifica que las variables estén correctamente cargadas
console.log(USER, PASSWORD, HOST, PORT, BDD);  // Solo para depuración

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
