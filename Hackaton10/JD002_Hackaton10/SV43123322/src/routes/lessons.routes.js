const express = require('express');
const { body, query, validationResult } = require('express-validator');
const { Lesson, Course, Comment, User } = require('../models');

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation Error',
            details: errors.array()
        });
    }
    next();
};

// POST /api/courses/:courseId/lessons - Create lesson
router.post('/courses/:courseId/lessons', [
    body('title')
        .trim()
        .isLength({ min: 5, max: 255 })
        .withMessage('Title must be between 5 and 255 characters'),
    body('body')
        .trim()
        .isLength({ min: 20, max: 50000 })
        .withMessage('Body must be between 20 and 50000 characters'),
    body('order')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Order must be a positive integer')
], handleValidationErrors, async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, body, order } = req.body;

        // Verify course exists
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Course not found'
            });
        }

        // Create lesson (order will be auto-assigned if not provided)
        const lesson = await Lesson.create({
            title,
            body,
            order,
            courseId: parseInt(courseId)
        });

        console.log(`✅ [lessons] Lesson created: ${lesson.title} in course ${course.title}`);

        // Return lesson with course info
        const lessonWithCourse = await Lesson.findByPk(lesson.id, {
            include: [{
                model: Course,
                as: 'course',
                attributes: ['id', 'title', 'slug']
            }]
        });

        res.status(201).json({
            message: 'Lesson created successfully',
            lesson: lessonWithCourse
        });

    } catch (error) {
        console.error('❌ [lessons] Error creating lesson:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

// GET /api/courses/:courseId/lessons - List lessons for course
router.get('/courses/:courseId/lessons', [
    query('order').optional().isIn(['ASC', 'DESC'])
], handleValidationErrors, async (req, res) => {
    try {
        const { courseId } = req.params;
        const orderDirection = req.query.order || 'ASC';

        // Verify course exists
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Course not found'
            });
        }

        // Get lessons
        const lessons = await Lesson.findAll({
            where: { courseId },
            include: [{
                model: Course,
                as: 'course',
                attributes: ['id', 'title', 'slug']
            }],
            order: [['order', orderDirection]]
        });

        console.log(`📚 [lessons] Listed ${lessons.length} lessons for course ${course.title}`);

        res.json({
            courseId: parseInt(courseId),
            courseTitle: course.title,
            totalLessons: lessons.length,
            lessons
        });

    } catch (error) {
        console.error('❌ [lessons] Error listing lessons:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

// GET /api/lessons/:id - Get lesson by ID with comments
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const lesson = await Lesson.findByPk(id, {
            include: [
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'title', 'slug'],
                    include: [{
                        model: User,
                        as: 'owner',
                        attributes: ['id', 'firstName', 'lastName']
                    }]
                },
                {
                    model: Comment,
                    as: 'comments',
                    include: [{
                        model: User,
                        as: 'author',
                        attributes: ['id', 'firstName', 'lastName']
                    }],
                    order: [['createdAt', 'DESC']],
                    limit: 10 // Latest 10 comments
                }
            ]
        });

        if (!lesson) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Lesson not found'
            });
        }

        console.log(`📖 [lessons] Lesson retrieved: ${lesson.title}`);

        res.json({
            lesson
        });

    } catch (error) {
        console.error('❌ [lessons] Error getting lesson:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

// PUT /api/lessons/:id - Update lesson
router.put('/:id', [
    body('title')
        .optional()
        .trim()
        .isLength({ min: 5, max: 255 })
        .withMessage('Title must be between 5 and 255 characters'),
    body('body')
        .optional()
        .trim()
        .isLength({ min: 20, max: 50000 })
        .withMessage('Body must be between 20 and 50000 characters'),
    body('order')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Order must be a positive integer')
], handleValidationErrors, async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const lesson = await Lesson.findByPk(id);
        if (!lesson) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Lesson not found'
            });
        }

        // Update lesson
        await lesson.update(updates);

        console.log(`✏️ [lessons] Lesson updated: ${lesson.title}`);

        // Return updated lesson
        const updatedLesson = await Lesson.findByPk(id, {
            include: [{
                model: Course,
                as: 'course',
                attributes: ['id', 'title', 'slug']
            }]
        });

        res.json({
            message: 'Lesson updated successfully',
            lesson: updatedLesson
        });

    } catch (error) {
        console.error('❌ [lessons] Error updating lesson:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

// DELETE /api/lessons/:id - Soft delete lesson
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const lesson = await Lesson.findByPk(id);
        if (!lesson) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Lesson not found'
            });
        }

        // Soft delete
        await lesson.destroy();

        console.log(`🗑️ [lessons] Lesson soft deleted: ${lesson.title}`);

        res.json({
            message: 'Lesson deleted successfully'
        });

    } catch (error) {
        console.error('❌ [lessons] Error deleting lesson:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

module.exports = router;