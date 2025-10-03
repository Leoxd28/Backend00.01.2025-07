const { Op } = require('sequelize');
const { Enrollment, User, Course, sequelize } = require('../models');

console.log('🎓 [enrollment.controller] Mini Learning Platform - Enrollment Controller loaded');

/**
 * Inscribir un usuario en un curso con transacciones
 * POST /courses/:courseId/enroll
 * Crea enrollment con status='pending' o 'active' si autoActivate=true
 * Usa transacciones para garantizar integridad de datos
 */
const enrollUserInCourse = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const courseId = parseInt(req.params.courseId);
        const { userId, autoActivate = false } = req.body;
        
        console.log('🎓 [enrollment] Enrolling user in course:', {
            userId,
            courseId,
            autoActivate
        });
        
        // Validaciones de entrada
        if (isNaN(courseId)) {
            await transaction.rollback();
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Invalid course ID format',
                code: 'INVALID_COURSE_ID'
            });
        }
        
        if (!userId || isNaN(parseInt(userId))) {
            await transaction.rollback();
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Valid userId is required',
                code: 'INVALID_USER_ID'
            });
        }
        
        // Verificar que el usuario existe y es estudiante
        const user = await User.findByPk(userId, {
            attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
            transaction
        });
        
        if (!user) {
            await transaction.rollback();
            return res.status(404).json({
                error: 'Not Found',
                message: 'User not found',
                code: 'USER_NOT_FOUND'
            });
        }
        
        // Solo estudiantes pueden inscribirse
        if (user.role !== 'student') {
            await transaction.rollback();
            return res.status(403).json({
                error: 'Forbidden',
                message: 'Only students can enroll in courses',
                code: 'INVALID_USER_ROLE',
                userRole: user.role
            });
        }
        
        // Verificar que el curso existe y está disponible
        const course = await Course.findByPk(courseId, {
            attributes: ['id', 'title', 'slug', 'published', 'ownerId'],
            include: [
                {
                    model: User,
                    as: 'owner',
                    attributes: ['id', 'firstName', 'lastName']
                }
            ],
            transaction
        });
        
        if (!course) {
            await transaction.rollback();
            return res.status(404).json({
                error: 'Not Found',
                message: 'Course not found',
                code: 'COURSE_NOT_FOUND'
            });
        }
        
        // Verificar que el curso esté publicado (opcional según reglas de negocio)
        if (!course.published) {
            await transaction.rollback();
            return res.status(403).json({
                error: 'Forbidden',
                message: 'Cannot enroll in unpublished course',
                code: 'COURSE_NOT_PUBLISHED'
            });
        }
        
        // Verificar que el usuario no sea el instructor del curso
        if (course.ownerId === userId) {
            await transaction.rollback();
            return res.status(403).json({
                error: 'Forbidden',
                message: 'Instructors cannot enroll in their own courses',
                code: 'INSTRUCTOR_SELF_ENROLLMENT'
            });
        }
        
        // Verificar que no esté ya inscrito
        const existingEnrollment = await Enrollment.findOne({
            where: { userId, courseId },
            attributes: ['id', 'status', 'createdAt'],
            transaction
        });
        
        if (existingEnrollment) {
            await transaction.rollback();
            return res.status(409).json({
                error: 'Conflict Error',
                message: 'User is already enrolled in this course',
                code: 'ALREADY_ENROLLED',
                existingEnrollment: {
                    id: existingEnrollment.id,
                    status: existingEnrollment.status,
                    enrolledAt: existingEnrollment.createdAt
                }
            });
        }
        
        // Crear inscripción inicial con status='pending'
        const enrollment = await Enrollment.create({
            userId,
            courseId,
            status: 'pending',
            score: null
        }, { transaction });
        
        console.log('✅ [enrollment] Initial enrollment created:', enrollment.id);
        
        let finalStatus = 'pending';
        let updatedCourse = course;
        
        // Si autoActivate es true, activar inmediatamente con transacción
        if (autoActivate) {
            console.log('⚡ [enrollment] Auto-activating enrollment...');
            
            // Actualizar status a 'active'
            await enrollment.update({ status: 'active' }, { transaction });
            
            // Incrementar contador de estudiantes en el curso
            await Course.increment('studentsCount', {
                by: 1,
                where: { id: courseId },
                transaction
            });
            
            // Obtener curso actualizado para respuesta
            updatedCourse = await Course.findByPk(courseId, {
                attributes: ['id', 'title', 'slug', 'studentsCount'],
                transaction
            });
            
            finalStatus = 'active';
            console.log('✅ [enrollment] Enrollment activated and course stats updated');
        }
        
        // Confirmar transacción
        await transaction.commit();
        
        console.log('🎉 [enrollment] User enrolled successfully:', {
            enrollmentId: enrollment.id,
            userId,
            courseId,
            finalStatus,
            courseStudentsCount: updatedCourse.studentsCount || 'N/A'
        });
        
        // Respuesta exitosa con detalles completos
        res.status(201).json({
            success: true,
            message: `User enrolled successfully with status: ${finalStatus}`,
            enrollment: {
                id: enrollment.id,
                userId,
                courseId,
                status: finalStatus,
                score: enrollment.score,
                enrolledAt: enrollment.createdAt,
                updatedAt: enrollment.updatedAt
            },
            student: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            course: {
                id: course.id,
                title: course.title,
                slug: course.slug,
                studentsCount: updatedCourse.studentsCount || 0,
                instructor: course.owner
            },
            autoActivated: autoActivate
        });
        
    } catch (error) {
        // Rollback en caso de error
        await transaction.rollback();
        
        console.error('❌ [enrollment] Error enrolling user:', {
            error: error.message,
            userId: req.body.userId,
            courseId: req.params.courseId,
            stack: error.stack
        });
        
        // Manejo específico de errores de Sequelize
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Enrollment validation failed',
                code: 'VALIDATION_ERROR',
                details: error.errors.map(e => ({
                    field: e.path,
                    message: e.message,
                    value: e.value
                }))
            });
        }
        
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({
                error: 'Foreign Key Error',
                message: 'Invalid user or course reference',
                code: 'FOREIGN_KEY_ERROR',
                table: error.table,
                fields: error.fields
            });
        }
        
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                error: 'Conflict Error',
                message: 'User is already enrolled in this course',
                code: 'UNIQUE_CONSTRAINT_ERROR'
            });
        }
        
        // Error genérico del servidor
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to enroll user in course',
            code: 'ENROLLMENT_FAILED'
        });
    }
};

/**
 * Actualizar estado de inscripción con transacciones
 * PATCH /enrollments/:id/status
 * Cambia status entre 'pending' y 'active', opcionalmente asigna score
 * Actualiza contadores del curso usando transacciones
 */
const updateEnrollmentStatus = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const enrollmentId = parseInt(req.params.id);
        const { status, score } = req.body;
        
        console.log('📝 [enrollment] Updating enrollment status:', {
            enrollmentId,
            newStatus: status,
            score
        });
        
        // Validaciones de entrada
        if (isNaN(enrollmentId)) {
            await transaction.rollback();
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Invalid enrollment ID format',
                code: 'INVALID_ENROLLMENT_ID'
            });
        }
        
        if (!status || !['active', 'pending'].includes(status)) {
            await transaction.rollback();
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Valid status (active or pending) is required',
                code: 'INVALID_STATUS',
                validStatuses: ['active', 'pending']
            });
        }
        
        // Validar score si se proporciona
        if (score !== undefined && score !== null) {
            const scoreNum = parseFloat(score);
            if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
                await transaction.rollback();
                return res.status(400).json({
                    error: 'Validation Error',
                    message: 'Score must be a number between 0 and 100',
                    code: 'INVALID_SCORE',
                    providedScore: score
                });
            }
        }
        
        // Buscar inscripción con información relacionada
        const enrollment = await Enrollment.findByPk(enrollmentId, {
            include: [
                {
                    model: User,
                    as: 'student',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'title', 'slug', 'studentsCount']
                }
            ],
            transaction
        });
        
        if (!enrollment) {
            await transaction.rollback();
            return res.status(404).json({
                error: 'Not Found',
                message: 'Enrollment not found',
                code: 'ENROLLMENT_NOT_FOUND'
            });
        }
        
        const oldStatus = enrollment.status;
        const courseId = enrollment.courseId;
        
        console.log('📊 [enrollment] Current enrollment state:', {
            id: enrollmentId,
            oldStatus,
            newStatus: status,
            courseId,
            currentStudentsCount: enrollment.course.studentsCount
        });
        
        // Preparar datos de actualización
        const updateData = { status };
        if (score !== undefined) {
            updateData.score = score;
        }
        
        // Actualizar inscripción
        await enrollment.update(updateData, { transaction });
        
        // Gestionar contadores del curso según cambio de estado
        let courseStatsUpdated = false;
        let studentsCountChange = 0;
        
        if (oldStatus !== status) {
            // Cambio de pending a active: incrementar contador
            if (oldStatus === 'pending' && status === 'active') {
                await Course.increment('studentsCount', {
                    by: 1,
                    where: { id: courseId },
                    transaction
                });
                studentsCountChange = +1;
                courseStatsUpdated = true;
                console.log('📈 [enrollment] Incremented course students count');
            }
            
            // Cambio de active a pending: decrementar contador
            if (oldStatus === 'active' && status === 'pending') {
                await Course.decrement('studentsCount', {
                    by: 1,
                    where: { id: courseId },
                    transaction
                });
                studentsCountChange = -1;
                courseStatsUpdated = true;
                console.log('📉 [enrollment] Decremented course students count');
            }
        }
        
        // Obtener curso actualizado si hubo cambios en stats
        let updatedCourse = enrollment.course;
        if (courseStatsUpdated) {
            updatedCourse = await Course.findByPk(courseId, {
                attributes: ['id', 'title', 'slug', 'studentsCount'],
                transaction
            });
        }
        
        // Confirmar transacción
        await transaction.commit();
        
        console.log('✅ [enrollment] Enrollment status updated successfully:', {
            enrollmentId,
            oldStatus,
            newStatus: status,
            scoreUpdated: score !== undefined,
            courseStatsUpdated,
            studentsCountChange,
            newStudentsCount: updatedCourse.studentsCount
        });
        
        // Respuesta exitosa con detalles completos
        res.json({
            success: true,
            message: `Enrollment status updated from ${oldStatus} to ${status}`,
            enrollment: {
                id: enrollment.id,
                userId: enrollment.userId,
                courseId: enrollment.courseId,
                status,
                score: updateData.score !== undefined ? updateData.score : enrollment.score,
                updatedAt: new Date().toISOString()
            },
            changes: {
                statusChanged: oldStatus !== status,
                oldStatus,
                newStatus: status,
                scoreUpdated: score !== undefined,
                courseStatsUpdated,
                studentsCountChange
            },
            student: enrollment.student,
            course: {
                id: updatedCourse.id,
                title: updatedCourse.title,
                slug: updatedCourse.slug,
                studentsCount: updatedCourse.studentsCount
            }
        });
        
    } catch (error) {
        // Rollback en caso de error
        await transaction.rollback();
        
        console.error('❌ [enrollment] Error updating enrollment status:', {
            error: error.message,
            enrollmentId: req.params.id,
            requestedStatus: req.body.status,
            stack: error.stack
        });
        
        // Manejo específico de errores
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Enrollment update validation failed',
                code: 'VALIDATION_ERROR',
                details: error.errors.map(e => ({
                    field: e.path,
                    message: e.message,
                    value: e.value
                }))
            });
        }
        
        // Error genérico del servidor
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to update enrollment status',
            code: 'UPDATE_STATUS_FAILED'
        });
    }
};

/**
 * Obtener inscripciones de un curso con filtros y eager loading
 * GET /courses/:courseId/enrollments
 * Lista inscripciones con información de estudiantes, soporta filtros por status
 * Optimizado para evitar N+1 queries
 */
const getCourseEnrollments = async (req, res) => {
    try {
        const courseId = parseInt(req.params.courseId);
        const status = req.query.status;
        const page = parseInt(req.query.page || '1');
        const pageSize = parseInt(req.query.pageSize || '10');
        
        console.log('🔍 [enrollment] Fetching enrollments for course:', {
            courseId,
            status,
            page,
            pageSize
        });
        
        // Validaciones de entrada
        if (isNaN(courseId)) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Invalid course ID format',
                code: 'INVALID_COURSE_ID'
            });
        }
        
        if (page < 1 || pageSize < 1 || pageSize > 100) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Invalid pagination parameters (page >= 1, 1 <= pageSize <= 100)',
                code: 'INVALID_PAGINATION'
            });
        }
        
        // Verificar que el curso existe
        const course = await Course.findByPk(courseId, {
            attributes: ['id', 'title', 'slug', 'published', 'studentsCount'],
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
        
        // Construir filtros para inscripciones
        let where = { courseId };
        
        if (status && ['active', 'pending'].includes(status)) {
            where.status = status;
        } else if (status) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Invalid status filter',
                code: 'INVALID_STATUS_FILTER',
                validStatuses: ['active', 'pending']
            });
        }
        
        // Obtener inscripciones con paginación y eager loading optimizado
        const { rows: enrollments, count: totalEnrollments } = await Enrollment.findAndCountAll({
            where,
            include: [
                {
                    model: User,
                    as: 'student',
                    attributes: ['id', 'firstName', 'lastName', 'email', 'role']
                },
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'title', 'slug']
                }
            ],
            order: [['createdAt', 'DESC']],
            limit: pageSize,
            offset: (page - 1) * pageSize,
            distinct: true // Evitar problemas de conteo con joins
        });
        
        // Estadísticas adicionales del curso
        const enrollmentStats = await Enrollment.findAll({
            where: { courseId },
            attributes: [
                'status',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
                [sequelize.fn('AVG', sequelize.col('score')), 'avgScore']
            ],
            group: ['status'],
            raw: true
        });
        
        const stats = {
            total: totalEnrollments,
            active: 0,
            pending: 0,
            averageScore: null
        };
        
        enrollmentStats.forEach(stat => {
            stats[stat.status] = parseInt(stat.count);
            if (stat.status === 'active' && stat.avgScore) {
                stats.averageScore = parseFloat(stat.avgScore).toFixed(2);
            }
        });
        
        console.log(`✅ [enrollment] Found ${totalEnrollments} enrollments for course ${courseId}, returning page ${page}`);
        
        // Respuesta optimizada con paginación y estadísticas
        res.json({
            success: true,
            course: {
                id: course.id,
                title: course.title,
                slug: course.slug,
                published: course.published,
                studentsCount: course.studentsCount,
                instructor: course.owner
            },
            enrollments: {
                total: totalEnrollments,
                page,
                pageSize,
                totalPages: Math.ceil(totalEnrollments / pageSize),
                data: enrollments.map(enrollment => ({
                    id: enrollment.id,
                    status: enrollment.status,
                    score: enrollment.score,
                    enrolledAt: enrollment.createdAt,
                    updatedAt: enrollment.updatedAt,
                    student: enrollment.student
                }))
            },
            statistics: stats,
            filters: {
                status: status || 'all',
                appliedFilters: Object.keys(where).length - 1 // -1 para excluir courseId
            }
        });
        
    } catch (error) {
        console.error('❌ [enrollment] Error fetching course enrollments:', {
            error: error.message,
            courseId: req.params.courseId,
            stack: error.stack
        });
        
        // Error genérico del servidor
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to fetch course enrollments',
            code: 'FETCH_ENROLLMENTS_FAILED'
        });
    }
};

/**
 * Obtener inscripciones de un estudiante
 * GET /users/:userId/enrollments
 * Lista todas las inscripciones de un estudiante específico
 */
const getUserEnrollments = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const status = req.query.status;
        
        console.log('🔍 [enrollment] Fetching enrollments for user:', { userId, status });
        
        if (isNaN(userId)) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Invalid user ID format',
                code: 'INVALID_USER_ID'
            });
        }
        
        // Verificar que el usuario existe
        const user = await User.findByPk(userId, {
            attributes: ['id', 'firstName', 'lastName', 'email', 'role']
        });
        
        if (!user) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'User not found',
                code: 'USER_NOT_FOUND'
            });
        }
        
        // Construir filtros
        let where = { userId };
        if (status && ['active', 'pending'].includes(status)) {
            where.status = status;
        }
        
        // Obtener inscripciones del usuario
        const enrollments = await Enrollment.findAll({
            where,
            include: [
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'title', 'slug', 'description', 'published'],
                    include: [
                        {
                            model: User,
                            as: 'owner',
                            attributes: ['id', 'firstName', 'lastName']
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        
        console.log(`✅ [enrollment] Found ${enrollments.length} enrollments for user ${userId}`);
        
        res.json({
            success: true,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            enrollments: {
                total: enrollments.length,
                data: enrollments
            }
        });
        
    } catch (error) {
        console.error('❌ [enrollment] Error fetching user enrollments:', {
            error: error.message,
            userId: req.params.userId
        });
        
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to fetch user enrollments',
            code: 'FETCH_USER_ENROLLMENTS_FAILED'
        });
    }
};

// Exportar funciones del controlador
module.exports = {
    enrollUserInCourse,
    updateEnrollmentStatus,
    getCourseEnrollments,
    getUserEnrollments
};

console.log('✅ [enrollment.controller] All enrollment controller functions exported successfully');