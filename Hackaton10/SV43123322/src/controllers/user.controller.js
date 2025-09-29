const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { validationResult } = require('express-validator');

/**
 * @desc    Create a new user
 * @route   POST /api/users
 * @access  Public
 */
const createUser = async (req, res) => {
    console.log('🔍 [user.controller] createUser - Request received');
    console.log('📊 [user.controller] Request body:', req.body);
    
    try {
        // Verificar errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('❌ [user.controller] Validation errors:', errors.array());
            return res.status(400).json({
                error: 'Validation Error',
                details: errors.array()
            });
        }

        const { firstName, lastName, email, password, role = 'student' } = req.body;

        console.log('🔍 [user.controller] Checking if email exists:', email);

        // Verificar si el email ya existe - USAR MÉTODO CORRECTO
        const existingUser = await User.findOne({ 
            where: { email: email } 
        });

        if (existingUser) {
            console.log('❌ [user.controller] Email already exists:', email);
            return res.status(409).json({
                error: 'Conflict',
                message: 'El email ya está registrado'
            });
        }

        console.log('🔒 [user.controller] Hashing password...');
        
        // Hashear la contraseña
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        console.log('💾 [user.controller] Creating user in database...');

        // Crear el usuario
        const user = await User.create({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.toLowerCase().trim(),
            passwordHash,
            role
        });

        console.log('✅ [user.controller] User created successfully:', user.id);

        // Respuesta sin contraseña
        const userResponse = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: userResponse
        });

    } catch (error) {
        console.error('❌ [user.controller] Error creating user:', error);
        
        // Manejo específico de errores de Sequelize
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                error: 'Conflict',
                message: 'El email ya está registrado'
            });
        }

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Validation Error',
                message: error.message,
                details: error.errors
            });
        }

        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error al crear el usuario',
            ...(process.env.NODE_ENV === 'development' && { details: error.message })
        });
    }
};

/**
 * @desc    Get all users with filters and pagination
 * @route   GET /api/users
 * @access  Public
 */
const getUsers = async (req, res) => {
    console.log('🔍 [user.controller] getUsers - Request received');
    
    try {
        const { 
            page = 1, 
            pageSize = 10, 
            role, 
            q, 
            order = 'createdAt:DESC' 
        } = req.query;

        // Validar paginación
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(50, Math.max(1, parseInt(pageSize)));
        const offset = (pageNum - 1) * limitNum;

        // Construir filtros
        const whereClause = {};
        
        if (role) {
            whereClause.role = role;
        }

        if (q) {
            const { Op } = require('sequelize');
            whereClause[Op.or] = [
                { firstName: { [Op.like]: `%${q}%` } },
                { lastName: { [Op.like]: `%${q}%` } },
                { email: { [Op.like]: `%${q}%` } }
            ];
        }

        // Construir ordenamiento
        let orderBy = [['createdAt', 'DESC']];
        if (order) {
            const [field, direction] = order.split(':');
            if (['firstName', 'lastName', 'email', 'role', 'createdAt'].includes(field)) {
                orderBy = [[field, direction === 'ASC' ? 'ASC' : 'DESC']];
            }
        }

        console.log('🔍 [user.controller] Query params:', { whereClause, orderBy, limitNum, offset });

        // Ejecutar consulta
        const { count, rows: users } = await User.findAndCountAll({
            where: whereClause,
            order: orderBy,
            limit: limitNum,
            offset: offset,
            attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt', 'updatedAt']
        });

        console.log('✅ [user.controller] Users retrieved:', users.length);

        const totalPages = Math.ceil(count / limitNum);

        res.json({
            users,
            pagination: {
                currentPage: pageNum,
                pageSize: limitNum,
                totalItems: count,
                totalPages,
                hasNext: pageNum < totalPages,
                hasPrev: pageNum > 1
            },
            filters: {
                role: role || 'all',
                search: q || '',
                order
            }
        });

    } catch (error) {
        console.error('❌ [user.controller] Error getting users:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error al obtener usuarios'
        });
    }
};

/**
 * @desc    Get single user by ID
 * @route   GET /api/users/:id
 * @access  Public
 */
const getUserById = async (req, res) => {
    console.log('🔍 [user.controller] getUserById - Request received');
    
    try {
        const { id } = req.params;

        console.log('🔍 [user.controller] Looking for user ID:', id);

        const user = await User.findByPk(id, {
            attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt', 'updatedAt'],
            include: [
                {
                    association: 'enrollments',
                    attributes: ['id', 'status', 'score', 'createdAt'],
                    include: [
                        {
                            association: 'course',
                            attributes: ['id', 'title', 'slug']
                        }
                    ]
                }
            ]
        });

        if (!user) {
            console.log('❌ [user.controller] User not found:', id);
            return res.status(404).json({
                error: 'Not Found',
                message: 'Usuario no encontrado'
            });
        }

        console.log('✅ [user.controller] User found:', user.id);

        // Calcular estadísticas
        const stats = {
            totalEnrollments: user.enrollments?.length || 0,
            activeEnrollments: user.enrollments?.filter(e => e.status === 'active').length || 0,
            pendingEnrollments: user.enrollments?.filter(e => e.status === 'pending').length || 0,
            averageScore: user.enrollments?.length ? 
                user.enrollments
                    .filter(e => e.score !== null)
                    .reduce((sum, e) => sum + parseFloat(e.score), 0) / 
                user.enrollments.filter(e => e.score !== null).length || 0 : 0
        };

        res.json({
            user,
            stats
        });

    } catch (error) {
        console.error('❌ [user.controller] Error getting user:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error al obtener usuario'
        });
    }
};

/**
 * @desc    Update user
 * @route   PUT /api/users/:id
 * @access  Private
 */
const updateUser = async (req, res) => {
    console.log('🔍 [user.controller] updateUser - Request received');
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation Error',
                details: errors.array()
            });
        }

        const { id } = req.params;
        const { firstName, lastName, email, role } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Usuario no encontrado'
            });
        }

        // Verificar si el nuevo email ya existe (si cambió)
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ 
                where: { email: email } 
            });
            if (existingUser) {
                return res.status(409).json({
                    error: 'Conflict',
                    message: 'El email ya está registrado'
                });
            }
        }

        await user.update({
            firstName: firstName?.trim() || user.firstName,
            lastName: lastName?.trim() || user.lastName,
            email: email?.toLowerCase().trim() || user.email,
            role: role || user.role
        });

        console.log('✅ [user.controller] User updated:', user.id);

        const userResponse = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            updatedAt: user.updatedAt
        };

        res.json({
            message: 'Usuario actualizado exitosamente',
            user: userResponse
        });

    } catch (error) {
        console.error('❌ [user.controller] Error updating user:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error al actualizar usuario'
        });
    }
};

/**
 * @desc    Delete user (soft delete)
 * @route   DELETE /api/users/:id
 * @access  Private
 */
const deleteUser = async (req, res) => {
    console.log('🔍 [user.controller] deleteUser - Request received');
    
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Usuario no encontrado'
            });
        }

        // Check for active enrollments
        const { Enrollment } = require('../models');
        const activeEnrollments = await Enrollment.count({
            where: { 
                userId: id,
                status: 'active'
            }
        });

        if (activeEnrollments > 0) {
            return res.status(409).json({
                error: 'Conflict',
                message: 'No se puede eliminar usuario con inscripciones activas'
            });
        }

        await user.destroy();

        console.log('✅ [user.controller] User deleted:', user.id);

        res.json({
            message: 'Usuario eliminado exitosamente'
        });

    } catch (error) {
        console.error('❌ [user.controller] Error deleting user:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error al eliminar usuario'
        });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};