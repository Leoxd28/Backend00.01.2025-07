const controller = require('../controllers/enrollment.controller');
const express = require('express');
const enrollmentRouter = express.Router();

enrollmentRouter.post('/courses/:courseId/enroll', controller.enroll);
enrollmentRouter.patch('/enrollments/:id/status', controller.updateStatus);
enrollmentRouter.get('/courses/:courseId/enrollments', controller.listEnrollments);

module.exports = { enrollmentRouter };
