import { Router } from 'express';
import * as compras from '../controllers/compras.controller.js';
const r = Router();
r.post('/', compras.crear);
export default r;
