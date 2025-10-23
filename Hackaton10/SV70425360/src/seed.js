import './models/index.js';
import { sequelize } from './db.js';
import { User, Course, Lesson } from './models/index.js';

async function main() {
  await sequelize.authenticate();
  await sequelize.sync();

  const [ada] = await User.findOrCreate({ where: { email: 'ada@dev.io' }, defaults: { firstName: 'Ada', lastName: 'Lovelace', passwordHash: 'x', role: 'instructor' } });
  const [linus] = await User.findOrCreate({ where: { email: 'linus@dev.io' }, defaults: { firstName: 'Linus', lastName: 'Torvalds', passwordHash: 'y', role: 'student' } });

  const [course] = await Course.findOrCreate({
    where: { slug: 'intro-node' },
    defaults: { title: 'Intro a Node', description: 'Curso base', published: true, ownerId: ada.id }
  });

  await Lesson.findOrCreate({ where: { courseId: course.id, slug: 'setup' }, defaults: { title: 'Setup', slug: 'setup', body: 'Instalación y primeras pruebas...', order: 1, courseId: course.id } });
  await Lesson.findOrCreate({ where: { courseId: course.id, slug: 'http' }, defaults: { title: 'HTTP', slug: 'http', body: 'Conceptos de HTTP, métodos y rutas...', order: 2, courseId: course.id } });

  console.log('Seed listo', { ada: ada.id, linus: linus.id, course: course.id });
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
