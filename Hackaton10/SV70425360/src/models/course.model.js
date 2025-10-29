import { DataTypes, Model } from 'sequelize';

const slugify = (s) => s
  .toLowerCase()
  .trim()
  .replace(/\s+/g, '-')
  .replace(/[^a-z0-9-]/g, '')
  .replace(/--+/g, '-');

export default (sequelize) => {
  class Course extends Model {}
  Course.init({
    title: { type: DataTypes.STRING, allowNull: false, validate: { len: [5, 200] } },
    slug:  { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    published: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    studentsCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, {
    sequelize,
    modelName: 'Course',
    paranoid: true,
    defaultScope: { attributes: { exclude: ['deletedAt'] } }
  });

  Course.addScope('published', { where: { published: true } });

  Course.beforeValidate((course) => {
    if (!course.slug && course.title) course.slug = slugify(course.title);
    if (course.title) course.title = course.title.trim();
  });

  return Course;
};
