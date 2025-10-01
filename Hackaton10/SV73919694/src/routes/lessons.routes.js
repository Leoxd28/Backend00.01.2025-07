const express = require('express');
const router = express.Router();
const { Lesson, Course } = require('../models');

// POST /courses/:courseId/lessons
router.post('/courses/:courseId/lessons', async (req,res) => {
  const course = await Course.findByPk(req.params.courseId);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  const maxOrder = await Lesson.max('order', { where: { courseId: course.id }});
  const order = (isNaN(maxOrder) ? 0 : maxOrder) + 1;
  try {
    const lesson = await Lesson.create({ ...req.body, courseId: course.id, order });
    res.status(201).json(lesson);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET /courses/:courseId/lessons
router.get('/courses/:courseId/lessons', async (req,res) => {
  const order = (req.query.order === 'ASC') ? 'ASC' : 'DESC';
  const lessons = await Lesson.findAll({ where: { courseId: req.params.courseId }, order: [['order', order]] });
  res.json(lessons);
});

// PUT /lessons/:id
router.put('/lessons/:id', async (req,res) => {
  const lesson = await Lesson.findByPk(req.params.id);
  if (!lesson) return res.status(404).json({ error: 'Not found' });
  try {
    await lesson.update(req.body);
    res.json(lesson);
  } catch(e){ res.status(400).json({ error: e.message }); }
});

// DELETE /lessons/:id
router.delete('/lessons/:id', async (req,res) => {
  const lesson = await Lesson.findByPk(req.params.id);
  if (!lesson) return res.status(404).json({ error: 'Not found' });
  await lesson.destroy();
  res.status(204).send();
});

module.exports = router;
