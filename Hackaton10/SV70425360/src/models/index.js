import { sequelize } from '../db.js';
import userFactory from './user.model.js';
import courseFactory from './course.model.js';
import lessonFactory from './lesson.model.js';
import enrollmentFactory from './enrollment.model.js';
import commentFactory from './comment.model.js';

export const User = userFactory(sequelize);
export const Course = courseFactory(sequelize);
export const Lesson = lessonFactory(sequelize);
export const Enrollment = enrollmentFactory(sequelize);
export const Comment = commentFactory(sequelize);

// Associations
User.hasMany(Course, { as: 'ownedCourses', foreignKey: 'ownerId' });
Course.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

Course.hasMany(Lesson, { as: 'lessons', foreignKey: 'courseId' });
Lesson.belongsTo(Course, { as: 'course', foreignKey: 'courseId' });

User.belongsToMany(Course, { through: Enrollment, as: 'enrolledCourses', foreignKey: 'userId', otherKey: 'courseId' });
Course.belongsToMany(User, { through: Enrollment, as: 'students', foreignKey: 'courseId', otherKey: 'userId' });
Enrollment.belongsTo(User, { as: 'user', foreignKey: 'userId' });
Enrollment.belongsTo(Course, { as: 'course', foreignKey: 'courseId' });

Lesson.hasMany(Comment, { as: 'comments', foreignKey: 'lessonId' });
Comment.belongsTo(Lesson, { as: 'lesson', foreignKey: 'lessonId' });
Comment.belongsTo(User, { as: 'author', foreignKey: 'userId' });

export default { sequelize, User, Course, Lesson, Enrollment, Comment };
