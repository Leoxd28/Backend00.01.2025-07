import { Item } from '../models/Item.js';
import { ParteHora } from '../models/ParteHora.js';

export async function capacidadMaximaProducible() {
  const tablon = await Item.findOne({ sku: 'MAT-TABLON' });
  const goma = await Item.findOne({ sku: 'INS-GOMA' });
  if (!tablon || !goma) throw new Error('Items de BOM no configurados');

  const hoy = new Date(); hoy.setHours(0,0,0,0);
  const horasAgg = await ParteHora.aggregate([
    { $match: { fecha: { $gte: hoy } } },
    { $group: { _id: null, horas: { $sum: '$horas' } } }
  ]);
  const horasDisp = horasAgg[0]?.horas || 0;

  const maxPorTablon = Math.floor((tablon.stock) / 1);
  const maxPorGoma = Math.floor((goma.stock) / 0.25);
  const maxPorHoras = Math.floor(horasDisp / 8);
  const max = Math.max(0, Math.min(maxPorTablon, maxPorGoma, maxPorHoras));
  return { max, por_recurso: { tablones: maxPorTablon, goma: maxPorGoma, horas: maxPorHoras } };
}
