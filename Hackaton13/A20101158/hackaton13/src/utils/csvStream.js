const User = require('../models/user.model');

exports.streamCSV = async (req, res, next) => {
  try {
    const users = await User.find();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="users.csv"');

    res.write('name,email,age\n');
    users.forEach(u => {
      res.write(`${u.name},${u.email},${u.age || ''}\n`);
    });
    res.end();
  } catch (err) {
    next(err);
  }
};
