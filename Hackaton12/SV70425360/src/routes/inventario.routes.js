import { Router } from 'express';
import * as inventario from '../controllers/inventario.controller.js';
const r = Router();
r.get('/stock', inventario.stock);
export default r;
