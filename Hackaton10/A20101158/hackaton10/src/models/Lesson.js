module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define('Lesson', {
    title: DataTypes.STRING,
    slug: { type: DataTypes.STRING },
    body: { type: DataTypes.TEXT, validate: { len: [20] } },
    order: DataTypes.INTEGER
  }, { paranoid: true });

  Lesson.beforeValidate(lesson => {
    if (!lesson.slug && lesson.title) {
      lesson.slug = lesson.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
  });

  return Lesson;
};
