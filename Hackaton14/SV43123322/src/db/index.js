const mongoose = require('mongoose');
const env = require('../config/env');

const User = require('./models/user.model');
const RefreshToken = require('./models/refreshToken.model');

async function connect() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.DATABASE_URL, { dbName: env.DATABASE_NAME });
  console.log(`[db] connected to ${env.DATABASE_NAME}`);
}

module.exports = {
  connect,
  mongoose,
  models: {
    User,
    RefreshToken
  }
};