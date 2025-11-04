import * as prodSvc from '../services/produccion.service.js';
export async function iniciar(req, res, next) {
  try {
    const op = await prodSvc.iniciarOP(req.body);
    res.json(op);
  } catch (e) { next(e); }
}
export async function terminar(req, res, next) {
  try {
    const op = await prodSvc.terminarOP(req.params.id);
    res.json(op);
  } catch (e) { next(e); }
}
