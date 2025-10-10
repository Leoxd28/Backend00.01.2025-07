const controller = require('../controllers/course.controller');
const express = require('express');
const courseRouter = express.Router();

courseRouter.post('/', controller.addCourse);
courseRouter.get('/', controller.listCourses);
courseRouter.get('/:slug', controller.getCourseDetail);
courseRouter.put('/:id', controller.updateCourse);
courseRouter.delete('/:id', controller.deleteCourse);

module.exports = { courseRouter };
