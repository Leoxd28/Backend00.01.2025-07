// src/server.js
const express = require('express');
const { sequelize, User, Post, Comment } = require('./models');
const syncDb = require('./sync-db');
const {userRouter} = require('./routes/user.route')
const {postRouter} = require('./routes/post.route')
const {commentRouter} = require('./routes/comment.route')

const app = express();
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});
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
