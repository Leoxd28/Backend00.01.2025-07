const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Importar rutas
const materiaPrimaRoutes = require('./routes/materiaPrimaRoutes');
const insumoRoutes = require('./routes/insumoRoutes');
const personalRoutes = require('./routes/personalRoutes');
const produccionRoutes = require('./routes/produccionRoutes');

// Usar rutas
app.use('/materiasprimas', materiaPrimaRoutes);
app.use('/insumos', insumoRoutes);
app.use('/personal', personalRoutes);
app.use('/produccion', produccionRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
