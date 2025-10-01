const { DataTypes, Op } = require('sequelize');
const sequelize = require('./db');
const slugify = require('slugify');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin','instructor','student'), defaultValue: 'student' }
}, { timestamps: true });

User.beforeCreate(async (u) => {
  if (u.passwordHash && u.passwordHash.length < 60) {
    const salt = await bcrypt.genSalt(8);
    u.passwordHash = await bcrypt.hash(u.passwordHash, salt);
  }
  if (u.firstName) u.firstName = u.firstName.trim();
  if (u.lastName) u.lastName = u.lastName.trim();
});

const Course = sequelize.define('Course', {
  title: { type: DataTypes.STRING, allowNull: false, validate: { len: [5,255] } },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT },
  published: { type: DataTypes.BOOLEAN, defaultValue: false },
  studentsCount: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { paranoid: true });

Course.addScope('published', { where: { published: true } });

Course.beforeValidate((c) => {
  if (!c.slug && c.title) {
    c.slug = slugify(c.title, { lower: true, strict: true });
  }
  if (c.title) c.title = c.title.trim();
});

const Lesson = sequelize.define('Lesson', {
  title: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.TEXT, allowNull: false, validate: { len: [20, 5000] } },
  order: { type: DataTypes.INTEGER, allowNull: false }
}, { paranoid: true });

Lesson.beforeValidate((l) => {
  if (!l.slug && l.title) {
    l.slug = slugify(l.title, { lower: true, strict: true });
  }
});

const Enrollment = sequelize.define('Enrollment', {
  status: { type: DataTypes.ENUM('active','pending'), defaultValue: 'pending' },
  score: { type: DataTypes.DECIMAL(5,2), allowNull: true }
}, { timestamps: true });

const Comment = sequelize.define('Comment', {
  body: { type: DataTypes.TEXT, allowNull: false }
}, { timestamps: true });

Comment.beforeCreate((c) => {
  if (c.body) c.body = c.body.trim();
  if (!c.body || c.body.length < 3) throw new Error('Comment.body too short after trim');
});

// Associations
User.hasMany(Course, { as: 'ownedCourses', foreignKey: 'ownerId' });
Course.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

Course.hasMany(Lesson, { as: 'lessons', foreignKey: 'courseId' });
Lesson.belongsTo(Course, { as: 'course', foreignKey: 'courseId' });

User.belongsToMany(Course, { through: Enrollment, as: 'enrolledCourses', foreignKey: 'userId' });
Course.belongsToMany(User, { through: Enrollment, as: 'students', foreignKey: 'courseId' });

Lesson.hasMany(Comment, { as: 'comments', foreignKey: 'lessonId' });
Comment.belongsTo(Lesson, { as: 'lesson', foreignKey: 'lessonId' });

User.hasMany(Comment, { as: 'comments', foreignKey: 'userId' });
Comment.belongsTo(User, { as: 'author', foreignKey: 'userId' });

module.exports = { sequelize, User, Course, Lesson, Enrollment, Comment, Op };
