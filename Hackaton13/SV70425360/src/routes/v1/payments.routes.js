/**
 * @openapi
 * /api/v1/payments:
 *   post:
 *     summary: Crea pago (idempotente por Idempotency-Key)
 */
import { Router } from 'express';
import { idempotency } from '../../middlewares/idempotency.js';
import { createPayment } from '../../controllers/payments.controller.js';
const r = Router();
r.post('/', idempotency, createPayment);
export default r;
