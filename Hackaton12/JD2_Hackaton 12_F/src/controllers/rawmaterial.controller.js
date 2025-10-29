const RawMaterial = require('../models/RawMaterial');

// Obtener todas las materias primas
const getAllRawMaterials = async (req, res) => {
    try {
        const { category, lowStock, isActive = true } = req.query;
        let filter = { isActive: isActive === 'true' };
        
        if (category) {
            filter.category = category;
        }
        
        let rawMaterials;
        if (lowStock === 'true') {
            rawMaterials = await RawMaterial.findLowStock();
        } else {
            rawMaterials = await RawMaterial.find(filter).sort({ name: 1 });
        }
        
        res.json({
            success: true,
            count: rawMaterials.length,
            data: rawMaterials,
            message: 'Materias primas obtenidas exitosamente'
        });
        
    } catch (error) {
        console.error('Error obteniendo materias primas:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Obtener materia prima por ID
const getRawMaterialById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const rawMaterial = await RawMaterial.findById(id);
        
        if (!rawMaterial) {
            return res.status(404).json({
                success: false,
                message: 'Materia prima no encontrada'
            });
        }
        
        res.json({
            success: true,
            data: rawMaterial,
            message: 'Materia prima obtenida exitosamente'
        });
        
    } catch (error) {
        console.error('Error obteniendo materia prima:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'ID de materia prima no válido'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Crear nueva materia prima
const createRawMaterial = async (req, res) => {
    try {
        const rawMaterialData = req.body;
        
        // Verificar si ya existe una materia prima con el mismo nombre
        const existingMaterial = await RawMaterial.findOne({ 
            name: rawMaterialData.name,
            isActive: true 
        });
        
        if (existingMaterial) {
            return res.status(409).json({
                success: false,
                message: 'Ya existe una materia prima con ese nombre'
            });
        }
        
        const rawMaterial = new RawMaterial(rawMaterialData);
        const savedRawMaterial = await rawMaterial.save();
        
        res.status(201).json({
            success: true,
            data: savedRawMaterial,
            message: 'Materia prima creada exitosamente'
        });
        
    } catch (error) {
        console.error('Error creando materia prima:', error);
        
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
};

// Actualizar materia prima
const updateRawMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const rawMaterial = await RawMaterial.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!rawMaterial) {
            return res.status(404).json({
                success: false,
                message: 'Materia prima no encontrada'
            });
        }
        
        res.json({
            success: true,
            data: rawMaterial,
            message: 'Materia prima actualizada exitosamente'
        });
        
    } catch (error) {
        console.error('Error actualizando materia prima:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'ID de materia prima no válido'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Eliminar materia prima
const deleteRawMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        
        const rawMaterial = await RawMaterial.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );
        
        if (!rawMaterial) {
            return res.status(404).json({
                success: false,
                message: 'Materia prima no encontrada'
            });
        }
        
        res.json({
            success: true,
            data: rawMaterial,
            message: 'Materia prima eliminada exitosamente'
        });
        
    } catch (error) {
        console.error('Error eliminando materia prima:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'ID de materia prima no válido'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Agregar stock
const addStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        
        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: 'La cantidad debe ser mayor a 0'
            });
        }
        
        const rawMaterial = await RawMaterial.findById(id);
        
        if (!rawMaterial) {
            return res.status(404).json({
                success: false,
                message: 'Materia prima no encontrada'
            });
        }
        
        await rawMaterial.addStock(quantity);
        
        res.json({
            success: true,
            data: rawMaterial,
            message: `Stock agregado exitosamente. Nuevo stock: ${rawMaterial.stock} ${rawMaterial.unit}`
        });
        
    } catch (error) {
        console.error('Error agregando stock:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

module.exports = {
    getAllRawMaterials,
    getRawMaterialById,
    createRawMaterial,
    updateRawMaterial,
    deleteRawMaterial,
    addStock
};