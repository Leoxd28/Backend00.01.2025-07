import { Item } from '../models/Item.js';
import { InventarioMovimiento } from '../models/InventarioMovimiento.js';

export async function consumirInventario(itemId, cantidad, ref_doc) {
  const item = await Item.findById(itemId);
  if (!item) throw new Error('Item no encontrado');
  if (item.stock < cantidad) throw new Error(`Stock insuficiente de ${item.nombre}. Stock: ${item.stock}, requerido: ${cantidad}`);
  item.stock = Math.round((item.stock - cantidad) * 100) / 100;
  await item.save();
  await InventarioMovimiento.create({ tipo: 'CONSUMO', item: item._id, cantidad, ref_doc });
}

export async function stockResumen() {
  return Item.find().select('sku nombre tipo unidad stock costo_promedio');
}
