import * as invSvc from '../services/inventario.service.js';
export async function stock(req, res, next) {
  try {
    const data = await invSvc.stockResumen();
    res.json(data);
  } catch (e) { next(e); }
}
