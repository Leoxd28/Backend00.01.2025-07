const express = require('express');
const { body, query, validationResult } = require('express-validator');
const { Enrollment, Course, User } = require('../models');
const { sequelize } = require('../models');

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

// POST /api/courses/:courseId/enroll - Enroll user in course (with transaction)
router.post('/courses/:courseId/enroll', [
    body('userId')
        .isInt({ min: 1 })
        .withMessage('User ID must be a valid integer')
], handleValidationErrors, async (req, res) => {
    const t = await sequelize.transaction();
    
    try {
        const { courseId } = req.params;
        const { userId } = req.body;

        // Verify course exists
        const course = await Course.findByPk(courseId, { transaction: t });
        if (!course) {
            await t.rollback();
            return res.status(404).json({
                error: 'Not Found',
                message: 'Course not found'
            });
        }

        // Verify user exists
        const user = await User.findByPk(userId, { transaction: t });
        if (!user) {
            await t.rollback();
            return res.status(404).json({
                error: 'Not Found',
                message: 'User not found'
            });
        }

        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({
            where: { userId, courseId },
            transaction: t
        });

        if (existingEnrollment) {
            await t.rollback();
            return res.status(409).json({
                error: 'Conflict',
                message: 'User is already enrolled in this course',
                status: existingEnrollment.status
            });
        }

        // Create enrollment with pending status
        const enrollment = await Enrollment.create({
            userId: parseInt(userId),
            courseId: parseInt(courseId),
            status: 'pending'
        }, { transaction: t });

        // Auto-activate enrollment and update course students count
        await enrollment.update({ status: 'active' }, { transaction: t });
        
        // Update course students count
        await Course.increment('studentsCount', {
            by: 1,
            where: { id: courseId },
            transaction: t
        });

        await t.commit();

        console.log(`✅ [enrollments] User ${user.email} enrolled in course ${course.title}`);

        // Return enrollment with user and course info
        const enrollmentWithDetails = await Enrollment.findByPk(enrollment.id, {
            include: [
                {
                    model: User,
                    as: 'student',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'title', 'slug']
                }
            ]
        });

        res.status(201).json({
            message: 'Enrollment created successfully',
            enrollment: enrollmentWithDetails
        });

    } catch (error) {
        await t.rollback();
        console.error('❌ [enrollments] Error creating enrollment:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

// PATCH /api/enrollments/:id/status - Update enrollment status
router.patch('/:id/status', [
    body('status')
        .isIn(['active', 'pending'])
        .withMessage('Status must be active or pending'),
    body('score')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Score must be between 0 and 100')
], handleValidationErrors, async (req, res) => {
    try {
        const { id } = req.params;
        const { status, score } = req.body;

        const enrollment = await Enrollment.findByPk(id);
        if (!enrollment) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Enrollment not found'
            });
        }

        // Update enrollment
        const updates = { status };
        if (score !== undefined) {
            updates.score = score;
        }

        await enrollment.update(updates);

        console.log(`✏️ [enrollments] Enrollment status updated to ${status}`);

        // Return updated enrollment with details
        const updatedEnrollment = await Enrollment.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'student',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'title', 'slug']
                }
            ]
        });

        res.json({
            message: 'Enrollment updated successfully',
            enrollment: updatedEnrollment
        });

    } catch (error) {
        console.error('❌ [enrollments] Error updating enrollment:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

// GET /api/courses/:courseId/enrollments - List course enrollments
router.get('/courses/:courseId/enrollments', [
    query('status').optional().isIn(['active', 'pending']),
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('pageSize').optional().isInt({ min: 1, max: 100 }).toInt()
], handleValidationErrors, async (req, res) => {
    try {
        const { courseId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const status = req.query.status;

        // Verify course exists
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Course not found'
            });
        }

        // Build where conditions
        const where = { courseId };
        if (status) {
            where.status = status;
        }

        // Get enrollments
        const { rows: enrollments, count } = await Enrollment.findAndCountAll({
            where,
            include: [{
                model: User,
                as: 'student',
                attributes: ['id', 'firstName', 'lastName', 'email']
            }],
            order: [['createdAt', 'DESC']],
            limit: pageSize,
            offset: (page - 1) * pageSize
        });

        console.log(`📋 [enrollments] Listed ${enrollments.length}/${count} enrollments for course ${course.title}`);

        res.json({
            courseId: parseInt(courseId),
            courseTitle: course.title,
            total: count,
            page,
            pageSize,
            totalPages: Math.ceil(count / pageSize),
            enrollments
        });

    } catch (error) {
        console.error('❌ [enrollments] Error listing enrollments:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

// GET /api/users/:userId/enrollments - List user enrollments
router.get('/users/:userId/enrollments', [
    query('status').optional().isIn(['active', 'pending'])
], handleValidationErrors, async (req, res) => {
    try {
        const { userId } = req.params;
        const status = req.query.status;

        // Verify user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'User not found'
            });
        }

        // Build where conditions
        const where = { userId };
        if (status) {
            where.status = status;
        }

        // Get enrollments
        const enrollments = await Enrollment.findAll({
            where,
            include: [{
                model: Course,
                as: 'course',
                attributes: ['id', 'title', 'slug', 'description'],
                include: [{
                    model: User,
                    as: 'owner',
                    attributes: ['id', 'firstName', 'lastName']
                }]
            }],
            order: [['createdAt', 'DESC']]
        });

        console.log(`📋 [enrollments] Listed ${enrollments.length} enrollments for user ${user.email}`);

        res.json({
            userId: parseInt(userId),
            userEmail: user.email,
            totalEnrollments: enrollments.length,
            enrollments
        });

    } catch (error) {
        console.error('❌ [enrollments] Error listing user enrollments:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

module.exports = router;