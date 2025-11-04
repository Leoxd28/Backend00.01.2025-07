/**
 * @openapi
 * /api/v1/orders:
 *   get:
 *     summary: Lista pedidos (paginación, filtro y orden)
 *   post:
 *     summary: Crea pedido
 * /api/v1/orders/export:
 *   get:
 *     summary: Exporta CSV de pedidos
 */
import { Router } from 'express';
import { listOrders, createOrder, exportCSV } from '../../controllers/orders.controller.js';
import { requireToken } from '../../middlewares/auth.token.js';
const r = Router();
r.use(requireToken); // protege toda la ruta
r.get('/', listOrders);
r.post('/', createOrder);
r.get('/export', exportCSV);
export default r;
