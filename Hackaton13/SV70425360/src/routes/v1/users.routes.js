/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     summary: Lista usuarios
 *   post:
 *     summary: Crea usuario
 * /api/v1/users/{id}:
 *   get:
 *     summary: Obtiene usuario por id
 */
import { Router } from 'express';
import { listUsers, getUser, createUser } from '../../controllers/users.controller.js';
const r = Router();
r.get('/', listUsers);
r.post('/', createUser);
r.get('/:id', getUser);
export default r;
