import { Router } from 'express';
import { sequelize } from '../db.js';
import { Enrollment, Course, User } from '../models/index.js';
import { parsePagination } from '../utils/pagination.js';
import { asyncH } from '../middlewares/error.js';

const r = Router();

// POST /courses/:courseId/enroll
r.post('/courses/:courseId/enroll', asyncH(async (req, res) => {
  const { courseId } = req.params;
  const { userId } = req.body;
  const enr = await Enrollment.create({ userId, courseId, status: 'pending' });
  res.status(201).json(enr);
}));

// PATCH /enrollments/:id/status (transaction)
r.patch('/enrollments/:id/status', asyncH(async (req, res) => {
  const { status = 'active', score } = req.body;
  const enr = await Enrollment.findByPk(req.params.id);
  if (!enr) return res.status(404).json({ error: 'NOT_FOUND' });
  const t = await sequelize.transaction();
  try {
    await enr.update({ status, score }, { transaction: t });
    if (status === 'active') {
      await Course.increment('studentsCount', { by: 1, where: { id: enr.courseId }, transaction: t });
    }
    await t.commit();
    res.json(enr);
  } catch (e) {
    await t.rollback();
    throw e;
  }
}));

// GET /courses/:courseId/enrollments
r.get('/courses/:courseId/enrollments', asyncH(async (req, res) => {
  const { page, pageSize, limit, offset } = parsePagination(req.query);
  const where = { courseId: req.params.courseId };
  if (req.query.status) where.status = req.query.status;
  const { rows, count } = await Enrollment.findAndCountAll({ where, limit, offset, include: [{ model: User, as: 'user', attributes: ['id','firstName','lastName','email'] }], order: [['createdAt','DESC']] });
  res.json({ total: count, page, pageSize, data: rows });
}));

export default r;
