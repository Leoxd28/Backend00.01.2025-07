const controller = require('../controllers/comment.controller');


const express = require('express');
const commentRouter = express.Router();

commentRouter.post('/:postId/:userId',controller.createComment)
commentRouter.get('/',controller.getComments)

module.exports = {commentRouter}