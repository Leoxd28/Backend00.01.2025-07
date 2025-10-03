const { DataTypes, Op } = require('sequelize');
const sequelize = require('./db');

console.log('📊 [models] Initializing Mini Learning Platform models...');

// ================================
// MODELO USER
// ================================
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'First name cannot be empty' },
      len: { args: [2, 100], msg: 'First name must be 2-100 characters' }
    }
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Last name cannot be empty' },
      len: { args: [2, 100], msg: 'Last name must be 2-100 characters' }
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: {
      name: 'email_unique',
      msg: 'Email already exists'
    },
    validate: {
      isEmail: { msg: 'Must be a valid email address' },
      notEmpty: { msg: 'Email cannot be empty' }
    }
  },
  passwordHash: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Password hash cannot be empty' },
      len: { args: [6, 255], msg: 'Password must be at least 6 characters' }
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'instructor', 'student'),
    allowNull: false,
    defaultValue: 'student',
    validate: {
      isIn: {
        args: [['admin', 'instructor', 'student']],
        msg: 'Role must be admin, instructor, or student'
      }
    }
  }
}, {
  tableName: 'users',
  timestamps: true,
  indexes: [
    { fields: ['email'], unique: true },
    { fields: ['role'] },
    { fields: ['createdAt'] }
  ]
});

// ================================
// MODELO COURSE
// ================================
const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: {
      name: 'course_title_unique',
      msg: 'Course title already exists'
    },
    validate: {
      notEmpty: { msg: 'Course title cannot be empty' },
      len: { args: [5, 255], msg: 'Course title must be 5-255 characters' }
    }
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: {
      name: 'course_slug_unique',
      msg: 'Course slug already exists'
    },
    validate: {
      notEmpty: { msg: 'Course slug cannot be empty' },
      is: { args: /^[a-z0-9-]+$/, msg: 'Slug must contain only lowercase letters, numbers and hyphens' }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  studentsCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: 'Students count cannot be negative' } // CORRECCIÓN: debe ser array
    }
  }
}, {
  tableName: 'courses',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    { fields: ['title'], unique: true },
    { fields: ['slug'], unique: true },
    { fields: ['ownerId'] },
    { fields: ['published'] },
    { fields: ['createdAt'] }
  ]
});

// ================================
// MODELO LESSON
// ================================
const Lesson = sequelize.define('Lesson', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Lesson title cannot be empty' },
      len: { args: [3, 255], msg: 'Lesson title must be 3-255 characters' }
    }
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Lesson slug cannot be empty' },
      is: { args: /^[a-z0-9-]+$/, msg: 'Slug must contain only lowercase letters, numbers and hyphens' }
    }
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Lesson body cannot be empty' },
      len: { args: [20, 10000], msg: 'Lesson body must be 20-10000 characters' }
    }
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: { args: [1], msg: 'Lesson order must be at least 1' } // CORRECCIÓN: debe ser array
    }
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    }
  }
}, {
  tableName: 'lessons',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    { fields: ['courseId', 'slug'], unique: true }, // Slug único por curso
    { fields: ['courseId', 'order'], unique: true }, // Order único por curso
    { fields: ['courseId'] },
    { fields: ['createdAt'] }
  ]
});

// ================================
// MODELO ENROLLMENT
// ================================
const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('active', 'pending'),
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: {
        args: [['active', 'pending']],
        msg: 'Status must be active or pending'
      }
    }
  },
  score: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    validate: {
      min: { args: [0], msg: 'Score cannot be negative' }, // CORRECCIÓN: debe ser array
      max: { args: [100], msg: 'Score cannot exceed 100' } // CORRECCIÓN: debe ser array
    }
  }
}, {
  tableName: 'enrollments',
  timestamps: true,
  indexes: [
    { fields: ['userId', 'courseId'], unique: true }, // Un usuario por curso
    { fields: ['userId'] },
    { fields: ['courseId'] },
    { fields: ['status'] },
    { fields: ['createdAt'] }
  ]
});

// ================================
// MODELO COMMENT
// ================================
const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Comment body cannot be empty' }
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  lessonId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'lessons',
      key: 'id'
    }
  }
}, {
  tableName: 'comments',
  timestamps: true,
  indexes: [
    { fields: ['lessonId'] },
    { fields: ['userId'] },
    { fields: ['createdAt'] }
  ]
});

// ================================
// HOOKS - AUTOMATIZACIONES
// ================================

// Hook para generar slug en Course
Course.beforeValidate((course) => {
  console.log('🔧 [Course Hook] beforeValidate triggered');
  
  // Auto-generar slug desde title si no existe
  if (!course.slug && course.title) {
    course.slug = course.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    console.log(`🔧 [Course Hook] Generated slug: ${course.slug}`);
  }
  
  // Normalizar title
  if (course.title) {
    course.title = course.title.trim();
  }
  
  // Normalizar description
  if (course.description) {
    course.description = course.description.trim();
  }
});

// CORRECCIÓN: Hook mejorado para Lesson con auto-order
Lesson.beforeValidate(async (lesson) => {
  console.log('🔧 [Lesson Hook] beforeValidate triggered');
  
  // Auto-generar slug desde title si no existe
  if (!lesson.slug && lesson.title) {
    lesson.slug = lesson.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    console.log(`🔧 [Lesson Hook] Generated slug: ${lesson.slug}`);
  }
  
  // Normalizar title
  if (lesson.title) {
    lesson.title = lesson.title.trim();
  }
  
  // Normalizar body
  if (lesson.body) {
    lesson.body = lesson.body.trim();
  }
  
  // CORRECCIÓN CRÍTICA: Auto-asignar order incremental si no existe
  if (!lesson.order && lesson.courseId) {
    try {
      const maxOrder = await Lesson.max('order', {
        where: { 
          courseId: lesson.courseId,
          deletedAt: null // Para paranoid deletes
        }
      });
      lesson.order = (maxOrder || 0) + 1;
      console.log(`🔧 [Lesson Hook] Auto-assigned order: ${lesson.order} for courseId: ${lesson.courseId}`);
    } catch (error) {
      console.error('❌ [Lesson Hook] Error auto-assigning order:', error.message);
      // Si falla, asignar 1 como fallback
      lesson.order = 1;
    }
  }
});

// Hook para validar y normalizar Comment
Comment.beforeCreate((comment) => {
  console.log('🔧 [Comment Hook] beforeCreate triggered');
  
  // Trim del body
  if (comment.body) {
    comment.body = comment.body.trim();
  }
  
  // Validar longitud mínima después del trim
  if (!comment.body || comment.body.length < 3) {
    throw new Error('Comment body must be at least 3 characters after trimming');
  }
});

Comment.beforeUpdate((comment) => {
  console.log('🔧 [Comment Hook] beforeUpdate triggered');
  
  // Trim del body
  if (comment.body) {
    comment.body = comment.body.trim();
  }
  
  // Validar longitud mínima después del trim
  if (!comment.body || comment.body.length < 3) {
    throw new Error('Comment body must be at least 3 characters after trimming');
  }
});

// ================================
// SCOPES - CONSULTAS PREDEFINIDAS
// ================================

// Scopes para User
User.addScope('instructors', {
  where: { role: 'instructor' }
});

User.addScope('students', {
  where: { role: 'student' }
});

User.addScope('withoutPassword', {
  attributes: { exclude: ['passwordHash'] }
});

// Scopes para Course
Course.addScope('published', {
  where: { published: true }
});

Course.addScope('unpublished', {
  where: { published: false }
});

Course.addScope('withOwner', {
  include: [
    {
      model: User,
      as: 'owner',
      attributes: ['id', 'firstName', 'lastName', 'email', 'role']
    }
  ]
});

// CORRECCIÓN: Scope withLessons corregido
Course.addScope('withLessons', {
  include: [
    {
      model: Lesson,
      as: 'lessons',
      attributes: ['id', 'title', 'slug', 'order'],
      separate: true, // CORRECCIÓN: Para que funcione el order en include
      order: [['order', 'ASC']]
    }
  ]
});

Course.addScope('fullDetails', {
  include: [
    {
      model: User,
      as: 'owner',
      attributes: ['id', 'firstName', 'lastName', 'email']
    },
    {
      model: Lesson,
      as: 'lessons',
      attributes: ['id', 'title', 'slug', 'order'],
      separate: true, // CORRECCIÓN: Para que funcione el order en include
      order: [['order', 'ASC']]
    }
  ]
});

// Scopes para Enrollment
Enrollment.addScope('active', {
  where: { status: 'active' }
});

Enrollment.addScope('pending', {
  where: { status: 'pending' }
});

Enrollment.addScope('withStudent', {
  include: [
    {
      model: User,
      as: 'student',
      attributes: ['id', 'firstName', 'lastName', 'email']
    }
  ]
});

// CORRECCIÓN: Scope adicional para Comments con Author
Comment.addScope('withAuthor', {
  include: [
    {
      model: User,
      as: 'author',
      attributes: ['id', 'firstName', 'lastName']
    }
  ]
});

// ================================
// ASOCIACIONES - RELACIONES
// ================================

console.log('🔗 [models] Setting up associations...');

// User 1:N Course (ownerId)
User.hasMany(Course, { 
  foreignKey: 'ownerId', 
  as: 'courses',
  onDelete: 'CASCADE'
});
Course.belongsTo(User, { 
  foreignKey: 'ownerId', 
  as: 'owner' 
});

// Course 1:N Lesson
Course.hasMany(Lesson, { 
  foreignKey: 'courseId', 
  as: 'lessons',
  onDelete: 'CASCADE'
});
Lesson.belongsTo(Course, { 
  foreignKey: 'courseId', 
  as: 'course' 
});

// User N:M Course (Enrollment tabla intermedia)
User.belongsToMany(Course, { 
  through: Enrollment, 
  foreignKey: 'userId',
  otherKey: 'courseId',
  as: 'enrolledCourses'
});
Course.belongsToMany(User, { 
  through: Enrollment, 
  foreignKey: 'courseId',
  otherKey: 'userId',
  as: 'enrolledStudents'
});

// Asociaciones directas para acceso fácil a Enrollment
User.hasMany(Enrollment, { 
  foreignKey: 'userId', 
  as: 'enrollments',
  onDelete: 'CASCADE'
});
Enrollment.belongsTo(User, { 
  foreignKey: 'userId', 
  as: 'student' 
});

Course.hasMany(Enrollment, { 
  foreignKey: 'courseId', 
  as: 'enrollments',
  onDelete: 'CASCADE'
});
Enrollment.belongsTo(Course, { 
  foreignKey: 'courseId', 
  as: 'course' 
});

// Lesson 1:N Comment
Lesson.hasMany(Comment, { 
  foreignKey: 'lessonId', 
  as: 'comments',
  onDelete: 'CASCADE'
});
Comment.belongsTo(Lesson, { 
  foreignKey: 'lessonId', 
  as: 'lesson' 
});

// User 1:N Comment
User.hasMany(Comment, { 
  foreignKey: 'userId', 
  as: 'comments',
  onDelete: 'CASCADE'
});
Comment.belongsTo(User, { 
  foreignKey: 'userId', 
  as: 'author' 
});

console.log('✅ [models] All associations configured successfully');

// ================================
// EXPORTAR MODELOS Y SEQUELIZE
// ================================

module.exports = {
  sequelize,
  User,
  Course,
  Lesson,
  Enrollment,
  Comment,
  Op // Exportar operadores para uso en controladores
};

console.log('✅ [models] All models exported successfully');
console.log('📊 [models] Available models: User, Course, Lesson, Enrollment, Comment');