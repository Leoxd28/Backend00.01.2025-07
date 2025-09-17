require("dotenv").config();
const express = require("express");
const apiRoutes = require("../routes/api.routes");
const errorHandler = require("../middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", apiRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API Gateway corriendo en http://localhost:${PORT}`);
});