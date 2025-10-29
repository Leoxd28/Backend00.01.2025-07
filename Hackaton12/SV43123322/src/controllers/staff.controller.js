const Staff = require('../models/Staff');

// Obtener todo el personal
const getAllStaff = async (req, res) => {
    try {
        const { position, minimumHours, isActive = true } = req.query;
        let filter = { isActive: isActive === 'true' };
        
        if (position) {
            filter.position = position;
        }
        
        if (minimumHours) {
            filter.availableHours = { $gte: parseInt(minimumHours) };
        }
        
        const staff = await Staff.find(filter).sort({ lastName: 1, firstName: 1 });
        
        res.json({
            success: true,
            count: staff.length,
            data: staff,
            message: 'Personal obtenido exitosamente'
        });
        
    } catch (error) {
        console.error('Error obteniendo personal:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Obtener personal por ID
const getStaffById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const staff = await Staff.findById(id);
        
        if (!staff) {
            return res.status(404).json({
                success: false,
                message: 'Personal no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: staff,
            message: 'Personal obtenido exitosamente'
        });
        
    } catch (error) {
        console.error('Error obteniendo personal:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'ID de personal no válido'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Crear nuevo personal
const createStaff = async (req, res) => {
    try {
        const staffData = req.body;
        
        // Verificar si ya existe personal con el mismo employeeId
        const existingStaff = await Staff.findOne({ 
            employeeId: staffData.employeeId 
        });
        
        if (existingStaff) {
            return res.status(409).json({
                success: false,
                message: 'Ya existe personal con ese ID de empleado'
            });
        }
        
        const staff = new Staff(staffData);
        const savedStaff = await staff.save();
        
        res.status(201).json({
            success: true,
            data: savedStaff,
            message: 'Personal creado exitosamente'
        });
        
    } catch (error) {
        console.error('Error creando personal:', error);
        
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

// Actualizar personal
const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const staff = await Staff.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!staff) {
            return res.status(404).json({
                success: false,
                message: 'Personal no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: staff,
            message: 'Personal actualizado exitosamente'
        });
        
    } catch (error) {
        console.error('Error actualizando personal:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'ID de personal no válido'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Eliminar personal
const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        
        const staff = await Staff.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );
        
        if (!staff) {
            return res.status(404).json({
                success: false,
                message: 'Personal no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: staff,
            message: 'Personal eliminado exitosamente'
        });
        
    } catch (error) {
        console.error('Error eliminando personal:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'ID de personal no válido'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Resetear horas semanales
const resetHours = async (req, res) => {
    try {
        const { id } = req.params;
        
        const staff = await Staff.findById(id);
        
        if (!staff) {
            return res.status(404).json({
                success: false,
                message: 'Personal no encontrado'
            });
        }
        
        await staff.resetWeeklyHours();
        
        res.json({
            success: true,
            data: staff,
            message: `Horas reseteadas exitosamente. Horas disponibles: ${staff.availableHours}`
        });
        
    } catch (error) {
        console.error('Error reseteando horas:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

module.exports = {
    getAllStaff,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff,
    resetHours
};