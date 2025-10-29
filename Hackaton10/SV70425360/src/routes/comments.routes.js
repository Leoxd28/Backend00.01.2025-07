import { Router } from 'express';
import { Comment, Lesson, User } from '../models/index.js';
import { parsePagination } from '../utils/pagination.js';
import { asyncH } from '../middlewares/error.js';

const r = Router();

// POST /lessons/:lessonId/comments
r.post('/lessons/:lessonId/comments', asyncH(async (req, res) => {
  const { lessonId } = req.params; const { userId, body } = req.body;
  const lesson = await Lesson.findByPk(lessonId);
  if (!lesson) return res.status(404).json({ error: 'LESSON_NOT_FOUND' });
  const c = await Comment.create({ lessonId, userId, body });
  res.status(201).json(c);
}));

// GET /lessons/:lessonId/comments?page=&pageSize=
r.get('/lessons/:lessonId/comments', asyncH(async (req, res) => {
  const { page, pageSize, limit, offset } = parsePagination(req.query);
  const { rows, count } = await Comment.findAndCountAll({
    where: { lessonId: req.params.lessonId },
    include: [{ model: User, as: 'author', attributes: ['id','firstName','lastName'] }],
    order: [['createdAt','DESC']],
    limit, offset
  });
  res.json({ total: count, page, pageSize, data: rows });
}));

export default r;
