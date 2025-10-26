import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import { privateRouter } from "./routes/rivate.routes.js";
import { sessionMiddleware } from "./config/session.js";
import { attachCsrfToken, csrfProteccion } from "./middleware/csrf.js";
import { sessionRouter } from "./routes/authSession.routes.js";
import { jwtRouter } from "./routes/authJwt.routes.js";


export const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// set rate limit
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use("/session/login", rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// session CSRF
app.use(sessionMiddleware());
app.use("/session", csrfProteccion, attachCsrfToken, sessionRouter);

// router jwt
app.use("/jwt", jwtRouter);

// private routes
app.use("/private", privateRouter);

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internat Server Error" });
});
