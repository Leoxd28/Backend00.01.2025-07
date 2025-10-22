const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

const produccionRoutes = require("./routes/produccion.routes");

const limiter = rateLimit({
  windowMs: 60_000,
  max: 100,
});

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(limiter);

app.use("/api/produccion", produccionRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = process.env.PORT || 8050;

connectDB().then(() =>
  app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`))
);
