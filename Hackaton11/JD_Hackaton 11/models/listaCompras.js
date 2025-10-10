const { ObjectId } = require('mongodb');

class ListaCompras {
    constructor(db) {
        this.db = db;
        this.collection = db ? db.collection('listaCompras') : null;
        this.memoriaItems = []; // Fallback para modo sin BD
        this.contador = 1;
    }

    // Crear nuevo item
    async crear(data) {
        try {
            console.log('📦 Creando item:', data);
            
            const nuevoItem = {
                nombre: data.nombre,
                descripcion: data.descripcion || '',
                fecha: data.fecha ? new Date(data.fecha) : null,
                esCompletado: false,
                fechaCreacion: new Date(),
                fechaActualizacion: new Date()
            };

            if (this.collection) {
                // Usar MongoDB
                console.log('💾 Guardando en MongoDB...');
                const result = await this.collection.insertOne(nuevoItem);
                const itemCreado = await this.collection.findOne({ _id: result.insertedId });
                
                console.log('✅ Item creado en MongoDB:', itemCreado);
                return {
                    success: true,
                    data: itemCreado,
                    message: 'Item creado exitosamente en MongoDB'
                };
            } else {
                // Usar memoria como fallback
                console.log('🧠 Guardando en memoria...');
                nuevoItem._id = `mem_${this.contador++}`;
                this.memoriaItems.push(nuevoItem);
                
                console.log('✅ Item creado en memoria:', nuevoItem);
                return {
                    success: true,
                    data: nuevoItem,
                    message: 'Item creado exitosamente en memoria'
                };
            }
        } catch (error) {
            console.error('❌ Error en crear:', error);
            return {
                success: false,
                message: 'Error al crear el item',
                error: error.message
            };
        }
    }

    // Obtener todos los items
    async obtenerTodos() {
        try {
            console.log('📥 Obteniendo todos los items...');
            
            if (this.collection) {
                console.log('📥 Obteniendo desde MongoDB...');
                const items = await this.collection.find({}).sort({ fechaCreacion: -1 }).toArray();
                
                console.log(`✅ Obtenidos ${items.length} items de MongoDB`);
                return {
                    success: true,
                    data: items,
                    count: items.length,
                    source: 'mongodb'
                };
            } else {
                console.log('📥 Obteniendo desde memoria...');
                const items = [...this.memoriaItems].sort((a, b) => 
                    new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
                );
                
                console.log(`✅ Obtenidos ${items.length} items de memoria`);
                return {
                    success: true,
                    data: items,
                    count: items.length,
                    source: 'memoria'
                };
            }
        } catch (error) {
            console.error('❌ Error en obtenerTodos:', error);
            return {
                success: false,
                message: 'Error al obtener items',
                error: error.message,
                data: []
            };
        }
    }

    // Obtener items pendientes
    async obtenerPendientes() {
        try {
            console.log('📋 Obteniendo items pendientes...');
            
            if (this.collection) {
                const items = await this.collection.find({ esCompletado: false })
                    .sort({ fechaCreacion: -1 }).toArray();
                
                return {
                    success: true,
                    data: items,
                    count: items.length,
                    source: 'mongodb'
                };
            } else {
                const items = this.memoriaItems.filter(item => !item.esCompletado)
                    .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
                
                return {
                    success: true,
                    data: items,
                    count: items.length,
                    source: 'memoria'
                };
            }
        } catch (error) {
            console.error('❌ Error en obtenerPendientes:', error);
            return {
                success: false,
                message: 'Error al obtener items pendientes',
                error: error.message,
                data: []
            };
        }
    }

    // Obtener items completados
    async obtenerCompletados() {
        try {
            console.log('✅ Obteniendo items completados...');
            
            if (this.collection) {
                const items = await this.collection.find({ esCompletado: true })
                    .sort({ fechaCreacion: -1 }).toArray();
                
                return {
                    success: true,
                    data: items,
                    count: items.length,
                    source: 'mongodb'
                };
            } else {
                const items = this.memoriaItems.filter(item => item.esCompletado)
                    .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
                
                return {
                    success: true,
                    data: items,
                    count: items.length,
                    source: 'memoria'
                };
            }
        } catch (error) {
            console.error('❌ Error en obtenerCompletados:', error);
            return {
                success: false,
                message: 'Error al obtener items completados',
                error: error.message,
                data: []
            };
        }
    }

    // Completar un item
    async completar(id) {
        try {
            console.log('✅ Completando item:', id);
            
            if (this.collection) {
                const objectId = new ObjectId(id);
                const result = await this.collection.updateOne(
                    { _id: objectId },
                    { 
                        $set: { 
                            esCompletado: true,
                            fechaActualizacion: new Date()
                        } 
                    }
                );
                
                if (result.matchedCount === 0) {
                    return {
                        success: false,
                        message: 'Item no encontrado'
                    };
                }
                
                const itemActualizado = await this.collection.findOne({ _id: objectId });
                
                return {
                    success: true,
                    data: itemActualizado,
                    message: 'Item completado exitosamente'
                };
            } else {
                const index = this.memoriaItems.findIndex(item => item._id === id);
                
                if (index === -1) {
                    return {
                        success: false,
                        message: 'Item no encontrado'
                    };
                }
                
                this.memoriaItems[index].esCompletado = true;
                this.memoriaItems[index].fechaActualizacion = new Date();
                
                return {
                    success: true,
                    data: this.memoriaItems[index],
                    message: 'Item completado exitosamente'
                };
            }
        } catch (error) {
            console.error('❌ Error en completar:', error);
            return {
                success: false,
                message: 'Error al completar item',
                error: error.message
            };
        }
    }

    // Descompletar un item
    async descompletar(id) {
        try {
            console.log('↩️ Descompletando item:', id);
            
            if (this.collection) {
                const objectId = new ObjectId(id);
                const result = await this.collection.updateOne(
                    { _id: objectId },
                    { 
                        $set: { 
                            esCompletado: false,
                            fechaActualizacion: new Date()
                        } 
                    }
                );
                
                if (result.matchedCount === 0) {
                    return {
                        success: false,
                        message: 'Item no encontrado'
                    };
                }
                
                const itemActualizado = await this.collection.findOne({ _id: objectId });
                
                return {
                    success: true,
                    data: itemActualizado,
                    message: 'Item descompletado exitosamente'
                };
            } else {
                const index = this.memoriaItems.findIndex(item => item._id === id);
                
                if (index === -1) {
                    return {
                        success: false,
                        message: 'Item no encontrado'
                    };
                }
                
                this.memoriaItems[index].esCompletado = false;
                this.memoriaItems[index].fechaActualizacion = new Date();
                
                return {
                    success: true,
                    data: this.memoriaItems[index],
                    message: 'Item descompletado exitosamente'
                };
            }
        } catch (error) {
            console.error('❌ Error en descompletar:', error);
            return {
                success: false,
                message: 'Error al descompletar item',
                error: error.message
            };
        }
    }

    // Eliminar un item
    async eliminar(id) {
        try {
            console.log('🗑️ Eliminando item:', id);
            
            if (this.collection) {
                const objectId = new ObjectId(id);
                const result = await this.collection.deleteOne({ _id: objectId });
                
                if (result.deletedCount === 0) {
                    return {
                        success: false,
                        message: 'Item no encontrado'
                    };
                }
                
                return {
                    success: true,
                    message: 'Item eliminado exitosamente'
                };
            } else {
                const index = this.memoriaItems.findIndex(item => item._id === id);
                
                if (index === -1) {
                    return {
                        success: false,
                        message: 'Item no encontrado'
                    };
                }
                
                this.memoriaItems.splice(index, 1);
                
                return {
                    success: true,
                    message: 'Item eliminado exitosamente'
                };
            }
        } catch (error) {
            console.error('❌ Error en eliminar:', error);
            return {
                success: false,
                message: 'Error al eliminar item',
                error: error.message
            };
        }
    }

    // Obtener estadísticas
    async obtenerEstadisticas() {
        try {
            console.log('📊 Obteniendo estadísticas...');
            
            if (this.collection) {
                const [total, completados, pendientes] = await Promise.all([
                    this.collection.countDocuments({}),
                    this.collection.countDocuments({ esCompletado: true }),
                    this.collection.countDocuments({ esCompletado: false })
                ]);
                
                return {
                    success: true,
                    data: {
                        total,
                        completados,
                        pendientes,
                        porcentajeCompletado: total > 0 ? Math.round((completados / total) * 100) : 0
                    },
                    source: 'mongodb'
                };
            } else {
                const total = this.memoriaItems.length;
                const completados = this.memoriaItems.filter(item => item.esCompletado).length;
                const pendientes = total - completados;
                
                return {
                    success: true,
                    data: {
                        total,
                        completados,
                        pendientes,
                        porcentajeCompletado: total > 0 ? Math.round((completados / total) * 100) : 0
                    },
                    source: 'memoria'
                };
            }
        } catch (error) {
            console.error('❌ Error en obtenerEstadisticas:', error);
            return {
                success: false,
                message: 'Error al obtener estadísticas',
                error: error.message,
                data: {
                    total: 0,
                    completados: 0,
                    pendientes: 0,
                    porcentajeCompletado: 0
                }
            };
        }
    }
}

module.exports = ListaCompras;