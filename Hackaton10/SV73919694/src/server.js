console.log('iniciando aplicacion');
require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./models');
const users = require('./routes/users.routes');
const courses = require('./routes/courses.routes');
const lessons = require('./routes/lessons.routes');
const enrollments = require('./routes/enrollments.routes');
const comments = require('./routes/comments.routes');

app.use(express.json());

app.use('/users', users);
app.use('/courses', courses);
app.use('/', lessons);
app.use('/', enrollments);
app.use('/', comments);

app.get('/', (req,res) => res.json({ ok: true, env: process.env.DB_DIALECT || 'sqlite' }));

const port = process.env.PORT || 3000;
async function start(){
  await sequelize.sync({ alter: process.env.DB_SYNC === 'alter' });
  app.listen(port, () => console.log('Server running on', port));
}
start();
