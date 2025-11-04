import { Item } from '../models/Item.js';
import { OrdenProduccion } from '../models/OrdenProduccion.js';
import { ParteHora } from '../models/ParteHora.js';
import { consumirInventario } from './inventario.service.js';

export async function iniciarOP({ codigo, cantidad }) {
  const producto = await Item.findOne({ sku: 'ARM-001' });
  if (!producto) throw new Error('Producto Armario no existe');
  const op = await OrdenProduccion.create({ codigo, producto: producto._id, cantidad_plan: cantidad, estado: 'en_proceso' });
  return op;
}

export async function terminarOP(opId) {
  const op = await OrdenProduccion.findById(opId);
  if (!op) throw new Error('OP no encontrada');
  if (op.estado === 'terminada') return op;

  const reqTablones = op.bom.tablon * op.cantidad_plan;
  const reqGoma = op.bom.gomaKg * op.cantidad_plan;
  const reqHoras = op.bom.hh * op.cantidad_plan;

  const tablon = await Item.findOne({ sku: 'MAT-TABLON' });
  const goma = await Item.findOne({ sku: 'INS-GOMA' });
  if (!tablon || !goma) throw new Error('Items de BOM no configurados');

  await consumirInventario(tablon._id, reqTablones, `OP:${op.codigo}:TABLON`);
  await consumirInventario(goma._id, reqGoma, `OP:${op.codigo}:GOMA`);

  const horasAgg = await ParteHora.aggregate([
    { $match: { produccion: op._id } },
    { $group: { _id: '$produccion', horas: { $sum: '$horas' } } }
  ]);
  const horasRegistradas = horasAgg[0]?.horas || 0;
  if (horasRegistradas < reqHoras) throw new Error(`Horas registradas (${horasRegistradas}) < horas requeridas (${reqHoras}).`);

  const producto = await Item.findById(op.producto);
  producto.stock = Math.round((producto.stock + op.cantidad_plan) * 100) / 100;
  await producto.save();

  op.consumo = { tablones: reqTablones, gomaKg: reqGoma, horas: horasRegistradas };
  op.estado = 'terminada';
  await op.save();
  return op;
}
