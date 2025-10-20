
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');
const { httpRequestCounter } = require('./utils/metrics');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./src/docs/openapi.yaml');

const app = express();


app.use(helmet());
app.use(cors());
app.use(compression());


app.use(morgan('dev'));
app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
});
app.use(limiter);

app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({ method: req.method, route: req.originalUrl, status: res.statusCode });
  });
  next();
});

app.use('/api', routes);


app.use(errorHandler);

module.exports = app;
