import * as comprasSvc from '../services/compras.service.js';
export async function crear(req, res, next) {
  try {
    const compra = await comprasSvc.registrarCompra(req.body);
    res.json(compra);
  } catch (e) { next(e); }
}
