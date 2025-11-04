import { Router } from 'express';
import * as rrhh from '../controllers/rrhh.controller.js';
const r = Router();
r.post('/horas', rrhh.horas);
export default r;
