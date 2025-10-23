const express = require('express');
const router = express.Router();
const { Enrollment, Course, sequelize, User } = require('../models');

// POST /courses/:courseId/enroll
router.post('/courses/:courseId/enroll', async (req,res) => {
  const courseId = req.params.courseId;
  const { userId } = req.body;
  const t = await sequelize.transaction();
  try {
    const enr = await Enrollment.create({ userId, courseId, status: 'pending' }, { transaction: t });
    // simulate approval
    await enr.update({ status: 'active' }, { transaction: t });
    await Course.increment('studentsCount', { by: 1, where: { id: courseId }, transaction: t });
    await t.commit();
    res.status(201).json(enr);
  } catch (e) {
    await t.rollback();
    res.status(400).json({ error: e.message });
  }
});

// PATCH /enrollments/:id/status
router.patch('/enrollments/:id/status', async (req,res) => {
  const enr = await Enrollment.findByPk(req.params.id);
  if (!enr) return res.status(404).json({ error: 'Not found' });
  try {
    await enr.update({ status: req.body.status, score: req.body.score });
    res.json(enr);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// GET /courses/:courseId/enrollments
router.get('/courses/:courseId/enrollments', async (req,res) => {
  const enrollments = await Enrollment.findAll({ where: { courseId: req.params.courseId }, include: [{ model: User, as: 'user', attributes: ['id','firstName','lastName','email'] }] });
  res.json(enrollments);
});

module.exports = router;
