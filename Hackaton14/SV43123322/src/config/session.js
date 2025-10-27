const session = require('express-session');
const MongoStore = require('connect-mongo');
const env = require('./env');

function createSession() {
  const store = MongoStore.create({
    mongoUrl: env.DATABASE_URL,
    dbName: env.DATABASE_NAME,
    stringify: false,
    ttl: 60 * 60, // 1 hora
    autoRemove: 'interval',
    autoRemoveInterval: 10 // minutos
  });

  return session({
    name: 'sid',
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 15 // 15 minutos
    }
  });
}

module.exports = { createSession };