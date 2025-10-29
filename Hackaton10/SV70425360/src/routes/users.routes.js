import { Router } from 'express';
import { Op } from 'sequelize';
import { User } from '../models/index.js';
import { parsePagination } from '../utils/pagination.js';
import { asyncH } from '../middlewares/error.js';

const r = Router();

r.post('/', asyncH(async (req, res) => {
  const body = req.body ?? {};
  if (!body.role) body.role = 'student';
  const user = await User.create(body);
  res.status(201).json(user);
}));

r.get('/', asyncH(async (req, res) => {
  const { page, pageSize, limit, offset } = parsePagination(req.query);
  const { role, q } = req.query;
  const where = {};
  if (role) where.role = role;
  if (q?.trim()) {
    const like = { [Op.like]: `%${q.trim()}%` };
    Object.assign(where, { [Op.or]: [ { firstName: like }, { lastName: like }, { email: like } ] });
  }
  const { rows, count } = await User.findAndCountAll({ where, limit, offset, order: [['createdAt','DESC']] });
  res.json({ total: count, page, pageSize, data: rows });
}));

export default r;
