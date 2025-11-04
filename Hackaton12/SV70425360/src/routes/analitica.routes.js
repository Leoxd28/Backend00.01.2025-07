import { Router } from 'express';
import * as analitica from '../controllers/analitica.controller.js';
const r = Router();
r.get('/capacidad', analitica.capacidad);
r.get('/costo-unitario', analitica.costoUnitario);
export default r;
