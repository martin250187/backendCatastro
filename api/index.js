// /api/index.js
const express = require('express');
const cors = require('cors');
const { getData } = require('../src/controllers/dataController'); // Asegúrate de que el path sea correcto

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Definir la ruta
app.get('/api/data', getData);

// Exportar la función para ser utilizada por Vercel
module.exports = app;
