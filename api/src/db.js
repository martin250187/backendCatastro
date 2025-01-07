// Cargar las variables de entorno solo en desarrollo (local)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { Sequelize } = require('sequelize');

// Obtener las variables de entorno
const auth = {
USER:"postgres",
PASSWORD:"20idepostgres20",
HOST:"200.73.132.170",
PORT:"5432",
BDD:"gisdb"
}

// Imprimir las variables de entorno para depuración
console.log("Variables de entorno:");
console.log("USER:", USER);
console.log("PASSWORD:", PASSWORD);
console.log("HOST:", HOST);
console.log("PORT:", PORT);
console.log("BDD:", BDD);

// Verificar que todas las variables estén definidas
if (!USER || !PASSWORD || !HOST || !PORT || !BDD) {
  console.error('Faltan variables de entorno necesarias');
  process.exit(1);  // Detener la aplicación si faltan variables
}

// Crear la conexión a la base de datos usando Sequelize
/*const database = new Sequelize(
  `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${BDD}`,
  { logging: false }
);*/
const database = new Sequelize(
  `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${BDD}`,
  { logging: false }
);

// Verificar la conexión a la base de datos
database.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

// Exportar la instancia de Sequelize para usarla en otras partes de la aplicación
module.exports = database;
