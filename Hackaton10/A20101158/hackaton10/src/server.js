const express = require('express');
const app = express();
require('dotenv').config();
const { sequelize } = require('./models');

app.use(express.json());

// Rutas
app.use('/users', require('./routes/users.routes'));
app.use('/courses', require('./routes/courses.routes'));
app.use('/lessons', require('./routes/lessons.routes'));
app.use('/enrollments', require('./routes/enrollments.routes'));
app.use('/comments', require('./routes/comments.routes'));

// Middleware de errores
app.use(require('./middlewares/errorHandler'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
