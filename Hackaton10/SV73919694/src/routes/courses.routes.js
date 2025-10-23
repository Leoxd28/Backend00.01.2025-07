const express = require('express');
const router = express.Router();
const { Course, User, Lesson, Enrollment, Op } = require('../models');

// POST /courses
router.post('/', async (req,res) => {
  try {
    const payload = req.body;
    const course = await Course.create(payload);
    res.status(201).json(course);
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') return res.status(409).json({ error: 'Course slug/title duplicate' });
    res.status(400).json({ error: e.message });
  }
});

// GET /courses
router.get('/', async (req,res) => {
  const page = parseInt(req.query.page||'1'); const pageSize = parseInt(req.query.pageSize||'10');
  const q = (req.query.q||'').trim(); const order = req.query.order || 'createdAt:DESC';
  const where = {};
  if (req.query.published === 'true') where.published = true;
  if (q) where.title = { [Op.like]: `%${q}%` };
  const [field, dir] = order.split(':');
  const { rows, count } = await Course.findAndCountAll({
    where, order: [[field, dir||'DESC']],
    limit: pageSize, offset: (page-1)*pageSize,
    attributes: ['id','title','slug','published','createdAt']
  });
  res.json({ total: count, page, pageSize, data: rows });
});

// GET /courses/:slug
router.get('/:slug', async (req,res) => {
  const slug = req.params.slug;
  const course = await Course.findOne({
    where: { slug },
    include: [
      { model: User, as: 'owner', attributes: ['id','firstName','lastName','email'] },
      { model: Lesson, as: 'lessons', attributes: ['id','title','order'] }
    ]
  });
  if (!course) return res.status(404).json({ error: 'Course not found' });
  const studentsCount = await Enrollment.count({ where: { courseId: course.id, status: 'active' }});
  res.json({ ...course.toJSON(), stats: { lessonsCount: course.lessons.length, studentsCount } });
});

// PUT /courses/:id
router.put('/:id', async (req,res) => {
  const course = await Course.findByPk(req.params.id);
  if (!course) return res.status(404).json({ error: 'Not found' });
  try {
    await course.update(req.body);
    res.json(course);
  } catch(e){
    res.status(400).json({ error: e.message });
  }
});

// DELETE /courses/:id (soft)
router.delete('/:id', async (req,res) => {
  const course = await Course.findByPk(req.params.id);
  if (!course) return res.status(404).json({ error: 'Not found' });
  await course.destroy();
  res.status(204).send();
});

module.exports = router;
