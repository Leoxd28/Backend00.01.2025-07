import repl from 'repl';
import { connectDB } from '../config/db.js';
import * as ItemModel from '../models/Item.js';

(async () => {
  await connectDB();
  const r = repl.start('armarios> ');
  r.context.Item = ItemModel.Item;
  console.log('REPL listo. Ejemplo: await Item.find()');
})();
