let orders = [
  { id: '1', items: ['A','B'], customerId: 'c1', createdAt: new Date().toISOString() }
];
import { validateOrder } from '../utils/validators.js';
import { streamCSV } from '../utils/csv.js';
export function listOrders(req, res) {
  // Paginación, filtro y orden simples vía query
  const { page = 1, pageSize = 10, customerId, sort = 'createdAt:desc' } = req.query;
  let data = [...orders];
  if (customerId) data = data.filter(o => o.customerId === customerId);
  const [field, dir] = sort.split(':');
  data.sort((a,b) => (a[field] > b[field] ? 1 : -1) * (dir === 'desc' ? -1 : 1));
  const p = Number(page), ps = Number(pageSize);
  const start = (p-1)*ps, end = start+ps;
  res.json({ page: p, pageSize: ps, total: data.length, data: data.slice(start, end) });
}
export function createOrder(req, res, next) {
  const errors = validateOrder(req.body);
  if (errors.length) return next(new Error(errors.join(', ')));
  const id = String(orders.length + 1);
  const o = { id, ...req.body, createdAt: new Date().toISOString() };
  orders.push(o);
  res.status(201).json(o);
}
export function exportCSV(_req, res) {
  const headers = ['id','customerId','items','createdAt'];
  const rows = orders.map(o => ({ ...o, items: o.items.join('|') }));
  streamCSV(res, rows, headers);
}
