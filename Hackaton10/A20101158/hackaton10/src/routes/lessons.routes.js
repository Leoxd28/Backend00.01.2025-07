const express = require('express');
const router = express.Router();
const { Lesson, Course } = require('../models');
const lessonController = require('../controllers/lesson.controller');

router.post('/courses/:courseId/lessons', lessonController.createLesson);
router.get('/courses/:courseId/lessons', lessonController.listLessons);
router.put('/:id', lessonController.updateLesson);
router.delete('/:id', lessonController.deleteLesson);

// Crear lección con orden incremental
router.post('/courses/:courseId/lessons', async (req, res) => {
  try {
    const { title, body } = req.body;
    const courseId = req.params.courseId;

    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });

    const count = await Lesson.count({ where: { courseId } });
    const lesson = await Lesson.create({ title, body, order: count + 1, courseId });
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar lecciones por curso
router.get('/courses/:courseId/lessons', async (req, res) => {
  const { order = 'ASC' } = req.query;
  const lessons = await Lesson.findAll({
    where: { courseId: req.params.courseId },
    order: [['order', order]],
    include: [{ model: Course, as: 'course', attributes: ['id', 'title'] }]
  });
  res.json(lessons);
});

// Editar lección
router.put('/:id', async (req, res) => {
  const lesson = await Lesson.findByPk(req.params.id);
  if (!lesson) return res.status(404).json({ error: 'Lección no encontrada' });

  await lesson.update(req.body);
  res.json(lesson);
});

// Soft delete
router.delete('/:id', async (req, res) => {
  const lesson = await Lesson.findByPk(req.params.id);
  if (!lesson) return res.status(404).json({ error: 'Lección no encontrada' });

  await lesson.destroy();
  res.json({ ok: true });
});

module.exports = router;
