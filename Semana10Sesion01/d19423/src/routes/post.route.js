const controller = require('../controllers/post.controller');


const express = require('express');
const postRouter = express.Router();

postRouter.post('/:authorId', controller.addPost)
postRouter.get('/',controller.getPosts);
postRouter.delete('/:id',controller.deletePost)

module.exports = {postRouter}