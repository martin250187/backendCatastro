// Cargar las variables de entorno solo en desarrollo (local)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { Sequelize } = require('sequelize');

// Obtener las variables de entorno
const { USER, PASSWORD, HOST, PORT, BDD } = process.env;

// Validación para asegurarse de que todas las variables estén definidas
if (!USER || !PASSWORD || !HOST || !PORT || !BDD) {
  console.error('Faltan variables de entorno necesarias');
  process.exit(1);  // Detener la aplicación si faltan variables
}

// Imprimir las variables de entorno para depuración (opcional)
console.log(USER, PASSWORD, HOST, PORT, BDD);  // Solo para depuración

// Crear la conexión a la base de datos usando Sequelize
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

// Exportar la instancia de la base de datos para usarla en otras partes de la aplicación
module.exports = database;
