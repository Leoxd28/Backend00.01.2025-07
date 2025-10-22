const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const router = require('./routes');


const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({windowMs: 60_000, max: 100});

app.use('/api/', limiter);
app.use('/api', router);


module.exports = app;