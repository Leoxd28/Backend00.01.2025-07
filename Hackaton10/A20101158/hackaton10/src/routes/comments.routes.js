const express = require('express');
const router = express.Router();
const { Comment, Lesson, User } = require('../models');
const commentController = require('../controllers/comment.controller');

router.post('/lessons/:lessonId/comments', commentController.createComment);
router.get('/lessons/:lessonId/comments', commentController.listComments);

// Crear comentario con validación
router.post('/lessons/:lessonId/comments', async (req, res) => {
  try {
    const { body, userId } = req.body;
    const lessonId = req.params.lessonId;

    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) return res.status(404).json({ error: 'Lección no encontrada' });

    const comment = await Comment.create({ body, userId, lessonId });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar comentarios paginados
router.get('/lessons/:lessonId/comments', async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const lessonId = req.params.lessonId;

  const { rows, count } = await Comment.findAndCountAll({
    where: { lessonId },
    include: [{ model: User, as: 'author', attributes: ['id', 'firstName', 'lastName'] }],
    limit: parseInt(pageSize),
    offset: (page - 1) * pageSize
  });

  res.json({ total: count, page: parseInt(page), pageSize: parseInt(pageSize), data: rows });
});

module.exports = router;
