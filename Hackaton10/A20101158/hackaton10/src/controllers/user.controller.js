const { User } = require('../models');
const { Op } = require('sequelize');

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, passwordHash, role } = req.body;
    const user = await User.create({ firstName, lastName, email, passwordHash, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(err.name === 'SequelizeUniqueConstraintError' ? 409 : 400).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const { role, q = '', page = 1, pageSize = 10 } = req.query;
  const where = {
    ...(role ? { role } : {}),
    [Op.or]: [
      { firstName: { [Op.like]: `%${q}%` } },
      { lastName: { [Op.like]: `%${q}%` } },
      { email: { [Op.like]: `%${q}%` } }
    ]
  };

  const { rows, count } = await User.findAndCountAll({
    where,
    limit: parseInt(pageSize),
    offset: (page - 1) * pageSize
  });

  res.json({ total: count, page: parseInt(page), pageSize: parseInt(pageSize), data: rows });
};
