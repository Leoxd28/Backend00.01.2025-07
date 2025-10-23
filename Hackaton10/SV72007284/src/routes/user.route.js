const controller = require('../controllers/user.controller');


const express = require('express');
const userRouter = express.Router();
userRouter.post('/',controller.addUser);
userRouter.get('/', controller.listUsers);
userRouter.put('/:id',controller.updateUser);
userRouter.delete('/:id',controller.deleteUser);

module.exports = {userRouter}
