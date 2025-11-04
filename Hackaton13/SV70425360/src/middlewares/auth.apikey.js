import { env } from '../config/env.js';
export function requireApiKey(req, res, next) {
  const key = req.header('x-api-key');
  if (key !== env.API_KEY) return res.status(401).json({ error: 'x-api-key inválida' });
  next();
}
