import { DataTypes, Model } from 'sequelize';

const slugify = (s) => s.toLowerCase().trim().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');

export default (sequelize) => {
  class Lesson extends Model {}
  Lesson.init({
    title: { type: DataTypes.STRING, allowNull: false },
    slug:  { type: DataTypes.STRING, allowNull: false },
    body:  { type: DataTypes.TEXT, allowNull: false, validate: { len: [20, 20000] } },
    order: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'Lesson',
    paranoid: true,
    indexes: [{ unique: true, fields: ['courseId','slug'] }]
  });

  Lesson.beforeValidate((l) => {
    if (!l.slug && l.title) l.slug = slugify(l.title);
    if (!l.order) l.order = 1;
  });

  return Lesson;
};
