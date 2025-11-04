import { Router } from 'express';
import * as produccion from '../controllers/produccion.controller.js';
const r = Router();
const base = '/op';
r.post(base, produccion.iniciar);
r.post(`${base}/:id/terminar`, produccion.terminar);
export default r;
