const db = require('../models');
const User = db.User;
const { Op } = require('sequelize')
const bcrypt = require('bcrypt');

exports.addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, passwordHash, role } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const user = await User.create({
      firstName,
      lastName,
      email,
      passwordHash: bcrypt.hashSync(passwordHash, 10),
      role: role || 'student'
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const [updated] = await User.update(req.body, { where: { id: userId } });
    res.status(200).send({ message: `Rows updated: ${updated}` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await User.destroy({ where: { id: userId } });
    res.status(200).send({
      message: deleted
        ? `Record with ID ${userId} deleted successfully.`
        : `No record found with ID ${userId}.`
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.listUsers = async (_, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const { role, q, page = 1, pageSize = 10 } = req.query;
    const where = {};

    if (role) where.role = role;
    if (q) {
      where[Op.or] = [
        { firstName: { [Op.like]: `%${q}%` } },
        { lastName: { [Op.like]: `%${q}%` } },
        { email: { [Op.like]: `%${q}%` } },
      ];
    }

    const { rows, count } = await User.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+page - 1) * +pageSize
    });

    res.json({ count, rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};