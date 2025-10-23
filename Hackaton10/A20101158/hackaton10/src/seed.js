const { sequelize, User, Course, Lesson, Enrollment, Comment } = require('./models');

(async () => {
  try {
    await sequelize.sync({ alter: true });

    // Usuarios
    const users = await User.bulkCreate([
      { firstName: 'Ada', lastName: 'Lovelace', email: 'ada@dev.io', passwordHash: 'x', role: 'instructor' },
      { firstName: 'Linus', lastName: 'Torvalds', email: 'linus@dev.io', passwordHash: 'y', role: 'student' },
      { firstName: 'Grace', lastName: 'Hopper', email: 'grace@dev.io', passwordHash: 'z', role: 'student' }
    ], { ignoreDuplicates: true });

    // Curso
    const [course] = await Course.findOrCreate({
      where: { slug: 'intro-node' },
      defaults: {
        title: 'Intro a Node',
        description: 'Curso base para backend con Node.js y Express',
        published: true,
        ownerId: users[0].id
      }
    });

    // Lecciones
    await Lesson.bulkCreate([
      { title: 'Setup', slug: 'setup', body: 'Instalación y configuración del entorno Node.js', order: 1, courseId: course.id },
      { title: 'HTTP', slug: 'http', body: 'Fundamentos de HTTP y cómo Express los maneja', order: 2, courseId: course.id },
      { title: 'Routing', slug: 'routing', body: 'Definición de rutas y controladores en Express', order: 3, courseId: course.id }
    ]);

    // Inscripciones
    await Enrollment.bulkCreate([
      { userId: users[1].id, courseId: course.id, status: 'active', score: 8.5 },
      { userId: users[2].id, courseId: course.id, status: 'pending' }
    ]);

    // Comentarios
    await Comment.bulkCreate([
      { body: 'Muy clara la explicación del entorno!', userId: users[1].id, lessonId: 1 },
      { body: 'Me gustó el ejemplo de Express con rutas.', userId: users[2].id, lessonId: 2 }
    ]);

    console.log('✅ Datos de prueba cargados correctamente');
    process.exit();
  } catch (err) {
    console.error('❌ Error al cargar datos:', err);
    process.exit(1);
  }
})();
