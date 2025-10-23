import { Router } from 'express';
import { Op } from 'sequelize';
import { Course, User, Lesson, Enrollment } from '../models/index.js';
import { parsePagination } from '../utils/pagination.js';
import { asyncH } from '../middlewares/error.js';

const r = Router();

// POST /courses
r.post('/', asyncH(async (req, res) => {
  const { title, description, ownerId, published } = req.body;
  const course = await Course.create({ title, description, ownerId, published: !!published });
  res.status(201).json(course);
}));

// GET /courses?published=&q=&order=createdAt:DESC&page=&pageSize=
r.get('/', asyncH(async (req, res) => {
  const { page, pageSize, limit, offset } = parsePagination(req.query);
  const { published, q, order } = req.query;
  const where = {};
  if (typeof published !== 'undefined') where.published = published === 'true';
  if (q?.trim()) where.title = { [Op.like]: `%${q.trim()}%` };

  const [col, dir] = (order?.split(':') ?? ['createdAt','DESC']);

  const { rows, count } = await Course.findAndCountAll({
    where,
    limit,
    offset,
    order: [[col, (dir?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC')]],
    include: [ { model: User, as: 'owner', attributes: ['id','firstName','lastName'] } ]
  });
  res.json({ total: count, page, pageSize, data: rows });
}));

// GET /courses/:slug
r.get('/:slug', asyncH(async (req, res) => {
  const course = await Course.findOne({
    where: { slug: req.params.slug },
    include: [
      { model: User, as: 'owner', attributes: ['id','firstName','lastName','email'] },
      { model: Lesson, as: 'lessons', attributes: ['id','title','slug','order'], order: [['order','ASC']] }
    ]
  });
  if (!course) return res.status(404).json({ error: 'NOT_FOUND' });
  const studentsCount = await Enrollment.count({ where: { courseId: course.id, status: 'active' } });
  res.json({ ...course.toJSON(), stats: { lessonsCount: course.lessons.length, studentsCount } });
}));

r.put('/:id', asyncH(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (!course) return res.status(404).json({ error: 'NOT_FOUND' });
  await course.update(req.body);
  res.json(course);
}));

r.delete('/:id', asyncH(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (!course) return res.status(404).json({ error: 'NOT_FOUND' });
  await course.destroy();
  res.status(204).end();
}));

export default r;
