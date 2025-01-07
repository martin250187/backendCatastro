const express = require('express');
const cors = require('cors');
const database = require('./src/db'); // Tu conexión a la base de datos

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Definir la ruta
app.get('/api/data', async (req, res) => {
  try {
    const [parcelas] = await database.query('SELECT id, geom, nomencla, partida, nomenclatura, parcela, has_rafam as has from catastro.parcelas_rurales_wgs84');
    const [rafam] = await database.query("SELECT nro_inmueble, par_catastral, resp_pago, tipo from catastro.inmuebles_rafam where tipo='RUR'");

    res.json([parcelas, rafam]); // Devolver los resultados de la consulta
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// Exportar la función para ser utilizada por Vercel (función sin servidor)
module.exports = app;