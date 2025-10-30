const users = [
  { id: '1', name: 'Ana', email: 'ana@example.com' },
  { id: '2', name: 'Luis', email: 'luis@example.com' }
];
import { validateUser } from '../utils/validators.js';
export function listUsers(_req, res) { res.json(users); }
export function getUser(req, res) {
  const u = users.find(x => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(u);
}
export function createUser(req, res, next) {
  const errors = validateUser(req.body);
  if (errors.length) return next(new Error(errors.join(', ')));
  const id = String(users.length + 1);
  const u = { id, ...req.body };
  users.push(u);
  res.status(201).json(u);
}
