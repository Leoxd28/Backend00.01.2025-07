const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

const logger = require('./middlewares/logger');
const error = require('./middlewares/errorHandler');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({windowMs: 60_000, max: 100});


const app = express();

console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV === 'production'){
    app.set('trust proxy', 1);
}

app.use(express.json({limit:'200kb'}));
app.use(express.urlencoded({extended: true}));


app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(cors({origin:process.env.ORIGINS, methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE']}));

app.use(logger);
app.use(error);

app.use('/api/', limiter);



module.exports = app;