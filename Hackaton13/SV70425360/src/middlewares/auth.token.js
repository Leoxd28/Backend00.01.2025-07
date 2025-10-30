import { env } from '../config/env.js';
export function requireToken(req, res, next) {
  const token = req.header('x-token');
  if (token !== env.API_TOKEN) return res.status(401).json({ error: 'x-token inválido' });
  next();
}
