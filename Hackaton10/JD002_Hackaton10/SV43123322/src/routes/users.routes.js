const express = require('express');
const { body, query, validationResult } = require('express-validator');
const { User } = require('../models');
const { Op } = require('sequelize');

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

// POST /api/users - Create user
router.post('/', [
    body('firstName')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('First name must be between 2 and 100 characters'),
    body('lastName')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Last name must be between 2 and 100 characters'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Must be a valid email address'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    body('role')
        .optional()
        .isIn(['admin', 'instructor', 'student'])
        .withMessage('Role must be admin, instructor, or student')
], handleValidationErrors, async (req, res) => {
    try {
        const { firstName, lastName, email, password, role = 'student' } = req.body;

        // Check if user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                error: 'Conflict',
                message: 'Email address already exists'
            });
        }

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            passwordHash: password,
            role
        });

        console.log(`✅ [users] User created: ${user.email} (${user.role})`);

        res.status(201).json({
            message: 'User created successfully',
            user: user.toSafeJSON()
        });

    } catch (error) {
        console.error('❌ [users] Error creating user:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

// GET /api/users - List users with filters
router.get('/', [
    query('role').optional().isIn(['admin', 'instructor', 'student']),
    query('q').optional().trim(),
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('pageSize').optional().isInt({ min: 1, max: 100 }).toInt()
], handleValidationErrors, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const role = req.query.role;
        const q = req.query.q?.trim();

        // Build where conditions
        const where = {};
        
        if (role) {
            where.role = role;
        }

        if (q) {
            where[Op.or] = [
                { firstName: { [Op.like]: `%${q}%` } },
                { lastName: { [Op.like]: `%${q}%` } },
                { email: { [Op.like]: `%${q}%` } }
            ];
        }

        // Execute query
        const { rows: users, count } = await User.findAndCountAll({
            where,
            attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt'],
            order: [['createdAt', 'DESC']],
            limit: pageSize,
            offset: (page - 1) * pageSize
        });

        console.log(`📋 [users] Listed ${users.length}/${count} users (page ${page})`);

        res.json({
            total: count,
            page,
            pageSize,
            totalPages: Math.ceil(count / pageSize),
            data: users
        });

    } catch (error) {
        console.error('❌ [users] Error listing users:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt'],
            include: [
                {
                    model: require('../models').Course,
                    as: 'ownedCourses',
                    attributes: ['id', 'title', 'slug', 'published'],
                    required: false
                }
            ]
        });

        if (!user) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'User not found'
            });
        }

        console.log(`👤 [users] User retrieved: ${user.email}`);

        res.json({
            user: user.toJSON()
        });

    } catch (error) {
        console.error('❌ [users] Error getting user:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

module.exports = router;
