import { Item } from '../models/Item.js';
import { Empleado } from '../models/Empleado.js';

function round2(n){ return Math.round((n + Number.EPSILON) * 100) / 100; }

export async function costoUnitarioArmarioEstimado() {
  const tablon = await Item.findOne({ sku: 'MAT-TABLON' });
  const goma = await Item.findOne({ sku: 'INS-GOMA' });
  const tarifaPromedio = await Empleado.aggregate([
    { $match: { activo: true } },
    { $group: { _id: null, prom: { $avg: '$tarifa_hora' } } }
  ]);
  const tarifaHora = tarifaPromedio[0]?.prom || 0;

  const costoMateriales = (tablon?.costo_promedio || 0) * 1 + (goma?.costo_promedio || 0) * 0.25;
  const costoManoObra = tarifaHora * 8;
  return { costoMateriales: round2(costoMateriales), costoManoObra: round2(costoManoObra), costoTotal: round2(costoMateriales + costoManoObra) };
}
