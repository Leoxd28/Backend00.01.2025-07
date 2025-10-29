const Production = require('../models/Production');
const RawMaterial = require('../models/RawMaterial');
const Input = require('../models/Input');
const Staff = require('../models/Staff');
const mongoose = require('mongoose');

class ProductionController {
    // Obtener todas las producciones
    async getAll(req, res) {
        try {
            const { status, limit = 10, page = 1 } = req.query;
            let filter = {};
            
            if (status) {
                filter.status = status;
            }
            
            const skip = (parseInt(page) - 1) * parseInt(limit);
            
            const productions = await Production.find(filter)
                .populate('requirements.rawMaterials.materialId', 'name unit unitPrice')
                .populate('requirements.inputs.inputId', 'name unit unitPrice')
                .populate('assignedStaff.staffId', 'firstName lastName position hourlyRate')
                .sort({ createdAt: -1 })
                .limit(parseInt(limit))
                .skip(skip);
            
            const total = await Production.countDocuments(filter);
            
            res.json({
                success: true,
                count: productions.length,
                total,
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                data: productions,
                message: 'Producciones obtenidas exitosamente'
            });
            
        } catch (error) {
            console.error('Error obteniendo producciones:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }
    
    // Obtener producción por ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            
            // Buscar por MongoDB _id o por productionId personalizado
            let production;
            if (mongoose.Types.ObjectId.isValid(id)) {
                production = await Production.findById(id);
            } else {
                production = await Production.findByProductionId(id);
            }
            
            if (!production) {
                return res.status(404).json({
                    success: false,
                    message: 'Producción no encontrada'
                });
            }
            
            await production.populate('requirements.rawMaterials.materialId');
            await production.populate('requirements.inputs.inputId');
            await production.populate('assignedStaff.staffId');
            
            res.json({
                success: true,
                data: production,
                message: 'Producción obtenida exitosamente'
            });
            
        } catch (error) {
            console.error('Error obteniendo producción:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }
    
    // Crear nueva orden de producción
    async create(req, res) {
        try {
            const { quantityRequested, productType = 'armario_basico', productionId } = req.body;
            
            if (!quantityRequested || quantityRequested <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'La cantidad solicitada debe ser mayor a 0'
                });
            }
            
            // Verificar si el productionId ya existe (si se proporciona)
            if (productionId) {
                const existingProduction = await Production.findByProductionId(productionId);
                if (existingProduction) {
                    return res.status(409).json({
                        success: false,
                        message: 'Ya existe una producción con ese ID'
                    });
                }
            }
            
            // Buscar materias primas necesarias (tablón de madera)
            const tablon = await RawMaterial.findOne({ 
                name: { $regex: /tablón|tablon|madera/i },
                isActive: true 
            });
            
            // Buscar insumos necesarios (goma)
            const goma = await Input.findOne({ 
                name: { $regex: /goma/i },
                isActive: true 
            });
            
            // Buscar personal disponible
            const carpinteros = await Staff.find({ 
                position: 'carpintero',
                isActive: true 
            }).sort({ availableHours: -1 });
            
            // Calcular requerimientos
            const tablonRequerido = quantityRequested * 1; // 1 tablón por armario
            const gomaRequerida = quantityRequested * 0.25; // 0.25 kg por armario
            const horasRequeridas = quantityRequested * 8; // 8 horas por armario
            
            // Crear estructura básica de producción
            const productionData = {
                productType,
                quantityRequested,
                requirements: {
                    rawMaterials: [],
                    inputs: [],
                    labor: {
                        hoursPerUnit: 8,
                        totalHoursRequired: horasRequeridas,
                        totalHoursUsed: 0
                    }
                },
                assignedStaff: [],
                costs: {
                    rawMaterialsCost: 0,
                    inputsCost: 0,
                    laborCost: 0,
                    totalCost: 0
                }
            };
            
            // Agregar productionId personalizado si se proporciona
            if (productionId) {
                productionData.productionId = productionId;
            }
            
            // Agregar materias primas si están disponibles
            if (tablon) {
                if (tablon.stock >= tablonRequerido) {
                    productionData.requirements.rawMaterials.push({
                        materialId: tablon._id,
                        materialName: tablon.name,
                        quantityPerUnit: 1,
                        totalRequired: tablonRequerido,
                        totalUsed: 0,
                        unitPrice: tablon.unitPrice
                    });
                    productionData.costs.rawMaterialsCost = tablonRequerido * tablon.unitPrice;
                } else {
                    return res.status(400).json({
                        success: false,
                        message: `Stock insuficiente de tablones. Disponible: ${tablon.stock}, Requerido: ${tablonRequerido}`
                    });
                }
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'No se encontró tablón de madera en el inventario. Debe crear materias primas primero.'
                });
            }
            
            // Agregar insumos si están disponibles
            if (goma) {
                if (goma.stock >= gomaRequerida) {
                    productionData.requirements.inputs.push({
                        inputId: goma._id,
                        inputName: goma.name,
                        quantityPerUnit: 0.25,
                        totalRequired: gomaRequerida,
                        totalUsed: 0,
                        unitPrice: goma.unitPrice
                    });
                    productionData.costs.inputsCost = gomaRequerida * goma.unitPrice;
                } else {
                    return res.status(400).json({
                        success: false,
                        message: `Stock insuficiente de goma. Disponible: ${goma.stock} kg, Requerido: ${gomaRequerida} kg`
                    });
                }
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'No se encontró goma en el inventario. Debe crear insumos primero.'
                });
            }
            
            // Verificar y asignar personal
            if (carpinteros.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No hay carpinteros disponibles. Debe crear personal primero.'
                });
            }
            
            const horasDisponibles = carpinteros.reduce((total, c) => total + c.availableHours, 0);
            
            if (horasDisponibles < horasRequeridas) {
                return res.status(400).json({
                    success: false,
                    message: `Horas insuficientes. Disponible: ${horasDisponibles}h, Requerido: ${horasRequeridas}h`
                });
            }
            
            // Asignar carpinteros
            let horasRestantes = horasRequeridas;
            for (const carpintero of carpinteros) {
                if (horasRestantes <= 0) break;
                
                const horasAsignadas = Math.min(carpintero.availableHours, horasRestantes);
                
                if (horasAsignadas > 0) {
                    productionData.assignedStaff.push({
                        staffId: carpintero._id,
                        staffName: `${carpintero.firstName} ${carpintero.lastName}`,
                        hoursAssigned: horasAsignadas,
                        hourlyRate: carpintero.hourlyRate
                    });
                    
                    productionData.costs.laborCost += horasAsignadas * carpintero.hourlyRate;
                    horasRestantes -= horasAsignadas;
                }
            }
            
            // Calcular costo total
            productionData.costs.totalCost = productionData.costs.rawMaterialsCost + 
                                           productionData.costs.inputsCost + 
                                           productionData.costs.laborCost;
            
            // Crear la producción
            const production = new Production(productionData);
            const savedProduction = await production.save();
            
            res.status(201).json({
                success: true,
                data: savedProduction,
                message: 'Orden de producción creada exitosamente'
            });
            
        } catch (error) {
            console.error('Error creando producción:', error);
            
            if (error.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: 'Ya existe una producción con ese ID'
                });
            }
            
            if (error.name === 'ValidationError') {
                const validationErrors = Object.values(error.errors).map(err => ({
                    field: err.path,
                    message: err.message
                }));
                
                return res.status(400).json({
                    success: false,
                    message: 'Error de validación',
                    errors: validationErrors
                });
            }
            
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }
    
    // Procesar producción de armarios
    async produce(req, res) {
        const session = await mongoose.startSession();
        session.startTransaction();
        
        try {
            const { productionId, quantityToProduce } = req.body;
            
            if (!productionId || !quantityToProduce || quantityToProduce <= 0) {
                throw new Error('ID de producción y cantidad válida son requeridos');
            }
            
            // Buscar producción por productionId personalizado o MongoDB _id
            let production;
            if (mongoose.Types.ObjectId.isValid(productionId)) {
                production = await Production.findById(productionId).session(session);
            } else {
                production = await Production.findByProductionId(productionId).session(session);
            }
            
            if (!production) {
                throw new Error('Producción no encontrada');
            }
            
            if (production.status !== 'planificado' && production.status !== 'en_progreso') {
                throw new Error('La producción no está en estado válido para procesar');
            }
            
            const cantidadRestante = production.quantityRequested - production.quantityProduced;
            if (quantityToProduce > cantidadRestante) {
                throw new Error(`Cantidad excede lo requerido. Restante: ${cantidadRestante}`);
            }
            
            // Calcular recursos necesarios para la cantidad a producir
            const tablonesNecesarios = quantityToProduce * 1;
            const gomaNecesaria = quantityToProduce * 0.25;
            const horasNecesarias = quantityToProduce * 8;
            
            // Verificar y reducir stock de materias primas
            for (const rawMaterial of production.requirements.rawMaterials) {
                if (!rawMaterial.materialId) continue;
                
                const material = await RawMaterial.findById(rawMaterial.materialId).session(session);
                if (!material) {
                    throw new Error(`Materia prima ${rawMaterial.materialName} no encontrada`);
                }
                
                const cantidadNecesaria = rawMaterial.quantityPerUnit * quantityToProduce;
                if (material.stock < cantidadNecesaria) {
                    throw new Error(`Stock insuficiente de ${material.name}. Disponible: ${material.stock}, Necesario: ${cantidadNecesaria}`);
                }
                
                material.stock -= cantidadNecesaria;
                await material.save({ session });
                
                rawMaterial.totalUsed += cantidadNecesaria;
            }
            
            // Verificar y reducir stock de insumos
            for (const input of production.requirements.inputs) {
                if (!input.inputId) continue;
                
                const insumo = await Input.findById(input.inputId).session(session);
                if (!insumo) {
                    throw new Error(`Insumo ${input.inputName} no encontrado`);
                }
                
                const cantidadNecesaria = input.quantityPerUnit * quantityToProduce;
                if (insumo.stock < cantidadNecesaria) {
                    throw new Error(`Stock insuficiente de ${insumo.name}. Disponible: ${insumo.stock}, Necesario: ${cantidadNecesaria}`);
                }
                
                insumo.stock -= cantidadNecesaria;
                await insumo.save({ session });
                
                input.totalUsed += cantidadNecesaria;
            }
            
            // Asignar y reducir horas del personal
            let horasRestantes = horasNecesarias;
            for (const staffAssignment of production.assignedStaff) {
                if (horasRestantes <= 0) break;
                if (!staffAssignment.staffId) continue;
                
                const staff = await Staff.findById(staffAssignment.staffId).session(session);
                if (!staff) {
                    throw new Error(`Personal ${staffAssignment.staffName} no encontrado`);
                }
                
                const horasAUsar = Math.min(staff.availableHours, horasRestantes, staffAssignment.hoursAssigned);
                
                if (horasAUsar > 0) {
                    staff.availableHours -= horasAUsar;
                    await staff.save({ session });
                    horasRestantes -= horasAUsar;
                }
            }
            
            if (horasRestantes > 0) {
                throw new Error(`Horas insuficientes del personal asignado. Faltan: ${horasRestantes} horas`);
            }
            
            // Actualizar producción
            production.quantityProduced += quantityToProduce;
            production.requirements.labor.totalHoursUsed += horasNecesarias;
            
            if (production.quantityProduced >= production.quantityRequested) {
                production.status = 'completado';
                production.timeline.actualEndDate = new Date();
            } else if (production.status === 'planificado') {
                production.status = 'en_progreso';
                production.timeline.startDate = new Date();
            }
            
            await production.save({ session });
            
            await session.commitTransaction();
            
            // Calcular tiempo estimado para completar
            const cantidadRestanteActualizada = production.quantityRequested - production.quantityProduced;
            const horasRestantesTotal = cantidadRestanteActualizada * 8;
            const diasEstimados = Math.ceil(horasRestantesTotal / 8); // 8 horas por día
            
            // Calcular costos de esta producción
            const costoMateriales = tablonesNecesarios * (production.requirements.rawMaterials[0]?.unitPrice || 0);
            const costoInsumos = gomaNecesaria * (production.requirements.inputs[0]?.unitPrice || 0);
            const costoManoObra = horasNecesarias * (production.assignedStaff[0]?.hourlyRate || 0);
            const costoTotal = costoMateriales + costoInsumos + costoManoObra;
            
            res.json({
                success: true,
                data: {
                    production,
                    produced: {
                        quantity: quantityToProduce,
                        resourcesUsed: {
                            tablones: tablonesNecesarios,
                            goma: `${gomaNecesaria} kg`,
                            horasHombre: horasNecesarias
                        },
                        costs: {
                            materiales: costoMateriales,
                            insumos: costoInsumos,
                            manoObra: costoManoObra,
                            total: costoTotal
                        }
                    },
                    remaining: {
                        quantity: cantidadRestanteActualizada,
                        estimatedDaysToComplete: diasEstimados,
                        status: production.status
                    }
                },
                message: `Producción exitosa de ${quantityToProduce} armarios. ${cantidadRestanteActualizada} restantes.`
            });
            
        } catch (error) {
            await session.abortTransaction();
            console.error('Error en producción:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        } finally {
            session.endSession();
        }
    }
    
    // Obtener estadísticas de producción
    async getStatistics(req, res) {
        try {
            const totalProductions = await Production.countDocuments();
            const completedProductions = await Production.countDocuments({ status: 'completado' });
            const inProgressProductions = await Production.countDocuments({ status: 'en_progreso' });
            const plannedProductions = await Production.countDocuments({ status: 'planificado' });
            
            const totalArmarios = await Production.aggregate([
                { $group: { _id: null, total: { $sum: '$quantityProduced' } } }
            ]);
            
            const totalCosts = await Production.aggregate([
                { $group: { _id: null, total: { $sum: '$costs.totalCost' } } }
            ]);
            
            res.json({
                success: true,
                data: {
                    totalProductions,
                    productionsByStatus: {
                        completado: completedProductions,
                        en_progreso: inProgressProductions,
                        planificado: plannedProductions
                    },
                    totalArmariosProducidos: totalArmarios[0]?.total || 0,
                    totalCostos: totalCosts[0]?.total || 0
                },
                message: 'Estadísticas obtenidas exitosamente'
            });
            
        } catch (error) {
            console.error('Error obteniendo estadísticas:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }
    
    // Calcular capacidad de producción
    async calculateCapacity(req, res) {
        try {
            // Obtener stock de materias primas
            const tablon = await RawMaterial.findOne({ 
                name: { $regex: /tablón|tablon|madera/i },
                isActive: true 
            });
            
            // Obtener stock de insumos
            const goma = await Input.findOne({ 
                name: { $regex: /goma/i },
                isActive: true 
            });
            
            // Obtener horas disponibles del personal
            const totalHoras = await Staff.aggregate([
                { $match: { position: 'carpintero', isActive: true } },
                { $group: { _id: null, total: { $sum: '$availableHours' } } }
            ]);
            
            const horasDisponibles = totalHoras[0]?.total || 0;
            
            // Calcular capacidad máxima
            const capacidadPorTablenes = tablon ? tablon.stock : 0;
            const capacidadPorGoma = goma ? Math.floor(goma.stock / 0.25) : 0;
            const capacidadPorHoras = Math.floor(horasDisponibles / 8);
            
            const capacidadMaxima = Math.min(capacidadPorTablenes, capacidadPorGoma, capacidadPorHoras);
            
            res.json({
                success: true,
                data: {
                    currentCapacity: {
                        byTablenes: capacidadPorTablenes,
                        byGoma: capacidadPorGoma,
                        byHours: capacidadPorHoras,
                        maximum: capacidadMaxima
                    },
                    resources: {
                        tablones: {
                            available: tablon?.stock || 0,
                            needed: '1 por armario'
                        },
                        goma: {
                            available: goma?.stock || 0,
                            needed: '0.25 kg por armario'
                        },
                        hours: {
                            available: horasDisponibles,
                            needed: '8 horas por armario'
                        }
                    },
                    bottleneck: capacidadMaxima === capacidadPorTablenes ? 'tablones' :
                               capacidadMaxima === capacidadPorGoma ? 'goma' : 'horas'
                },
                message: `Capacidad máxima actual: ${capacidadMaxima} armarios`
            });
            
        } catch (error) {
            console.error('Error calculando capacidad:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }
}

module.exports = new ProductionController();