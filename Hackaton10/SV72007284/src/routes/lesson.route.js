const controller = require('../controllers/lesson.controller');
const express = require('express');
const lessonRouter = express.Router();

lessonRouter.post('/courses/:courseId/lessons', controller.addLesson);
lessonRouter.get('/courses/:courseId/lessons', controller.listLessons);
lessonRouter.put('/lessons/:id', controller.updateLesson);
lessonRouter.delete('/lessons/:id', controller.deleteLesson);

module.exports = { lessonRouter };
