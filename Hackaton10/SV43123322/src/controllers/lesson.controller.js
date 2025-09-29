const { Lesson, Course, Comment, User, sequelize } = require('../models');

// Crear lección
const createLesson = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const courseId = parseInt(req.params.courseId);
        console.log('📖 [lesson.controller] Creating new lesson for course:', courseId);
        
        if (isNaN(courseId) || courseId <= 0) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: 'Invalid course ID',
                code: 'INVALID_COURSE_ID'
            });
        }
        
        // Verificar que el curso existe y está activo
        const course = await Course.findByPk(courseId, { transaction });
        if (!course) {
            await transaction.rollback();
            return res.status(404).json({
                success: false,
                error: 'Not Found',
                message: 'Course not found',
                code: 'COURSE_NOT_FOUND'
            });
        }
        
        const { title, body, order } = req.body;
        
        // Validaciones básicas
        if (!title || !body) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: 'title and body are required',
                details: {
                    title: !title ? 'Title is required' : null,
                    body: !body ? 'Body is required' : null
                }
            });
        }
        
        // Obtener siguiente orden si no se proporciona
        let lessonOrder = order;
        if (!lessonOrder || lessonOrder <= 0) {
            const maxOrder = await Lesson.max('order', {
                where: { courseId },
                transaction
            });
            lessonOrder = (maxOrder || 0) + 1;
        }
        
        // Verificar si el orden ya existe en el curso
        if (order && order > 0) {
            const existingLesson = await Lesson.findOne({
                where: { 
                    courseId, 
                    order: lessonOrder 
                },
                transaction
            });
            
            if (existingLesson) {
                // Reordenar lecciones existentes
                await Lesson.increment('order', {
                    by: 1,
                    where: {
                        courseId,
                        order: { [sequelize.Op.gte]: lessonOrder }
                    },
                    transaction
                });
            }
        }
        
        // Crear lección
        const lesson = await Lesson.create({
            title: title.trim(),
            body: body.trim(),
            order: lessonOrder,
            courseId
        }, { transaction });
        
        // Obtener lección completa con relaciones
        const fullLesson = await Lesson.findByPk(lesson.id, {
            include: [
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'title', 'slug'],
                    include: [
                        {
                            model: User,
                            as: 'owner',
                            attributes: ['id', 'firstName', 'lastName']
                        }
                    ]
                }
            ],
            transaction
        });
        
        await transaction.commit();
        
        console.log('✅ [lesson.controller] Lesson created successfully:', lesson.id);
        
        res.status(201).json({
            success: true,
            message: 'Lesson created successfully',
            lesson: fullLesson.toJSON(),
            meta: {
                createdAt: new Date().toISOString(),
                autoSlug: lesson.slug,
                assignedOrder: lessonOrder,
                autoOrderAssigned: !order || order <= 0
            }
        });
        
    } catch (error) {
        await transaction.rollback();
        console.error('❌ [lesson.controller] Error creating lesson:', error.message);
        
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: 'Lesson validation failed',
                details: error.errors.map(e => ({
                    field: e.path,
                    message: e.message,
                    value: e.value,
                    validatorKey: e.validatorKey
                }))
            });
        }
        
        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0]?.path;
            return res.status(409).json({
                success: false,
                error: 'Conflict Error',
                message: `Lesson with this ${field} already exists in this course`,
                field,
                code: 'DUPLICATE_LESSON'
            });
        }
        
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: 'Failed to create lesson',
            code: 'LESSON_CREATION_FAILED'
        });
    }
};

// Obtener lecciones de un curso
const getLessonsByCourse = async (req, res) => {
    try {
        const courseId = parseInt(req.params.courseId);
        const orderDirection = req.query.order || 'ASC';
        const includeComments = req.query.includeComments === 'true';
        console.log('🔍 [lesson.controller] Fetching lessons for course:', courseId);
        
        if (isNaN(courseId) || courseId <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: 'Invalid course ID',
                code: 'INVALID_COURSE_ID'
            });
        }
        
        // Verificar que el curso existe
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                error: 'Not Found',
                message: 'Course not found',
                code: 'COURSE_NOT_FOUND'
            });
        }
        
        // Validar dirección de ordenamiento
        const validOrderDirections = ['ASC', 'DESC'];
        const finalOrderDirection = validOrderDirections.includes(orderDirection.toUpperCase()) 
            ? orderDirection.toUpperCase() 
            : 'ASC';
        
        // Configurar includes básicos
        const include = [
            {
                model: Course,
                as: 'course',
                attributes: ['id', 'title', 'slug', 'published']
            }
        ];
        
        // Agregar comentarios si se solicitan
        if (includeComments) {
            include.push({
                model: Comment,
                as: 'comments',
                attributes: ['id', 'body', 'createdAt'],
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: ['id', 'firstName', 'lastName']
                    }
                ],
                limit: 5, // Solo los últimos 5 comentarios por lección
                order: [['createdAt', 'DESC']],
                separate: true
            });
        }
        
        // Obtener lecciones ordenadas
        const lessons = await Lesson.findAll({
            where: { courseId },
            include,
            order: [['order', finalOrderDirection]],
            attributes: { exclude: ['deletedAt'] }
        });
        
        // Agregar estadísticas si incluye comentarios
        let lessonsWithStats = lessons;
        if (includeComments) {
            lessonsWithStats = await Promise.all(lessons.map(async (lesson) => {
                const lessonData = lesson.toJSON();
                
                const commentsCount = await Comment.count({
                    where: { lessonId: lesson.id }
                });
                
                lessonData.stats = {
                    commentsCount,
                    hasComments: commentsCount > 0
                };
                
                return lessonData;
            }));
        }
        
        console.log(`✅ [lesson.controller] Found ${lessons.length} lessons for course ${courseId}`);
        
        res.json({
            success: true,
            courseId,
            total: lessons.length,
            data: lessonsWithStats,
            meta: {
                courseTitle: course.title,
                orderBy: `order:${finalOrderDirection}`,
                includeComments,
                fetchedAt: new Date().toISOString()
            }
        });
        
    } catch (error) {
        console.error('❌ [lesson.controller] Error fetching lessons:', error.message);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: 'Failed to fetch lessons',
            code: 'LESSONS_FETCH_FAILED'
        });
    }
};

// Obtener lección por ID
const getLessonById = async (req, res) => {
    try {
        const lessonId = parseInt(req.params.id);
        console.log('🔍 [lesson.controller] Fetching lesson by ID:', lessonId);
        
        if (isNaN(lessonId) || lessonId <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: 'Invalid lesson ID',
                code: 'INVALID_LESSON_ID'
            });
        }
        
        const lesson = await Lesson.findByPk(lessonId, {
            include: [
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'title', 'slug', 'published'],
                    include: [
                        {
                            model: User,
                            as: 'owner',
                            attributes: ['id', 'firstName', 'lastName']
                        }
                    ]
                }
            ]
        });
        
        if (!lesson) {
            return res.status(404).json({
                success: false,
                error: 'Not Found',
                message: 'Lesson not found',
                code: 'LESSON_NOT_FOUND'
            });
        }
        
        // Obtener estadísticas de comentarios
        const commentsCount = await Comment.count({
            where: { lessonId: lesson.id }
        });
        
        const lessonData = lesson.toJSON();
        lessonData.stats = {
            commentsCount,
            hasComments: commentsCount > 0
        };
        
        console.log(`✅ [lesson.controller] Lesson found: ${lesson.id}`);
        
        res.json({
            success: true,
            lesson: lessonData,
            meta: {
                accessedAt: new Date().toISOString()
            }
        });
        
    } catch (error) {
        console.error('❌ [lesson.controller] Error fetching lesson:', error.message);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: 'Failed to fetch lesson',
            code: 'LESSON_FETCH_FAILED'
        });
    }
};

// Actualizar lección
const updateLesson = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const lessonId = parseInt(req.params.id);
        console.log('📝 [lesson.controller] Updating lesson:', lessonId);
        
        if (isNaN(lessonId) || lessonId <= 0) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: 'Invalid lesson ID',
                code: 'INVALID_LESSON_ID'
            });
        }
        
        const lesson = await Lesson.findByPk(lessonId, { transaction });
        if (!lesson) {
            await transaction.rollback();
            return res.status(404).json({
                success: false,
                error: 'Not Found',
                message: 'Lesson not found',
                code: 'LESSON_NOT_FOUND'
            });
        }
        
        const { title, body, order } = req.body;
        
        // Construir datos de actualización
        const updateData = {};
        if (title !== undefined) {
            updateData.title = title.trim();
        }
        if (body !== undefined) {
            updateData.body = body.trim();
        }
        if (order !== undefined && order > 0) {
            updateData.order = parseInt(order);
        }
        
        // Validar que hay algo que actualizar
        if (Object.keys(updateData).length === 0) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: 'No valid fields provided for update',
                code: 'NO_UPDATE_DATA'
            });
        }
        
        // Manejar cambio de orden si es necesario
        if (updateData.order && updateData.order !== lesson.order) {
            const oldOrder = lesson.order;
            const newOrder = updateData.order;
            
            if (newOrder > oldOrder) {
                // Mover hacia abajo: decrementar orden de lecciones intermedias
                await Lesson.decrement('order', {
                    by: 1,
                    where: {
                        courseId: lesson.courseId,
                        order: {
                            [sequelize.Op.gt]: oldOrder,
                            [sequelize.Op.lte]: newOrder
                        },
                        id: { [sequelize.Op.ne]: lessonId }
                    },
                    transaction
                });
            } else {
                // Mover hacia arriba: incrementar orden de lecciones intermedias
                await Lesson.increment('order', {
                    by: 1,
                    where: {
                        courseId: lesson.courseId,
                        order: {
                            [sequelize.Op.gte]: newOrder,
                            [sequelize.Op.lt]: oldOrder
                        },
                        id: { [sequelize.Op.ne]: lessonId }
                    },
                    transaction
                });
            }
        }
        
        // Actualizar lección
        const oldData = { ...lesson.dataValues };
        await lesson.update(updateData, { transaction });
        
        // Obtener lección actualizada con relaciones
        const updatedLesson = await Lesson.findByPk(lessonId, {
            include: [
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'title', 'slug']
                }
            ],
            transaction
        });
        
        await transaction.commit();
        
        // Detectar cambios
        const changes = {};
        Object.keys(updateData).forEach(key => {
            if (oldData[key] !== updateData[key]) {
                changes[key] = {
                    from: oldData[key],
                    to: updateData[key]
                };
            }
        });
        
        console.log('✅ [lesson.controller] Lesson updated successfully:', lessonId);
        
        res.json({
            success: true,
            message: 'Lesson updated successfully',
            lesson: updatedLesson.toJSON(),
            changes,
            meta: {
                updatedAt: new Date().toISOString(),
                fieldsChanged: Object.keys(changes).length,
                orderChanged: !!changes.order
            }
        });
        
    } catch (error) {
        await transaction.rollback();
        console.error('❌ [lesson.controller] Error updating lesson:', error.message);
        
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: 'Lesson validation failed',
                details: error.errors.map(e => ({
                    field: e.path,
                    message: e.message,
                    value: e.value
                }))
            });
        }
        
        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0]?.path;
            return res.status(409).json({
                success: false,
                error: 'Conflict Error',
                message: `Lesson with this ${field} already exists in this course`,
                field,
                code: 'DUPLICATE_LESSON'
            });
        }
        
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: 'Failed to update lesson',
            code: 'LESSON_UPDATE_FAILED'
        });
    }
};

// Soft delete lección
const deleteLesson = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const lessonId = parseInt(req.params.id);
        console.log('🗑️ [lesson.controller] Soft deleting lesson:', lessonId);
        
        if (isNaN(lessonId) || lessonId <= 0) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: 'Invalid lesson ID',
                code: 'INVALID_LESSON_ID'
            });
        }
        
        const lesson = await Lesson.findByPk(lessonId, { transaction });
        if (!lesson) {
            await transaction.rollback();
            return res.status(404).json({
                success: false,
                error: 'Not Found',
                message: 'Lesson not found',
                code: 'LESSON_NOT_FOUND'
            });
        }
        
        // Contar comentarios antes del soft delete
        const commentsCount = await Comment.count({
            where: { lessonId },
            transaction
        });
        
        const lessonOrder = lesson.order;
        const courseId = lesson.courseId;
        
        // Soft delete de la lección (paranoid: true)
        await lesson.destroy({ transaction });
        
        // Reordenar lecciones restantes
        await Lesson.decrement('order', {
            by: 1,
            where: {
                courseId,
                order: { [sequelize.Op.gt]: lessonOrder }
            },
            transaction
        });
        
        await transaction.commit();
        
        console.log('✅ [lesson.controller] Lesson soft deleted successfully:', lessonId);
        
        res.json({
            success: true,
            message: 'Lesson deleted successfully',
            deletedLesson: {
                id: lessonId,
                title: lesson.title,
                slug: lesson.slug,
                order: lessonOrder
            },
            impact: {
                commentsAffected: commentsCount,
                lessonsReordered: true
            },
            meta: {
                deletedAt: new Date().toISOString(),
                softDelete: true,
                recoverable: true
            }
        });
        
    } catch (error) {
        await transaction.rollback();
        console.error('❌ [lesson.controller] Error deleting lesson:', error.message);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: 'Failed to delete lesson',
            code: 'LESSON_DELETE_FAILED'
        });
    }
};

module.exports = {
    createLesson,
    getLessonsByCourse,
    getLessonById,
    updateLesson,
    deleteLesson
};