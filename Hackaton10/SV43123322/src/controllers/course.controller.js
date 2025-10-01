const { Op } = require('sequelize');
const { Course, User, Lesson, Enrollment, Comment, sequelize } = require('../models');

console.log('📚 [course.controller] Mini Learning Platform - Course Controller loaded');

/**
 * Crear nuevo curso - Solo instructores y admins
 * POST /courses
 * Auto-genera slug desde title, published=false por defecto
 */
const createCourse = async (req, res) => {
    try {
        const { title, description, ownerId, published = false } = req.body;

        console.log('📝 [course] Creating new course:', { title, ownerId, published });

        // Validaciones de entrada
        if (!title || title.trim().length < 5) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Title is required and must be at least 5 characters',
                code: 'INVALID_TITLE'
            });
        }

        if (!ownerId || isNaN(parseInt(ownerId))) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Valid owner ID is required',
                code: 'INVALID_OWNER_ID'
            });
        }

        // Verificar que el owner existe y es instructor o admin
        const owner = await User.findByPk(ownerId, {
            attributes: ['id', 'firstName', 'lastName', 'email', 'role']
        });

        if (!owner) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Owner user not found',
                code: 'OWNER_NOT_FOUND'
            });
        }

        if (!['instructor', 'admin'].includes(owner.role)) {
            return res.status(403).json({
                error: 'Forbidden',
                message: 'Only instructors and admins can create courses',
                code: 'INVALID_OWNER_ROLE',
                ownerRole: owner.role
            });
        }

        // Crear curso (slug se genera automáticamente por hook)
        const course = await Course.create({
            title: title.trim(),
            description: description?.trim() || null, // CORRECCIÓN: description opcional
            ownerId,
            published: Boolean(published),
            studentsCount: 0 // CORRECCIÓN: inicializar studentsCount
        });

        console.log('✅ [course] Course created successfully:', {
            id: course.id,
            title: course.title,
            slug: course.slug,
            ownerId: course.ownerId
        });

        // Respuesta con datos del owner incluidos
        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            course: {
                id: course.id,
                title: course.title,
                slug: course.slug,
                description: course.description,
                published: course.published,
                studentsCount: course.studentsCount, // CORRECCIÓN: incluir studentsCount
                createdAt: course.createdAt,
                owner: {
                    id: owner.id,
                    firstName: owner.firstName,
                    lastName: owner.lastName,
                    email: owner.email,
                    role: owner.role
                }
            }
        });

    } catch (error) {
        console.error('❌ [course] Error creating course:', {
            error: error.message,
            title: req.body.title,
            ownerId: req.body.ownerId
        });

        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0]?.path || 'unknown';
            return res.status(409).json({
                error: 'Conflict Error',
                message: `Course ${field} already exists`,
                code: 'DUPLICATE_COURSE',
                field,
                value: error.errors[0]?.value
            });
        }

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Course validation failed',
                code: 'VALIDATION_ERROR',
                details: error.errors.map(e => ({
                    field: e.path,
                    message: e.message,
                    value: e.value
                }))
            });
        }

        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to create course',
            code: 'CREATE_COURSE_FAILED'
        });
    }
};

/**
 * Listar cursos con filtros avanzados y paginación optimizada
 * GET /courses?published=true&q=search&order=createdAt:DESC&page=1&pageSize=10
 */
const getCourses = async (req, res) => {
    try {
        const {
            published,
            q = '',
            order = 'createdAt:DESC',
            page = 1,
            pageSize = 10
        } = req.query;

        console.log('🔍 [course] Fetching courses with filters:', {
            published, q, order, page, pageSize
        });

        // Validar parámetros de paginación
        const pageNum = parseInt(page);
        const pageSizeNum = parseInt(pageSize);

        if (pageNum < 1 || pageSizeNum < 1 || pageSizeNum > 100) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Invalid pagination parameters (page >= 1, 1 <= pageSize <= 100)',
                code: 'INVALID_PAGINATION'
            });
        }

        // Construir filtros
        let where = {};
        
        // Filtro por publicación
        if (published !== undefined) {
            const isPublished = published === 'true';
            where.published = isPublished;
        }

        // Filtro de búsqueda
        const searchQuery = q.trim();
        if (searchQuery) {
            where[Op.or] = [
                { title: { [Op.like]: `%${searchQuery}%` } },
                { description: { [Op.like]: `%${searchQuery}%` } }
            ];
        }

        // Configurar ordenamiento
        let orderBy = [['createdAt', 'DESC']];
        if (order) {
            const [field, direction] = order.split(':');
            const validFields = ['createdAt', 'updatedAt', 'title', 'studentsCount'];
            const validDirections = ['ASC', 'DESC'];
            
            if (validFields.includes(field) && validDirections.includes(direction?.toUpperCase())) {
                orderBy = [[field, direction.toUpperCase()]];
            }
        }

        // CORRECCIÓN: Consulta optimizada con subqueries para evitar N+1
        const { rows: courses, count: totalCourses } = await Course.findAndCountAll({
            where,
            include: [
                {
                    model: User,
                    as: 'owner',
                    attributes: ['id', 'firstName', 'lastName', 'email', 'role']
                }
            ],
            order: orderBy,
            limit: pageSizeNum,
            offset: (pageNum - 1) * pageSizeNum,
            distinct: true,
            // CORRECCIÓN: Agregar subqueries para estadísticas optimizadas
            attributes: {
                include: [
                    [
                        sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM lessons
                            WHERE lessons.courseId = Course.id
                            AND lessons.deletedAt IS NULL
                        )`),
                        'lessonsCount'
                    ],
                    [
                        sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM enrollments
                            WHERE enrollments.courseId = Course.id
                            AND enrollments.status = 'active'
                        )`),
                        'activeEnrollmentsCount'
                    ]
                ]
            }
        });

        console.log(`✅ [course] Found ${totalCourses} courses, returning page ${pageNum}`);

        // CORRECCIÓN: Transformar datos sin consultas adicionales
        const transformedCourses = courses.map(course => {
            const courseData = course.toJSON();
            return {
                ...courseData,
                stats: {
                    lessonsCount: parseInt(courseData.lessonsCount) || 0,
                    activeEnrollments: parseInt(courseData.activeEnrollmentsCount) || 0
                },
                lessonsCount: undefined, // Remover campos calculados del nivel raíz
                activeEnrollmentsCount: undefined
            };
        });

        res.json({
            success: true,
            courses: {
                total: totalCourses,
                page: pageNum,
                pageSize: pageSizeNum,
                totalPages: Math.ceil(totalCourses / pageSizeNum),
                data: transformedCourses
            },
            filters: {
                published: published !== undefined ? (published === 'true') : null,
                search: searchQuery || null,
                order: order || 'createdAt:DESC'
            }
        });

    } catch (error) {
        console.error('❌ [course] Error fetching courses:', {
            error: error.message,
            filters: req.query
        });

        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to fetch courses',
            code: 'FETCH_COURSES_FAILED'
        });
    }
};

/**
 * Obtener curso por slug con detalles completos y estadísticas
 * GET /courses/slug/:slug
 * Include: owner, lessons ordenadas, enrollments count, comments count
 */
const getCourseBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        console.log('🔍 [course] Fetching course by slug:', slug);

        if (!slug || slug.trim().length === 0) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Course slug is required',
                code: 'MISSING_SLUG'
            });
        }

        // CORRECCIÓN: Buscar curso con eager loading mejorado
        const course = await Course.findOne({
            where: { slug: slug.trim() },
            include: [
                {
                    model: User,
                    as: 'owner',
                    attributes: ['id', 'firstName', 'lastName', 'email', 'role']
                },
                {
                    model: Lesson,
                    as: 'lessons',
                    attributes: ['id', 'title', 'slug', 'order', 'createdAt'],
                    separate: true, // CORRECCIÓN: Para que funcione el ordenamiento
                    order: [['order', 'ASC']]
                }
            ]
        });

        if (!course) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Course not found',
                code: 'COURSE_NOT_FOUND',
                slug
            });
        }

        // CORRECCIÓN: Obtener estadísticas optimizadas con Promise.all
        const [
            activeEnrollmentsCount,
            pendingEnrollmentsCount,
            averageScore,
            totalComments
        ] = await Promise.all([
            Enrollment.count({ where: { courseId: course.id, status: 'active' } }),
            Enrollment.count({ where: { courseId: course.id, status: 'pending' } }),
            Enrollment.findOne({
                where: { courseId: course.id, status: 'active', score: { [Op.ne]: null } },
                attributes: [[sequelize.fn('AVG', sequelize.col('score')), 'avgScore']],
                raw: true
            }),
            // CORRECCIÓN: Contar comentarios de todas las lecciones del curso
            sequelize.query(`
                SELECT COUNT(*) as total FROM comments c
                INNER JOIN lessons l ON c.lessonId = l.id
                WHERE l.courseId = ?
            `, {
                replacements: [course.id],
                type: sequelize.QueryTypes.SELECT
            })
        ]);

        console.log('✅ [course] Course found with full details:', {
            id: course.id,
            slug: course.slug,
            lessonsCount: course.lessons.length,
            activeEnrollments: activeEnrollmentsCount
        });

        // CORRECCIÓN: Respuesta con datos completos y estructurados
        res.json({
            success: true,
            course: {
                id: course.id,
                title: course.title,
                slug: course.slug,
                description: course.description,
                published: course.published,
                studentsCount: course.studentsCount, // CORRECCIÓN: incluir studentsCount
                createdAt: course.createdAt,
                updatedAt: course.updatedAt,
                deletedAt: course.deletedAt,
                owner: course.owner,
                lessons: course.lessons,
                stats: {
                    lessonsCount: course.lessons.length,
                    activeEnrollments: activeEnrollmentsCount,
                    pendingEnrollments: pendingEnrollmentsCount,
                    totalEnrollments: activeEnrollmentsCount + pendingEnrollmentsCount,
                    averageScore: averageScore?.avgScore ? parseFloat(averageScore.avgScore).toFixed(2) : null,
                    totalComments: totalComments[0]?.total || 0
                }
            }
        });

    } catch (error) {
        console.error('❌ [course] Error fetching course by slug:', {
            error: error.message,
            slug: req.params.slug
        });

        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to fetch course details',
            code: 'FETCH_COURSE_FAILED'
        });
    }
};

/**
 * Actualizar curso existente
 * PUT /courses/:id
 */
const updateCourse = async (req, res) => {
    try {
        const courseId = parseInt(req.params.id);
        const { title, description, published, ownerId } = req.body;

        console.log('📝 [course] Updating course:', { courseId, updates: req.body });

        if (isNaN(courseId)) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Invalid course ID format',
                code: 'INVALID_COURSE_ID'
            });
        }

        // Buscar curso existente
        const course = await Course.findByPk(courseId, {
            include: [
                {
                    model: User,
                    as: 'owner',
                    attributes: ['id', 'firstName', 'lastName', 'role']
                }
            ]
        });

        if (!course) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Course not found',
                code: 'COURSE_NOT_FOUND'
            });
        }

        // Construir objeto de actualización
        const updateData = {};

        if (title !== undefined) {
            if (!title || title.trim().length < 5) {
                return res.status(400).json({
                    error: 'Validation Error',
                    message: 'Title must be at least 5 characters',
                    code: 'INVALID_TITLE'
                });
            }
            updateData.title = title.trim();
            // El slug se regenerará automáticamente por el hook
        }

        if (description !== undefined) {
            updateData.description = description?.trim() || null; // CORRECCIÓN: description opcional
        }

        if (published !== undefined) {
            updateData.published = Boolean(published);
        }

        // CORRECCIÓN: Validar cambio de propietario si se proporciona
        if (ownerId !== undefined && ownerId !== course.ownerId) {
            const newOwner = await User.findByPk(ownerId, {
                attributes: ['id', 'firstName', 'lastName', 'role']
            });

            if (!newOwner) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'New owner not found',
                    code: 'NEW_OWNER_NOT_FOUND'
                });
            }

            if (!['instructor', 'admin'].includes(newOwner.role)) {
                return res.status(403).json({
                    error: 'Forbidden',
                    message: 'New owner must be instructor or admin',
                    code: 'INVALID_NEW_OWNER_ROLE'
                });
            }

            updateData.ownerId = ownerId;
        }

        // Actualizar curso
        await course.update(updateData);

        // Recargar con datos actualizados
        await course.reload({
            include: [
                {
                    model: User,
                    as: 'owner',
                    attributes: ['id', 'firstName', 'lastName', 'email', 'role']
                }
            ]
        });

        console.log('✅ [course] Course updated successfully:', {
            id: course.id,
            title: course.title,
            slug: course.slug
        });

        res.json({
            success: true,
            message: 'Course updated successfully',
            course: {
                id: course.id,
                title: course.title,
                slug: course.slug,
                description: course.description,
                published: course.published,
                studentsCount: course.studentsCount, // CORRECCIÓN: incluir studentsCount
                updatedAt: course.updatedAt,
                owner: course.owner
            },
            changes: Object.keys(updateData)
        });

    } catch (error) {
        console.error('❌ [course] Error updating course:', {
            error: error.message,
            courseId: req.params.id,
            updates: req.body
        });

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                error: 'Conflict Error',
                message: 'Course title or slug already exists',
                code: 'DUPLICATE_COURSE'
            });
        }

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Course validation failed',
                code: 'VALIDATION_ERROR',
                details: error.errors.map(e => ({
                    field: e.path,
                    message: e.message
                }))
            });
        }

        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to update course',
            code: 'UPDATE_COURSE_FAILED'
        });
    }
};

/**
 * Soft delete de curso con validaciones
 * DELETE /courses/:id
 */
const deleteCourse = async (req, res) => {
    try {
        const courseId = parseInt(req.params.id);

        console.log('🗑️ [course] Soft deleting course:', courseId);

        if (isNaN(courseId)) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Invalid course ID format',
                code: 'INVALID_COURSE_ID'
            });
        }

        const course = await Course.findByPk(courseId, {
            include: [
                {
                    model: User,
                    as: 'owner',
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        });

        if (!course) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Course not found',
                code: 'COURSE_NOT_FOUND'
            });
        }

        // CORRECCIÓN: Verificar si hay inscripciones activas antes de eliminar
        const activeEnrollments = await Enrollment.count({
            where: { courseId, status: 'active' }
        });

        if (activeEnrollments > 0) {
            return res.status(409).json({
                error: 'Conflict Error',
                message: 'Cannot delete course with active enrollments',
                code: 'COURSE_HAS_ACTIVE_ENROLLMENTS',
                activeEnrollments
            });
        }

        // Soft delete (paranoid: true)
        await course.destroy();

        console.log('✅ [course] Course soft deleted:', {
            id: courseId,
            title: course.title,
            slug: course.slug
        });

        res.json({
            success: true,
            message: 'Course deleted successfully',
            deletedCourse: {
                id: course.id,
                title: course.title,
                slug: course.slug,
                owner: course.owner,
                deletedAt: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('❌ [course] Error deleting course:', {
            error: error.message,
            courseId: req.params.id
        });

        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to delete course',
            code: 'DELETE_COURSE_FAILED'
        });
    }
};

module.exports = {
    createCourse,
    getCourses,
    getCourseBySlug,
    updateCourse,
    deleteCourse
};

console.log('✅ [course.controller] All course controller functions exported successfully');