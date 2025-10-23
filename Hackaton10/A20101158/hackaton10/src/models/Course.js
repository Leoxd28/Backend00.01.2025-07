module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    title: { type: DataTypes.STRING, unique: true, validate: { len: [5, 255] } },
    slug: { type: DataTypes.STRING, unique: true },
    description: DataTypes.TEXT,
    published: { type: DataTypes.BOOLEAN, defaultValue: false },
    studentsCount: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, { paranoid: true });

  Course.addScope('published', { where: { published: true } });

  Course.beforeValidate(course => {
    if (!course.slug && course.title) {
      course.slug = course.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    if (course.title) course.title = course.title.trim();
  });

  return Course;
};
