const express = require('express');
const morgan = require('morgan');
const connectDB = require('./db');

const authors = require('./routes/author.routes');
const books = require('./routes/book.routes');
const bundle = require('./routes/bundle.routes');
const error = require('./middlewares/error');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/authors', authors);
app.use('/api/books', books);
app.use('/api/bundle', bundle);

app.use(error);

const PORT = process.env.PORT ||  3000;
connectDB().then(()=>app.listen(PORT, ()=>console.log(`API en el puerto ${PORT}`)));