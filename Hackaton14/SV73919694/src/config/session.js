import session from "express-session";
import { env } from "./env.js";

// Para Redis: import connectRedis from 'connect-redis'; import Redis from 'ioredis';
// const RedisStore = connectRedis(session); const client = new Redis(process.env.REDIS_URL);

export function sessionMiddleware() {
  return session({
    name: "sid",
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: env.IS_PROD,
      maxAge: 1000 * 60 * 15, // 15 min
    },
    // store: new RedisStore({ client })
  });
}
