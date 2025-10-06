require('dotenv').config();
const express = require('express');
const conectarDB = require('./config/db');

const listRoutes = require('./routes/listRoutes');


const app = express();
app.use(express.json());

conectarDB();


app.use('/api', listRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
