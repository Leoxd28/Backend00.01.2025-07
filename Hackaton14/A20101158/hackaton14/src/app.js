import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authSessionRoutes from "./routes/authSession.routes.js";
import authJwtRoutes from "./routes/authJwt.routes.js";
import protectedRoutes from "./routes/protected.routes.js";
import logsRoutes from "./routes/logs.routes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 15,
    },
  })
);


app.use("/session", authSessionRoutes);
app.use(cookieParser());
app.use("/jwt", authJwtRoutes);
app.use("/api", protectedRoutes);
app.use("/logs", logsRoutes);
export default app;
