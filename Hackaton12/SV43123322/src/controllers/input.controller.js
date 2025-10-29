const Input = require('../models/Input');

// Obtener todos los insumos
const getAllInputs = async (req, res) => {
    try {
        const { type, lowStock, isActive = true } = req.query;
        let filter = { isActive: isActive === 'true' };
        
        if (type) {
            filter.type = type;
        }
        
        let inputs;
        if (lowStock === 'true') {
            inputs = await Input.findLowStock();
        } else {
            inputs = await Input.find(filter).sort({ name: 1 });
        }
        
        res.json({
            success: true,
            count: inputs.length,
            data: inputs,
            message: 'Insumos obtenidos exitosamente'
        });
        
    } catch (error) {
        console.error('Error obteniendo insumos:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Obtener insumo por ID
const getInputById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const input = await Input.findById(id);
        
        if (!input) {
            return res.status(404).json({
                success: false,
                message: 'Insumo no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: input,
            message: 'Insumo obtenido exitosamente'
        });
        
    } catch (error) {
        console.error('Error obteniendo insumo:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'ID de insumo no válido'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Crear nuevo insumo
const createInput = async (req, res) => {
    try {
        const inputData = req.body;
        
        // Verificar si ya existe un insumo con el mismo nombre
        const existingInput = await Input.findOne({ 
            name: inputData.name,
            isActive: true 
        });
        
        if (existingInput) {
            return res.status(409).json({
                success: false,
                message: 'Ya existe un insumo con ese nombre'
            });
        }
        
        const input = new Input(inputData);
        const savedInput = await input.save();
        
        res.status(201).json({
            success: true,
            data: savedInput,
            message: 'Insumo creado exitosamente'
        });
        
    } catch (error) {
        console.error('Error creando insumo:', error);
        
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

// Actualizar insumo
const updateInput = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const input = await Input.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!input) {
            return res.status(404).json({
                success: false,
                message: 'Insumo no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: input,
            message: 'Insumo actualizado exitosamente'
        });
        
    } catch (error) {
        console.error('Error actualizando insumo:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'ID de insumo no válido'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Eliminar insumo
const deleteInput = async (req, res) => {
    try {
        const { id } = req.params;
        
        const input = await Input.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );
        
        if (!input) {
            return res.status(404).json({
                success: false,
                message: 'Insumo no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: input,
            message: 'Insumo eliminado exitosamente'
        });
        
    } catch (error) {
        console.error('Error eliminando insumo:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'ID de insumo no válido'
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
        
        const input = await Input.findById(id);
        
        if (!input) {
            return res.status(404).json({
                success: false,
                message: 'Insumo no encontrado'
            });
        }
        
        await input.addStock(quantity);
        
        res.json({
            success: true,
            data: input,
            message: `Stock agregado exitosamente. Nuevo stock: ${input.stock} ${input.unit}`
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
    getAllInputs,
    getInputById,
    createInput,
    updateInput,
    deleteInput,
    addStock
};