const db = require("../models");
const Lesson = db.Lesson;
const Course = db.Course;

exports.addLesson = async (req, res) => {
  try {
    const { courseId } = req.params;

    const last = await Lesson.findOne({
      where: { courseId },
      order: [["order", "DESC"]],
    });
    const order = last ? last.order + 1 : 1;

    const lesson = await Lesson.create({
      ...req.body,
      courseId,
      order,
    });

    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const [updated] = await Lesson.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).send({ message: `Rows updated: ${updated}` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const deleted = await Lesson.destroy({ where: { id: req.params.id } });
    res.status(200).send({
      message: deleted ? `Lesson deleted successfully` : `Lesson not found`,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// GET /courses/:courseId/lessons
exports.listLessons = async (req, res) => {
  try {
    const lessons = await Lesson.findAll({
      where: { courseId: req.params.courseId },
      order: [["order", req.query.order === "DESC" ? "DESC" : "ASC"]],
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["id", "title", "slug"],
        },
      ],
    });

    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
