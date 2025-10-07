// src/server.js
const express = require('express');
const { sequelize, User, Post, Comment } = require('./models');
const syncDb = require('./sync-db');
const { UserRouter } = require('./routes/users.routes');
const {coursesRoute, CoursesRouter} = require('./routes/courses.route');
const { lessonsRouter } = require('./routes/lessons.routes');
const{enrollmentsRouter}=require("./routes/enrollments.routes")
const{CommentRouter, commentsRouter}=require("./routes/comments.routes")

const app = express();
app.use(express.json());
app.use("/api/user",UserRouter)
app.use("/api/courses",CoursesRouter)
app.use("/api/lessons",lessonsRouter)
app.use("/api/enrollments",enrollmentsRouter)
app.use("/api/comment",commentsRouter)

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
