const express = require('express');
const { getAllUsers, createUser } = require('../../controllers/users.controller');
const authToken = require('../../middlewares/authToken');
const router = express.Router();

router.get('/', authToken, getAllUsers);
router.post('/', authToken, createUser);

module.exports = router;
