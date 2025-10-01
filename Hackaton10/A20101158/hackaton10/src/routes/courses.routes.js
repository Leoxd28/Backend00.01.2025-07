const express = require('express');
const router = express.Router();
const { Course, User, Lesson, Enrollment } = require('../models');
const { Op } = require('sequelize');
const courseController = require('../controllers/course.controller');

router.post('/', courseController.createCourse);
router.get('/', courseController.getCourses);
router.get('/:slug', courseController.getCourseDetail);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

// Crear curso (solo instructor/admin)
router.post('/', async (req, res) => {
  try {
    const { title, description, ownerId } = req.body;
    const owner = await User.findByPk(ownerId);
    if (!owner || !['instructor', 'admin'].includes(owner.role)) {
      return res.status(403).json({ error: 'Solo instructores o admins pueden crear cursos' });
    }

    const course = await Course.create({ title, description, ownerId });
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar cursos con filtros y paginación
router.get('/', async (req, res) => {
  const { published, q = '', order = 'createdAt:DESC', page = 1, pageSize = 10 } = req.query;
  const [orderField, orderDir] = order.split(':');

  const where = {
    ...(published ? { published: published === 'true' } : {}),
    ...(q ? { title: { [Op.like]: `%${q}%` } } : {})
  };

  const { rows, count } = await Course.findAndCountAll({
    where,
    order: [[orderField, orderDir]],
    limit: parseInt(pageSize),
    offset: (page - 1) * pageSize
  });

  res.json({ total: count, page: parseInt(page), pageSize: parseInt(pageSize), data: rows });
});

// Detalle de curso con eager loading y conteos
router.get('/:slug', async (req, res) => {
  const course = await Course.findOne({
    where: { slug: req.params.slug },
    include: [
      { model: User, as: 'owner', attributes: ['id', 'firstName', 'lastName'] },
      { model: Lesson, as: 'lessons', attributes: ['id', 'title', 'order'] }
    ]
  });

  if (!course) return res.status(404).json({ error: 'Curso no encontrado' });

  const studentsCount = await Enrollment.count({
    where: { courseId: course.id, status: 'active' }
  });

  res.json({
    ...course.toJSON(),
    stats: {
      lessonsCount: course.lessons.length,
      studentsCount
    }
  });
});

// Actualizar curso
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });

    await course.update(req.body);
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Soft delete
router.delete('/:id', async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (!course) return res.status(404).json({ error: 'Curso no encontrado' });

  await course.destroy();
  res.json({ ok: true });
});

module.exports = router;
