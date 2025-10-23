require("dotenv").config();
const express = require("express");
const { listaRouter } = require("./routes/lista.routes.js");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "Todo listo con la API de Lista de Compras" });
});

app.use("/lista", listaRouter);

const PORT = process.env.PORT || 8050;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});