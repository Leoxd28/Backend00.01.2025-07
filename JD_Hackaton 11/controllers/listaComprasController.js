const { getDatabase } = require('../db');
const { ObjectId } = require('mongodb');

const listaComprasController = {
    // Crear nuevo item
    crear: async (req, res) => {
        try {
            console.log('📝 Creando nuevo item:', req.body);
            
            const { nombre, descripcion, fecha } = req.body;
            
            // Validaciones básicas
            if (!nombre || !nombre.trim()) {
                return res.status(400).json({
                    success: false,
                    message: 'El nombre del producto es obligatorio'
                });
            }

            const db = getDatabase();
            if (!db) {
                return res.status(500).json({
                    success: false,
                    message: 'Base de datos no disponible'
                });
            }
            
            const nuevoItem = {
                nombre: nombre.trim(),
                descripcion: descripcion ? descripcion.trim() : '',
                fecha: fecha ? new Date(fecha) : null,
                fechaCreacion: new Date(),
                esCompletado: false,
                fechaCompletado: null
            };

            console.log('💾 Insertando item en DB:', nuevoItem);
            
            const resultado = await db.collection('listaCompras').insertOne(nuevoItem);
            
            if (resultado.insertedId) {
                console.log('✅ Item creado exitosamente con ID:', resultado.insertedId);
                
                res.status(201).json({
                    success: true,
                    message: 'Item creado exitosamente',
                    data: {
                        _id: resultado.insertedId,
                        ...nuevoItem
                    }
                });
            } else {
                throw new Error('No se pudo insertar el item en la base de datos');
            }

        } catch (error) {
            console.error('❌ Error al crear item:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
            });
        }
    },

    // Obtener todos los items
    obtenerTodos: async (req, res) => {
        try {
            console.log('📋 Obteniendo todos los items');
            
            const db = getDatabase();
            if (!db) {
                return res.status(500).json({
                    success: false,
                    message: 'Base de datos no disponible',
                    data: []
                });
            }

            const items = await db.collection('listaCompras')
                .find({})
                .sort({ fechaCreacion: -1 })
                .toArray();

            console.log(`✅ Se encontraron ${items.length} items`);

            res.json({
                success: true,
                message: 'Items obtenidos exitosamente',
                data: items,
                count: items.length
            });

        } catch (error) {
            console.error('❌ Error al obtener items:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener los items',
                data: [],
                error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
            });
        }
    },

    // Obtener items pendientes
    obtenerPendientes: async (req, res) => {
        try {
            console.log('⏳ Obteniendo items pendientes');
            
            const db = getDatabase();
            if (!db) {
                return res.status(500).json({
                    success: false,
                    message: 'Base de datos no disponible',
                    data: []
                });
            }

            const items = await db.collection('listaCompras')
                .find({ esCompletado: false })
                .sort({ fechaCreacion: -1 })
                .toArray();

            console.log(`✅ Se encontraron ${items.length} items pendientes`);

            res.json({
                success: true,
                message: 'Items pendientes obtenidos exitosamente',
                data: items,
                count: items.length
            });

        } catch (error) {
            console.error('❌ Error al obtener pendientes:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener items pendientes',
                data: [],
                error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
            });
        }
    },

    // Obtener items completados
    obtenerCompletados: async (req, res) => {
        try {
            console.log('✅ Obteniendo items completados');
            
            const db = getDatabase();
            if (!db) {
                return res.status(500).json({
                    success: false,
                    message: 'Base de datos no disponible',
                    data: []
                });
            }

            const items = await db.collection('listaCompras')
                .find({ esCompletado: true })
                .sort({ fechaCompletado: -1 })
                .toArray();

            console.log(`✅ Se encontraron ${items.length} items completados`);

            res.json({
                success: true,
                message: 'Items completados obtenidos exitosamente',
                data: items,
                count: items.length
            });

        } catch (error) {
            console.error('❌ Error al obtener completados:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener items completados',
                data: [],
                error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
            });
        }
    },

    // Completar un item
    completar: async (req, res) => {
        try {
            const { id } = req.params;
            console.log('✅ Completando item ID:', id);

            if (!ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de item inválido'
                });
            }

            const db = getDatabase();
            if (!db) {
                return res.status(500).json({
                    success: false,
                    message: 'Base de datos no disponible'
                });
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
                return res.status(404).json({
                    success: false,
                    message: 'Item no encontrado'
                });
            }

            // Obtener el item actualizado
            const itemActualizado = await db.collection('listaCompras').findOne(
                { _id: new ObjectId(id) }
            );

            console.log('✅ Item completado exitosamente');
            res.json({
                success: true,
                message: 'Item marcado como completado exitosamente',
                data: itemActualizado
            });

        } catch (error) {
            console.error('❌ Error al completar item:', error);
            res.status(500).json({
                success: false,
                message: 'Error al completar el item',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
            });
        }
    },

    // Descompletar un item
    descompletar: async (req, res) => {
        try {
            const { id } = req.params;
            console.log('↩️ Descompletando item ID:', id);

            if (!ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de item inválido'
                });
            }

            const db = getDatabase();
            if (!db) {
                return res.status(500).json({
                    success: false,
                    message: 'Base de datos no disponible'
                });
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
                return res.status(404).json({
                    success: false,
                    message: 'Item no encontrado'
                });
            }

            // Obtener el item actualizado
            const itemActualizado = await db.collection('listaCompras').findOne(
                { _id: new ObjectId(id) }
            );

            console.log('✅ Item descompletado exitosamente');
            res.json({
                success: true,
                message: 'Item marcado como pendiente exitosamente',
                data: itemActualizado
            });

        } catch (error) {
            console.error('❌ Error al descompletar item:', error);
            res.status(500).json({
                success: false,
                message: 'Error al descompletar el item',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
            });
        }
    },

    // Eliminar un item
    eliminar: async (req, res) => {
        try {
            const { id } = req.params;
            console.log('🗑️ Eliminando item ID:', id);

            if (!ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de item inválido'
                });
            }

            const db = getDatabase();
            if (!db) {
                return res.status(500).json({
                    success: false,
                    message: 'Base de datos no disponible'
                });
            }
            
            const resultado = await db.collection('listaCompras').deleteOne(
                { _id: new ObjectId(id) }
            );

            if (resultado.deletedCount === 1) {
                console.log('✅ Item eliminado exitosamente');
                res.json({
                    success: true,
                    message: 'Item eliminado exitosamente'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Item no encontrado'
                });
            }

        } catch (error) {
            console.error('❌ Error al eliminar item:', error);
            res.status(500).json({
                success: false,
                message: 'Error al eliminar el item',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
            });
        }
    },

    // Obtener estadísticas
    obtenerEstadisticas: async (req, res) => {
        try {
            console.log('📊 Obteniendo estadísticas');
            
            const db = getDatabase();
            if (!db) {
                return res.status(500).json({
                    success: false,
                    message: 'Base de datos no disponible',
                    data: {
                        total: 0,
                        completados: 0,
                        pendientes: 0,
                        porcentajeCompletado: 0
                    }
                });
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

            console.log('✅ Estadísticas obtenidas:', estadisticas);

            res.json({
                success: true,
                message: 'Estadísticas obtenidas exitosamente',
                data: estadisticas
            });

        } catch (error) {
            console.error('❌ Error al obtener estadísticas:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener estadísticas',
                data: {
                    total: 0,
                    completados: 0,
                    pendientes: 0,
                    porcentajeCompletado: 0
                },
                error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
            });
        }
    }
};

module.exports = listaComprasController;