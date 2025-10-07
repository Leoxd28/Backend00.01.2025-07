const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = require('./User')(sequelize, DataTypes);
const Course = require('./Course')(sequelize, DataTypes);
const Lesson = require('./Lesson')(sequelize, DataTypes);
const Enrollment = require('./Enrollment')(sequelize, DataTypes);
const Comment = require('./Comment')(sequelize, DataTypes);

// Relaciones
User.hasMany(Course, { foreignKey: 'ownerId', as: 'courses' });
Course.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

Course.hasMany(Lesson, { foreignKey: 'courseId', as: 'lessons' });
Lesson.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

User.belongsToMany(Course, { through: Enrollment, foreignKey: 'userId', as: 'enrollments' });
Course.belongsToMany(User, { through: Enrollment, foreignKey: 'courseId', as: 'students' });

Lesson.hasMany(Comment, { foreignKey: 'lessonId', as: 'comments' });
Comment.belongsTo(Lesson, { foreignKey: 'lessonId', as: 'lesson' });

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });

module.exports = { sequelize, User, Course, Lesson, Enrollment, Comment };

