const database = require('../db');

const getData = async (req, res) => {
  try {
    const [parcelas] = await database.query('SELECT id, geom, nomencla, partida, nomenclatura, parcela, has_rafam as has from catastro.parcelas_rurales_wgs84');
    const [rafam] = await database.query("SELECT nro_inmueble, par_catastral, resp_pago, tipo from catastro.inmuebles_rafam where tipo='RUR'");

    res.json([parcelas, rafam]);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};

module.exports = { getData };