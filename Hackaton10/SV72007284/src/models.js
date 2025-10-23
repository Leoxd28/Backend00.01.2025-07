const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("User", {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.ENUM("admin", "instructor", "student"),
    defaultValue: "student",
  },
}, { tableName: "users", paranoid: true });

const Course = sequelize.define("Course", {
  title: { type: DataTypes.STRING, allowNull: false, unique: true },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  published: { type: DataTypes.BOOLEAN, defaultValue: false },
  studentsCount: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: "courses", paranoid: true });

const slugify = require('slugify');

const Lesson = sequelize.define("Lesson", {
  title: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.TEXT, allowNull: false },
  order: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: "lessons", paranoid: true, hooks: {
    beforeValidate: (lesson) => {
      if (!lesson.slug && lesson.title) {
        lesson.slug = slugify(lesson.title, { lower: true, strict: true });
      }
    }
  }});

const Enrollment = sequelize.define("Enrollment", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  status: { type: DataTypes.ENUM("active", "pending"), defaultValue: "pending",},
  score: { type: DataTypes.DECIMAL(5, 2), allowNull: true,},
}, { tableName: "enrollments" });

const Comment = sequelize.define("Comment", {
  body: { type: DataTypes.TEXT, allowNull: false },
}, { tableName: "comments", paranoid: true });

User.hasMany(Course, { foreignKey: "ownerId", as: "courses" });
Course.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

Course.hasMany(Lesson, { foreignKey: "courseId", as: "lessons" });
Lesson.belongsTo(Course, { foreignKey: "courseId", as: "course" });

User.belongsToMany(Course, { through: Enrollment, foreignKey: "userId", as: "enrolledCourses" });
Course.belongsToMany(User, { through: Enrollment, foreignKey: "courseId", as: "students" });

Lesson.hasMany(Comment, { foreignKey: "lessonId", as: "comments" });
Comment.belongsTo(Lesson, { foreignKey: "lessonId", as: "lesson" });

User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId", as: "author" });

Enrollment.belongsTo(User, { foreignKey: "userId", as: "user" });
Enrollment.belongsTo(Course, { foreignKey: "courseId", as: "course" });

User.hasMany(Enrollment, { foreignKey: "userId", as: "enrollments" });
Course.hasMany(Enrollment, { foreignKey: "courseId", as: "enrollments" });

module.exports = {
  sequelize,
  User,
  Course,
  Lesson,
  Enrollment,
  Comment,
};