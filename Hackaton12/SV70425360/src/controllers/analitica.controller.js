import { capacidadMaximaProducible } from '../queries/capacidad.query.js';
import { costoUnitarioArmarioEstimado } from '../queries/costos.query.js';
export async function capacidad(req, res, next) {
  try { res.json(await capacidadMaximaProducible()); }
  catch (e) { next(e); }
}
export async function costoUnitario(req, res, next) {
  try { res.json(await costoUnitarioArmarioEstimado()); }
  catch (e) { next(e); }
}
