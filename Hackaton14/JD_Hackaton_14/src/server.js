const app = require('./app');
const env = require('./config/env');
const db = require('./db');
const { seedUsers } = require('./seeds/user');

(async () => {
  try {
    await db.connect();
    await seedUsers();
    app.listen(env.PORT, () => {
      console.log(`API listening on http://localhost:${env.PORT}`);
    });
  } catch (e) {
    console.error('Startup error:', e);
    process.exit(1);
  }
})();