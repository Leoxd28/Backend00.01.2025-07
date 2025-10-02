const db = require('../models');
const Enrollment = db.Enrollment;
const User = db.User;
const Course = db.Course;
const { Sequelize } = require('sequelize');

exports.enroll = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const { courseId } = req.params;
    const { userId } = req.body;

    const enrollment = await Enrollment.create(
      { userId, courseId, status: 'pending' },
      { transaction: t }
    );

    await Course.increment('studentsCount', { by: 1, where: { id: courseId }, transaction: t });

    await t.commit();
    res.status(201).json(enrollment);
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, score } = req.body;

    const [updated] = await Enrollment.update(
      { status, score },
      { where: { id } }
    );

    res.json({ message: `Rows updated: ${updated}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listEnrollments = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { status } = req.query;

    const where = { courseId };
    if (status) where.status = status;

    const enrollments = await Enrollment.findAll({
      where: { courseId, ...(status && { status }) },
      include: [
        { model: User, as: "user", attributes: ["id", "firstName", "lastName", "email"] },
        { model: Course, as: "course", attributes: ["id", "title", "published"] }
        ]
    });

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};