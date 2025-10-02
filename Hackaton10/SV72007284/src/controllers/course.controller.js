const db = require('../models');
const Course = db.Course;
const User = db.User;
const Lesson = db.Lesson;
const Enrollment = db.Enrollment;
const { Op } = require('sequelize');
const slugify = require('slugify');

exports.addCourse = async (req, res) => {
  try {
    const { title, description, ownerId } = req.body;

    if (!title || title.length < 5) {
      return res.status(400).json({ message: 'Title must have at least 5 characters' });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const course = await Course.create({
      title,
      slug,
      description,
      ownerId,
      published: false
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const [updated] = await Course.update(req.body, { where: { id: req.params.id } });
    res.status(200).send({ message: `Rows updated: ${updated}` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.destroy({ where: { id: req.params.id } });
    res.status(200).send({
      message: deleted
        ? `Course deleted successfully`
        : `No course found with ID ${req.params.id}`
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.listCourses = async (req, res) => {
  try {
    const { published, q, order = 'createdAt:DESC', page = 1, pageSize = 10 } = req.query;

    const where = {};
    if (published) where.published = published === 'true';

    if (q) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${q}%` } },
        { description: { [Op.iLike]: `%${q}%` } }
      ];
    }

    const [field, direction] = order.split(':');

    const { rows, count } = await Course.findAndCountAll({
      where,
      include: [{ model: User, as: 'owner', attributes: ['id', 'firstName', 'lastName'] }],
      order: [[field, direction]],
      limit: +pageSize,
      offset: (+page - 1) * +pageSize
    });

    res.json({ count, rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCourseDetail = async (req, res) => {
  try {
    const course = await Course.findOne({
      where: { slug: req.params.slug },
      include: [
        { model: User, as: "owner", attributes: ["id", "firstName", "lastName", "email"] },
        { model: Lesson, as: "lessons", attributes: ["id"] },
        { model: User, as: "students", attributes: ["id"], through: { attributes: [] } }
      ]
    });

    if (!course) return res.status(404).json({ message: 'Course not found' });

    const lessonsCount = course.lessons.length;
    const enrollmentsCount = course.students.length;

    res.json({
        ...course.toJSON(),
        lessonsCount,
        enrollmentsCount
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};