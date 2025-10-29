import { Router } from 'express';
import { Course, Lesson } from '../models/index.js';
import { asyncH } from '../middlewares/error.js';

const r = Router();

// POST /courses/:courseId/lessons
r.post('/courses/:courseId/lessons', asyncH(async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findByPk(courseId);
  if (!course) return res.status(404).json({ error: 'COURSE_NOT_FOUND' });

  const maxOrder = (await Lesson.max('order', { where: { courseId } })) || 0;
  const lesson = await Lesson.create({
    ...req.body,
    courseId,
    order: (req.body.order ?? (maxOrder + 1))
  });
  res.status(201).json(lesson);
}));

// GET /courses/:courseId/lessons?order=ASC
r.get('/courses/:courseId/lessons', asyncH(async (req, res) => {
  const { courseId } = req.params;
  const dir = (req.query.order ?? 'ASC').toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  const lessons = await Lesson.findAll({ where: { courseId }, order: [['order', dir]], include: [{ model: Course, as: 'course', attributes: ['id','title','slug'] }] });
  res.json(lessons);
}));

r.put('/lessons/:id', asyncH(async (req, res) => {
  const lesson = await Lesson.findByPk(req.params.id);
  if (!lesson) return res.status(404).json({ error: 'NOT_FOUND' });
  await lesson.update(req.body);
  res.json(lesson);
}));

r.delete('/lessons/:id', asyncH(async (req, res) => {
  const lesson = await Lesson.findByPk(req.params.id);
  if (!lesson) return res.status(404).json({ error: 'NOT_FOUND' });
  await lesson.destroy();
  res.status(204).end();
}));

export default r;
