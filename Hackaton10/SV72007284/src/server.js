const express = require("express");
const { sequelize } = require("./models");
const syncDb = require("./sync-db");

const { userRouter } = require("./routes/user.route.js");
const { courseRouter } = require("./routes/course.route.js");
const { lessonRouter } = require("./routes/lesson.route.js");
const { enrollmentRouter } = require("./routes/enrollment.route.js");
const { commentRouter } = require("./routes/comment.route.js");

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api", lessonRouter);
app.use("/api", enrollmentRouter);
app.use("/api", commentRouter);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});

app.get("/health", (_, res) => res.json({ ok: true }));

app.listen(process.env.PORT || 3000, async () => {
  try {
    await syncDb();
    console.log("DB OK & synced");
  } catch (e) {
    console.error("DB FAIL", e);
  }
  console.log("🚀 Server ready on port", process.env.PORT || 3000);
});
