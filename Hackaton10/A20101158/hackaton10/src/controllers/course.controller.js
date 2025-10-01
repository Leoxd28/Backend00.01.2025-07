const { Course, User, Lesson, Enrollment } = require('../models');
const { Op } = require('sequelize');

exports.createCourse = async (req, res) => {
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
};

exports.getCourses = async (req, res) => {
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
};

exports.getCourseDetail = async (req, res) => {
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
};

exports.updateCourse = async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (!course) return res.status(404).json({ error: 'Curso no encontrado' });

  await course.update(req.body);
  res.json(course);
};

exports.deleteCourse = async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (!course) return res.status(404).json({ error: 'Curso no encontrado' });

  await course.destroy();
  res.json({ ok: true });
};
