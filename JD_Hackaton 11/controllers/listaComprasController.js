const { getDatabase } = require('../db');
const { ObjectId } = require('mongodb');

// Función auxiliar para respuestas consistentes
function sendResponse(res, success, statusCode, data = null, message = '', error = null) {
    const response = {
        success,
        message,
        timestamp: new Date().toISOString()
    };
    
    if (data !== null) {
        response.data = data;
        if (Array.isArray(data)) {
            response.count = data.length;
        }
    }
    
    if (error && process.env.NODE_ENV === 'development') {
        response.error = error;
    }
    
    console.log(`📤 [CONTROLLER] Enviando respuesta ${statusCode}:`, {
        success,
        message,
        dataCount: Array.isArray(data) ? data.length : data ? 1 : 0
    });
    
    return res.status(statusCode).json(response);
}

const listaComprasController = {
    // Crear nuevo item
    crear: async (req, res) => {
        try {
            console.log('📝 [CONTROLLER] Creando nuevo item...');
            console.log('📋 [CONTROLLER] Datos recibidos:', req.body);
            
            const { nombre, descripcion, fecha } = req.body;
            
            // Validaciones
            if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
                console.warn('⚠️ [CONTROLLER] Validación fallida: nombre requerido');
                return sendResponse(res, false, 400, null, 
                    'El nombre del producto es obligatorio');
            }

            if (nombre.trim().length > 100) {
                console.warn('⚠️ [CONTROLLER] Validación fallida: nombre muy largo');
                return sendResponse(res, false, 400, null, 
                    'El nombre no puede exceder 100 caracteres');
            }

            if (descripcion && descripcion.length > 500) {
                console.warn('⚠️ [CONTROLLER] Validación fallida: descripción muy larga');
                return sendResponse(res, false, 400, null, 
                    'La descripción no puede exceder 500 caracteres');
            }

            const db = getDatabase();
            if (!db) {
                console.error('❌ [CONTROLLER] Base de datos no disponible');
                return sendResponse(res, false, 500, null, 
                    'Base de datos no disponible temporalmente');
            }
            
            // Preparar datos del item
            let fechaValidada = null;
            if (fecha) {
                try {
                    fechaValidada = new Date(fecha);
                    if (isNaN(fechaValidada.getTime())) {
                        console.warn('⚠️ [CONTROLLER] Fecha inválida proporcionada');
                        return sendResponse(res, false, 400, null, 
                            'La fecha proporcionada no es válida');
                    }
                } catch (fechaError) {
                    console.warn('⚠️ [CONTROLLER] Error parseando fecha:', fechaError);
                    return sendResponse(res, false, 400, null, 
                        'Formato de fecha inválido');
                }
            }

            const nuevoItem = {
                nombre: nombre.trim(),
                descripcion: descripcion ? descripcion.trim() : '',
                fecha: fechaValidada,
                fechaCreacion: new Date(),
                esCompletado: false,
                fechaCompletado: null
            };

            console.log('💾 [CONTROLLER] Insertando en BD:', nuevoItem);
            
            const resultado = await db.collection('listaCompras').insertOne(nuevoItem);
            
            if (resultado.insertedId) {
                const itemCreado = {
                    _id: resultado.insertedId,
                    ...nuevoItem
                };
                
                console.log('✅ [CONTROLLER] Item creado exitosamente:', resultado.insertedId);
                return sendResponse(res, true, 201, itemCreado, 
                    'Producto agregado exitosamente');
            } else {
                throw new Error('No se pudo insertar el item en la base de datos');
            }

        } catch (error) {
            console.error('❌ [CONTROLLER] Error al crear item:', error);
            return sendResponse(res, false, 500, null, 
                'Error interno al crear el producto', error.message);
        }
    },

    // Obtener todos los items
    obtenerTodos: async (req, res) => {
        try {
            console.log('📋 [CONTROLLER] Obteniendo todos los items...');
            
            const db = getDatabase();
            if (!db) {
                console.error('❌ [CONTROLLER] Base de datos no disponible');
                return sendResponse(res, false, 500, [], 
                    'Base de datos no disponible temporalmente');
            }

            const items = await db.collection('listaCompras')
                .find({})
                .sort({ fechaCreacion: -1 })
                .toArray();

            console.log(`✅ [CONTROLLER] ${items.length} items encontrados`);
            return sendResponse(res, true, 200, items, 
                `${items.length} items obtenidos exitosamente`);

        } catch (error) {
            console.error('❌ [CONTROLLER] Error al obtener items:', error);
            return sendResponse(res, false, 500, [], 
                'Error al obtener los items', error.message);
        }
    },

    // Obtener items pendientes
    obtenerPendientes: async (req, res) => {
        try {
            console.log('⏳ [CONTROLLER] Obteniendo items pendientes...');
            
            const db = getDatabase();
            if (!db) {
                return sendResponse(res, false, 500, [], 
                    'Base de datos no disponible');
            }

            const items = await db.collection('listaCompras')
                .find({ esCompletado: false })
                .sort({ fechaCreacion: -1 })
                .toArray();

            console.log(`✅ [CONTROLLER] ${items.length} items pendientes encontrados`);
            return sendResponse(res, true, 200, items, 
                `${items.length} items pendientes obtenidos`);

        } catch (error) {
            console.error('❌ [CONTROLLER] Error al obtener pendientes:', error);
            return sendResponse(res, false, 500, [], 
                'Error al obtener items pendientes', error.message);
        }
    },

    // Obtener items completados
    obtenerCompletados: async (req, res) => {
        try {
            console.log('✅ [CONTROLLER] Obteniendo items completados...');
            
            const db = getDatabase();
            if (!db) {
                return sendResponse(res, false, 500, [], 
                    'Base de datos no disponible');
            }

            const items = await db.collection('listaCompras')
                .find({ esCompletado: true })
                .sort({ fechaCompletado: -1 })
                .toArray();

            console.log(`✅ [CONTROLLER] ${items.length} items completados encontrados`);
            return sendResponse(res, true, 200, items, 
                `${items.length} items completados obtenidos`);

        } catch (error) {
            console.error('❌ [CONTROLLER] Error al obtener completados:', error);
            return sendResponse(res, false, 500, [], 
                'Error al obtener items completados', error.message);
        }
    },

    // Completar item
    completar: async (req, res) => {
        try {
            const { id } = req.params;
            console.log('✅ [CONTROLLER] Completando item:', id);

            if (!ObjectId.isValid(id)) {
                return sendResponse(res, false, 400, null, 
                    'ID de item inválido');
            }

            const db = getDatabase();
            if (!db) {
                return sendResponse(res, false, 500, null, 
                    'Base de datos no disponible');
            }
            
            const resultado = await db.collection('listaCompras').updateOne(
                { _id: new ObjectId(id) },
                { 
                    $set: { 
                        esCompletado: true, 
                        fechaCompletado: new Date() 
                    } 
                }
            );

            if (resultado.matchedCount === 0) {
                return sendResponse(res, false, 404, null, 
                    'Item no encontrado');
            }

            // Obtener el item actualizado
            const itemActualizado = await db.collection('listaCompras').findOne(
                { _id: new ObjectId(id) }
            );

            console.log('✅ [CONTROLLER] Item completado exitosamente');
            return sendResponse(res, true, 200, itemActualizado, 
                'Item marcado como completado');

        } catch (error) {
            console.error('❌ [CONTROLLER] Error al completar item:', error);
            return sendResponse(res, false, 500, null, 
                'Error al completar el item', error.message);
        }
    },

    // Descompletar item
    descompletar: async (req, res) => {
        try {
            const { id } = req.params;
            console.log('↩️ [CONTROLLER] Descompletando item:', id);

            if (!ObjectId.isValid(id)) {
                return sendResponse(res, false, 400, null, 
                    'ID de item inválido');
            }

            const db = getDatabase();
            if (!db) {
                return sendResponse(res, false, 500, null, 
                    'Base de datos no disponible');
            }
            
            const resultado = await db.collection('listaCompras').updateOne(
                { _id: new ObjectId(id) },
                { 
                    $set: { 
                        esCompletado: false, 
                        fechaCompletado: null 
                    } 
                }
            );

            if (resultado.matchedCount === 0) {
                return sendResponse(res, false, 404, null, 
                    'Item no encontrado');
            }

            const itemActualizado = await db.collection('listaCompras').findOne(
                { _id: new ObjectId(id) }
            );

            console.log('✅ [CONTROLLER] Item descompletado exitosamente');
            return sendResponse(res, true, 200, itemActualizado, 
                'Item marcado como pendiente');

        } catch (error) {
            console.error('❌ [CONTROLLER] Error al descompletar item:', error);
            return sendResponse(res, false, 500, null, 
                'Error al descompletar el item', error.message);
        }
    },

    // Eliminar item
    eliminar: async (req, res) => {
        try {
            const { id } = req.params;
            console.log('🗑️ [CONTROLLER] Eliminando item:', id);

            if (!ObjectId.isValid(id)) {
                return sendResponse(res, false, 400, null, 
                    'ID de item inválido');
            }

            const db = getDatabase();
            if (!db) {
                return sendResponse(res, false, 500, null, 
                    'Base de datos no disponible');
            }
            
            const resultado = await db.collection('listaCompras').deleteOne(
                { _id: new ObjectId(id) }
            );

            if (resultado.deletedCount === 1) {
                console.log('✅ [CONTROLLER] Item eliminado exitosamente');
                return sendResponse(res, true, 200, null, 
                    'Item eliminado exitosamente');
            } else {
                return sendResponse(res, false, 404, null, 
                    'Item no encontrado');
            }

        } catch (error) {
            console.error('❌ [CONTROLLER] Error al eliminar item:', error);
            return sendResponse(res, false, 500, null, 
                'Error al eliminar el item', error.message);
        }
    },

    // Obtener estadísticas
    obtenerEstadisticas: async (req, res) => {
        try {
            console.log('📊 [CONTROLLER] Obteniendo estadísticas...');
            
            const db = getDatabase();
            if (!db) {
                const estadisticasVacias = {
                    total: 0,
                    completados: 0,
                    pendientes: 0,
                    porcentajeCompletado: 0
                };
                return sendResponse(res, false, 500, estadisticasVacias, 
                    'Base de datos no disponible');
            }

            const total = await db.collection('listaCompras').countDocuments({});
            const completados = await db.collection('listaCompras').countDocuments({ esCompletado: true });
            const pendientes = total - completados;
            const porcentajeCompletado = total > 0 ? Math.round((completados / total) * 100) : 0;

            const estadisticas = {
                total,
                completados,
                pendientes,
                porcentajeCompletado
            };

            console.log('✅ [CONTROLLER] Estadísticas calculadas:', estadisticas);
            return sendResponse(res, true, 200, estadisticas, 
                'Estadísticas obtenidas exitosamente');

        } catch (error) {
            console.error('❌ [CONTROLLER] Error al obtener estadísticas:', error);
            const estadisticasError = {
                total: 0,
                completados: 0,
                pendientes: 0,
                porcentajeCompletado: 0
            };
            return sendResponse(res, false, 500, estadisticasError, 
                'Error al obtener estadísticas', error.message);
        }
    }
};

module.exports = listaComprasController;