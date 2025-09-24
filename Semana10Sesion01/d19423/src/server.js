// src/server.js
const express = require('express');
const { sequelize, User, Post, Comment } = require('./models');
const syncDb = require('./sync-db');

const app = express();
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));

app.listen(process.env.PORT || 3000, async () => {
  try {
   // await sequelize.authenticate();
    await syncDb(); // ← sincroniza según DB_SYNC
    console.log('DB OK & synced');
  } catch (e) {
    console.error('DB FAIL', e);
  }
  console.log('Server ready');
});
