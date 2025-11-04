import * as rrhhSvc from '../services/rrhh.service.js';
export async function horas(req, res, next) {
  try {
    const data = await rrhhSvc.registrarHoras(req.body);
    res.json(data);
  } catch (e) { next(e); }
}
