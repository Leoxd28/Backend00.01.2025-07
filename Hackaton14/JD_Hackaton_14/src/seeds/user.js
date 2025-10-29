const { models } = require('../db');
const { hashPassword } = require('../utils/passwords');

async function seedUsers() {
  const count = await models.User.countDocuments();
  if (count > 0) return;

  const adminPwd = await hashPassword('Admin123!');
  const userPwd = await hashPassword('User123!');

  await models.User.create([
    { email: 'admin@demo.com', passwordHash: adminPwd, role: 'admin' },
    { email: 'user@demo.com', passwordHash: userPwd, role: 'user' }
  ]);

  console.log('[seed] users created: admin@demo.com / user@demo.com');
}

module.exports = { seedUsers };