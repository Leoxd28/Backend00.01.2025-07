const express = require('express');
const router = express.Router();
const { User, Op } = require('../models');

// POST /users
router.post('/', async (req,res) => {
  try {
    const payload = req.body;
    const user = await User.create(payload);
    res.status(201).json({ id: user.id, email: user.email, role: user.role });
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') return res.status(409).json({ error: 'Email already exists' });
    res.status(400).json({ error: e.message });
  }
});

// GET /users
router.get('/', async (req,res) => {
  const page = parseInt(req.query.page||'1');
  const pageSize = parseInt(req.query.pageSize||'10');
  const q = (req.query.q||'').trim();
  const role = req.query.role;
  const where = {};
  if (q) where[Op.or] = [
    { firstName: { [Op.like]: `%${q}%` } },
    { lastName: { [Op.like]: `%${q}%` } },
    { email: { [Op.like]: `%${q}%` } }
  ];
  if (role) where.role = role;
  const { rows, count } = await User.findAndCountAll({
    where, attributes: ['id','firstName','lastName','email','role'],
    limit: pageSize, offset: (page-1)*pageSize
  });
  res.json({ total: count, page, pageSize, data: rows });
});

module.exports = router;
