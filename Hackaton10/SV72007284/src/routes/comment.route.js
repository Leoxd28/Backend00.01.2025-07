const controller = require('../controllers/comment.controller');
const express = require('express');
const commentRouter = express.Router();

commentRouter.post('/lessons/:lessonId/comments', controller.addComment);
commentRouter.get('/lessons/:lessonId/comments', controller.listComments);

module.exports = { commentRouter };
