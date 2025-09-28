const express = require('express');
const router = express.Router();
const { Comment, Lesson, User } = require('../models');


router.post('/lessons/:lessonId/comments', async (req,res) => {
  const lesson = await Lesson.findByPk(req.params.lessonId);
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
  try {
    const comment = await Comment.create({ body: req.body.body, lessonId: lesson.id, userId: req.body.userId });
    res.status(201).json(comment);
  } catch (e) { res.status(400).json({ error: e.message }); }
});


router.get('/lessons/:lessonId/comments', async (req,res) => {
  const page = parseInt(req.query.page||'1'); const pageSize = parseInt(req.query.pageSize||'10');
  const { rows, count } = await Comment.findAndCountAll({
    where: { lessonId: req.params.lessonId },
    include: [{ model: User, as: 'author', attributes: ['id','firstName','lastName'] }],
    limit: pageSize, offset: (page-1)*pageSize, order: [['createdAt','DESC']]
  });
  res.json({ total: count, page, pageSize, data: rows });
});

module.exports = router;
