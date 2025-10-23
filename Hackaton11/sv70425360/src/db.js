import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { MONGO_URI } = process.env;

export async function connectMongo() {
  if (!MONGO_URI) throw new Error('Missing MONGO_URI in .env');
  mongoose.set('strictQuery', true);
  await mongoose.connect(MONGO_URI, { autoIndex: true });
  return mongoose.connection;
}
