import { ParteHora } from '../models/ParteHora.js';
import { Empleado } from '../models/Empleado.js';

export async function registrarHoras({ empleadoId, horas, produccionId }) {
  if (!empleadoId || typeof horas !== 'number') throw new Error('Datos de horas inválidos');
  return ParteHora.create({ empleado: empleadoId, horas, produccion: produccionId });
}

export async function tarifaPromedioHoraActivos() {
  const agg = await Empleado.aggregate([
    { $match: { activo: true } },
    { $group: { _id: null, prom: { $avg: '$tarifa_hora' } } }
  ]);
  return agg[0]?.prom || 0;
}
