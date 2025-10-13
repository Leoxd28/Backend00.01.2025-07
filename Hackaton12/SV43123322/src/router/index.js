const express = require('express');
const router = express.Router();

// Ruta principal del API
router.get('/', (req, res) => {
    res.json({
        message: '🏭 API Sistema de Producción de Armarios ABC',
        version: '1.0.0',
        company: 'Empresa ABC',
        database: process.env.DB_NAME || 'SV43123322_Hackaton12',
        endpoints: {
            rawMaterials: {
                base: '/api/raw-materials',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                description: 'Gestión de materias primas (tablones de madera)'
            },
            inputs: {
                base: '/api/inputs',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                description: 'Gestión de insumos (goma, clavos, tornillos, etc.)'
            },
            staff: {
                base: '/api/staff',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                description: 'Gestión de personal (carpinteros)'
            },
            production: {
                base: '/api/production',
                methods: ['GET', 'POST'],
                special: '/api/production/produce',
                description: 'Gestión de producción de armarios'
            }
        },
        productionRequirements: {
            perArmario: {
                tablon: '1 unidad',
                goma: '0.25 kg',
                horasHombre: '8 horas',
                carpintero: '40 horas semanales'
            }
        },
        businessRules: {
            stockControl: 'Se reduce automáticamente al producir',
            hourControl: '40 horas semanales por carpintero',
            production: 'Calcula tiempo y costos automáticamente'
        }
    });
});

// Ruta de información del sistema
router.get('/info', (req, res) => {
    res.json({
        system: 'Sistema de Control de Producción',
        company: 'Empresa ABC - Armarios',
        description: 'Control de rutinas de producción con gestión automática de stock',
        features: [
            'CRUD Materias Primas',
            'CRUD Insumos', 
            'CRUD Personal',
            'CRUD Producción',
            'Control automático de stock',
            'Cálculo de costos y tiempos',
            'Gestión de horas hombre'
        ],
        database: process.env.DB_NAME,
        timestamp: new Date().toISOString()
    });
});

// Ruta de estadísticas generales
router.get('/dashboard', async (req, res) => {
    try {
        const RawMaterial = require('../models/RawMaterial');
        const Input = require('../models/Input');
        const Staff = require('../models/Staff');
        const Production = require('../models/Production');
        
        const dashboard = {
            resources: {
                rawMaterials: await RawMaterial.countDocuments({ isActive: true }),
                inputs: await Input.countDocuments({ isActive: true }),
                staff: await Staff.countDocuments({ isActive: true }),
                productions: await Production.countDocuments()
            },
            availability: {
                tablones: await RawMaterial.findOne({ name: { $regex: /tablón|tablon/i } })
                    .then(m => m?.stock || 0),
                goma: await Input.findOne({ name: { $regex: /goma/i } })
                    .then(i => i?.stock || 0),
                carpinteros: await Staff.countDocuments({ position: 'carpintero', isActive: true }),
                horasDisponibles: await Staff.aggregate([
                    { $match: { position: 'carpintero', isActive: true } },
                    { $group: { _id: null, total: { $sum: '$availableHours' } } }
                ]).then(result => result[0]?.total || 0)
            },
            timestamp: new Date().toISOString()
        };
        
        res.json({
            success: true,
            data: dashboard,
            message: 'Dashboard obtenido exitosamente'
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error obteniendo dashboard',
            error: error.message
        });
    }
});

module.exports = router;