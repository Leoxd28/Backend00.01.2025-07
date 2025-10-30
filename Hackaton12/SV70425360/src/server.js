import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const app = createApp();
const PORT = env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 API escuchando en http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ No se pudo conectar a MongoDB:', err.message);
    process.exit(1);
  });
