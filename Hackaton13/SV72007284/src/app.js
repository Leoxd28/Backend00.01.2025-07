const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const logger = require("./middlewares/logger");
const requireJson = require("./middlewares/requireJson");
const errorHandler = require("./middlewares/errorHandler");
const conditionalLogger = require("./middlewares/conditionalLogger");
const { metricsMiddleware } = require("./middlewares/metricsMiddleware");

const healthRouter = require("./routes/health");
const v1Router = require("./routes/v1");
const streamRouter = require("./routes/stream");

const app = express();

const docsPath = path.join(__dirname, "../docs/openapi.yaml");
let swaggerDocument = null;
try {
  swaggerDocument = YAML.load(docsPath);
  console.log("Swagger docs cargado correctamente");
} catch (err) {
  console.warn("No se pudo cargar el archivo openapi.yaml:", err.message);
}

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));

app.use(logger);
app.use(conditionalLogger);
app.use(requireJson);
app.use(metricsMiddleware);

app.use("/api/health", healthRouter);
if (swaggerDocument) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
app.use("/api", v1Router);
app.use("/api/stream", streamRouter);

const metricsRouter = require("./routes/metrics");
app.use("/api/metrics", metricsRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Hackaton Express API funcionando",
    docs: swaggerDocument ? "/api/docs" : null,
  });
});

app.use(errorHandler);

module.exports = app;
