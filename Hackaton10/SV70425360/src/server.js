import express from 'express';
import dotenv from 'dotenv';
import { ensureConnection, syncSchema } from './db.js';
import './models/index.js'; // registra modelos y asociaciones
import { errorHandler } from './middlewares/error.js';

import users from './routes/users.routes.js';
import courses from './routes/courses.routes.js';
import lessons from './routes/lessons.routes.js';
import enrollments from './routes/enrollments.routes.js';
import comments from './routes/comments.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true, name: 'Mini-Learning Platform API' }));

app.use('/users', users);
app.use('/courses', courses);
app.use(lessons);
app.use(enrollments);
app.use(comments);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

ensureConnection()
  .then(syncSchema)
  .then(() => app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`)))
  .catch((e) => { console.error('Startup failed:', e); process.exit(1); });
