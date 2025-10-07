const express = require('express');
const { body, query, validationResult } = require('express-validator');
const { Comment, Lesson, User, Course } = require('../models');

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

// POST /api/lessons/:lessonId/comments - Create comment
router.post('/lessons/:lessonId/comments', [
    body('body')
        .trim()
        .isLength({ min: 5, max: 1000 })
        .withMessage('Comment body must be between 5 and 1000 characters'),
    body('userId')
        .isInt({ min: 1 })
        .withMessage('User ID must be a valid integer')
], handleValidationErrors, async (req, res) => {
    try {
        const { lessonId } = req.params;
        const { body, userId } = req.body;

        // Verify lesson exists
        const lesson = await Lesson.findByPk(lessonId, {
            include: [{
                model: Course,
                as: 'course',
                attributes: ['id', 'title']
            }]
        });

        if (!lesson) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Lesson not found'
            });
        }

        // Verify user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'User not found'
            });
        }

        // Create comment (body will be trimmed by hook)
        const comment = await Comment.create({
            body,
            userId: parseInt(userId),
            lessonId: parseInt(lessonId)
        });

        console.log(`✅ [comments] Comment created by ${user.email} on lesson ${lesson.title}`);

        // Return comment with author info
        const commentWithAuthor = await Comment.findByPk(comment.id, {
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: Lesson,
                    as: 'lesson',
                    attributes: ['id', 'title', 'slug']
                }
            ]
        });

        res.status(201).json({
            message: 'Comment created successfully',
            comment: commentWithAuthor
        });

    } catch (error) {
        console.error('❌ [comments] Error creating comment:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

// GET /api/lessons/:lessonId/comments - List lesson comments with pagination
router.get('/lessons/:lessonId/comments', [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('pageSize').optional().isInt({ min: 1, max: 50 }).toInt()
], handleValidationErrors, async (req, res) => {
    try {
        const { lessonId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        // Verify lesson exists
        const lesson = await Lesson.findByPk(lessonId, {
            attributes: ['id', 'title'],
            include: [{
                model: Course,
                as: 'course',
                attributes: ['id', 'title']
            }]
        });

        if (!lesson) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Lesson not found'
            });
        }

        // Get comments with pagination
        const { rows: comments, count } = await Comment.findAndCountAll({
            where: { lessonId },
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'firstName', 'lastName', 'email']
            }],
            order: [['createdAt', 'DESC']],
            limit: pageSize,
            offset: (page - 1) * pageSize
        });

        console.log(`💬 [comments] Listed ${comments.length}/${count} comments for lesson ${lesson.title}`);

        res.json({
            lessonId: parseInt(lessonId),
            lessonTitle: lesson.title,
            courseTitle: lesson.course.title,
            total: count,
            page,
            pageSize,
            totalPages: Math.ceil(count / pageSize),
            comments
        });

    } catch (error) {
        console.error('❌ [comments] Error listing comments:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

// GET /api/comments/:id - Get comment by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: Lesson,
                    as: 'lesson',
                    attributes: ['id', 'title', 'slug'],
                    include: [{
                        model: Course,
                        as: 'course',
                        attributes: ['id', 'title', 'slug']
                    }]
                }
            ]
        });

        if (!comment) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Comment not found'
            });
        }

        console.log(`💬 [comments] Comment retrieved: ID ${comment.id}`);

        res.json({
            comment
        });

    } catch (error) {
        console.error('❌ [comments] Error getting comment:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

// PUT /api/comments/:id - Update comment
router.put('/:id', [
    body('body')
        .trim()
        .isLength({ min: 5, max: 1000 })
        .withMessage('Comment body must be between 5 and 1000 characters')
], handleValidationErrors, async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req.body;

        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Comment not found'
            });
        }

        // Update comment
        await comment.update({ body });

        console.log(`✏️ [comments] Comment updated: ID ${comment.id}`);

        // Return updated comment with details
        const updatedComment = await Comment.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Lesson,
                    as: 'lesson',
                    attributes: ['id', 'title']
                }
            ]
        });

        res.json({
            message: 'Comment updated successfully',
            comment: updatedComment
        });

    } catch (error) {
        console.error('❌ [comments] Error updating comment:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

// DELETE /api/comments/:id - Delete comment
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Comment not found'
            });
        }

        // Delete comment (hard delete for comments)
        await comment.destroy();

        console.log(`🗑️ [comments] Comment deleted: ID ${id}`);

        res.json({
            message: 'Comment deleted successfully'
        });

    } catch (error) {
        console.error('❌ [comments] Error deleting comment:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

module.exports = router;