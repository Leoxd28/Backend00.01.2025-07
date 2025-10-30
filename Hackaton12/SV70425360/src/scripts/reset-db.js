import { connectDB, disconnectDB } from '../config/db.js';
import mongoose from 'mongoose';

async function reset() {
  await connectDB();
  const collections = await mongoose.connection.db.collections();
  for (const c of collections) {
    await c.deleteMany({});
    console.log('🗑️  Limpiada:', c.collectionName);
  }
  await disconnectDB();
  console.log('✅ Reset finalizado');
}
reset().catch(e => { console.error(e); process.exit(1); });
