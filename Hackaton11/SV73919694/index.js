require('dotenv').config();
const express = require('express');
const { listaRouter } = require('./lista.routes');

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).send({ message: 'Todo listo 🔥' });
});


app.use('/api/items', listaRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
