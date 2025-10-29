const mongoose = require('mongoose');

const rawMaterialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la materia prima es obligatorio'],
        trim: true,
        maxlength: [100, 'El nombre no puede exceder 100 caracteres']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'La descripción no puede exceder 500 caracteres']
    },
    unit: {
        type: String,
        required: [true, 'La unidad de medida es obligatoria'],
        enum: ['unidad', 'kilogramo', 'metro', 'litro', 'gramo', 'metro cuadrado'],
        default: 'unidad'
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        min: [0, 'El stock no puede ser negativo'],
        default: 0
    },
    minimumStock: {
        type: Number,
        required: [true, 'El stock mínimo es obligatorio'],
        min: [0, 'El stock mínimo no puede ser negativo'],
        default: 1
    },
    unitPrice: {
        type: Number,
        required: [true, 'El precio unitario es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    supplier: {
        name: {
            type: String,
            required: [true, 'El nombre del proveedor es obligatorio'],
            trim: true
        },
        contact: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        }
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: ['madera', 'metal', 'plastico', 'textil', 'quimico', 'otro'],
        default: 'otro'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

// Índices
rawMaterialSchema.index({ name: 1 });
rawMaterialSchema.index({ category: 1 });
rawMaterialSchema.index({ stock: 1 });

// Virtual para verificar stock bajo
rawMaterialSchema.virtual('isLowStock').get(function() {
    return this.stock <= this.minimumStock;
});

// Virtual para valor total del stock
rawMaterialSchema.virtual('totalStockValue').get(function() {
    return this.stock * this.unitPrice;
});

// Método para reducir stock
rawMaterialSchema.methods.reduceStock = function(quantity) {
    if (this.stock < quantity) {
        throw new Error(`Stock insuficiente. Disponible: ${this.stock}, Requerido: ${quantity}`);
    }
    this.stock -= quantity;
    return this.save();
};

// Método para agregar stock
rawMaterialSchema.methods.addStock = function(quantity) {
    this.stock += quantity;
    return this.save();
};

// Middleware pre-save
rawMaterialSchema.pre('save', function(next) {
    if (this.isModified('stock') && this.stock < 0) {
        return next(new Error('El stock no puede ser negativo'));
    }
    next();
});

// Método estático para buscar por categoría
rawMaterialSchema.statics.findByCategory = function(category) {
    return this.find({ category, isActive: true });
};

// Método estático para buscar materiales con stock bajo
rawMaterialSchema.statics.findLowStock = function() {
    return this.find({
        $expr: { $lte: ['$stock', '$minimumStock'] },
        isActive: true
    });
};

// Configurar toJSON para incluir virtuals
rawMaterialSchema.set('toJSON', { 
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

const RawMaterial = mongoose.model('RawMaterial', rawMaterialSchema);

module.exports = RawMaterial;