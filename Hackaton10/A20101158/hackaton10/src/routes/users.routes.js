const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { Op } = require('sequelize');
const userController = require('../controllers/user.controller');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
// Crear usuario
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, passwordHash, role } = req.body;
    const user = await User.create({ firstName, lastName, email, passwordHash, role });
    res.status(201).json(user);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email ya registrado' });
    }
    res.status(400).json({ error: err.message });
  }
});

// Listar usuarios con filtros
router.get('/', async (req, res) => {
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
});

module.exports = router;
