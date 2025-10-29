import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectMongo } from './db.js';
import todos from './routes/todos.routes.js';

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'tiny'));

// Static demo page
app.use('/', express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api/todos', todos);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'VALIDATION_ERROR', details: err.message });
  }
  res.status(500).json({ error: 'INTERNAL_ERROR' });
});

const PORT = process.env.PORT || 3000;

connectMongo()
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch((e) => { console.error('Startup failed:', e); process.exit(1); });
