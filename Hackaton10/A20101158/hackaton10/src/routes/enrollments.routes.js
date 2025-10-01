const express = require('express');
const router = express.Router();
const { Enrollment, Course, User, sequelize } = require('../models');
const enrollmentController = require('../controllers/enrollment.controller');

router.post('/courses/:courseId/enroll', enrollmentController.enrollUser);
router.patch('/enrollments/:id/status', enrollmentController.updateEnrollmentStatus);
router.get('/courses/:courseId/enrollments', enrollmentController.listEnrollments);

// Transacción: inscribir y activar
router.post('/courses/:courseId/enroll', async (req, res) => {
  const { userId } = req.body;
  const courseId = req.params.courseId;

  const t = await sequelize.transaction();
  try {
    const enrollment = await Enrollment.create({ userId, courseId, status: 'pending' }, { transaction: t });
    await enrollment.update({ status: 'active' }, { transaction: t });
    await Course.increment('studentsCount', { by: 1, where: { id: courseId }, transaction: t });

    await t.commit();
    res.status(201).json(enrollment);
  } catch (err) {
    await t.rollback();
    res.status(400).json({ error: err.message });
  }
});

// Cambiar status y score
router.patch('/enrollments/:id/status', async (req, res) => {
  const enrollment = await Enrollment.findByPk(req.params.id);
  if (!enrollment) return res.status(404).json({ error: 'Inscripción no encontrada' });

  await enrollment.update({ status: req.body.status, score: req.body.score });
  res.json(enrollment);
});

// Listar inscripciones por curso
router.get('/courses/:courseId/enrollments', async (req, res) => {
  const { status } = req.query;
  const where = { courseId: req.params.courseId, ...(status ? { status } : {}) };

  const enrollments = await Enrollment.findAll({
    where,
    include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName'] }]
  });

  res.json(enrollments);
});

module.exports = router;
