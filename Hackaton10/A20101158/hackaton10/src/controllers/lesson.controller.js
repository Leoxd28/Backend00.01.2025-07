const { Lesson, Course } = require('../models');

exports.createLesson = async (req, res) => {
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
};

exports.listLessons = async (req, res) => {
  const { order = 'ASC' } = req.query;
  const lessons = await Lesson.findAll({
    where: { courseId: req.params.courseId },
    order: [['order', order]],
    include: [{ model: Course, as: 'course', attributes: ['id', 'title'] }]
  });
  res.json(lessons);
};

exports.updateLesson = async (req, res) => {
  const lesson = await Lesson.findByPk(req.params.id);
  if (!lesson) return res.status(404).json({ error: 'Lección no encontrada' });

  await lesson.update(req.body);
  res.json(lesson);
};

exports.deleteLesson = async (req, res) => {
  const lesson = await Lesson.findByPk(req.params.id);
  if (!lesson) return res.status(404).json({ error: 'Lección no encontrada' });

  await lesson.destroy();
  res.json({ ok: true });
};
