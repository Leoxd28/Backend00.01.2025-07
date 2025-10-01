/**
 * Simple seeder. Ejecutar: npm run db:seed
 */
const { sequelize, User, Course, Lesson } = require('./models');

async function up() {
  await sequelize.sync({ alter: true });
  const [ada] = await User.findOrCreate({ where: { email: 'ada@dev.io' }, defaults: { firstName:'Ada', lastName:'Lovelace', email:'ada@dev.io', passwordHash:'password', role:'instructor' }});
  const [linus] = await User.findOrCreate({ where: { email: 'linus@dev.io' }, defaults: { firstName:'Linus', lastName:'Torvalds', email:'linus@dev.io', passwordHash:'pass123', role:'student' }});
  const [course] = await Course.findOrCreate({ where: { slug: 'intro-node' }, defaults: { title:'Intro a Node', description:'Curso base', published:true, ownerId: ada.id }});
  await Lesson.findOrCreate({ where: { slug: 'setup', courseId: course.id }, defaults: { title:'Setup', slug:'setup', body:'Contenido inicial del curso...'.repeat(10), order:1, courseId: course.id }});
  await Lesson.findOrCreate({ where: { slug: 'http', courseId: course.id }, defaults: { title:'HTTP', slug:'http', body:'HTTP y rutas...'.repeat(10), order:2, courseId: course.id }});
  console.log('Seed completo');
  process.exit(0);
}

up().catch(e => { console.error(e); process.exit(1); });
