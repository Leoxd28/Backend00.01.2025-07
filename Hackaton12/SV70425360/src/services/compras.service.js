import { Compra } from '../models/Compra.js';
import { Item } from '../models/Item.js';
import { InventarioMovimiento } from '../models/InventarioMovimiento.js';
import { round2 } from '../utils/math.js';

export async function registrarCompra({ proveedor, lineas, ref_doc }) {
  const compra = new Compra({ proveedor, lineas });
  await compra.save();

  for (const l of lineas) {
    const item = await Item.findById(l.item);
    if (!item) throw new Error('Item no encontrado en compra');

    const valorExistente = item.stock * item.costo_promedio;
    const valorCompra = l.cantidad * l.costo_unitario;
    const nuevoStock = item.stock + l.cantidad;
    const nuevoCostoProm = nuevoStock > 0 ? (valorExistente + valorCompra) / nuevoStock : 0;

    item.stock = round2(nuevoStock);
    item.costo_promedio = round2(nuevoCostoProm);
    await item.save();

    await InventarioMovimiento.create({
      tipo: 'COMPRA', item: item._id, cantidad: l.cantidad,
      costo_unitario: l.costo_unitario, ref_doc: ref_doc || `COMPRA:${compra._id}`
    });
  }
  return compra;
}
