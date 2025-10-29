const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del insumo es obligatorio'],
        trim: true,
        maxlength: [100, 'El nombre no puede exceder 100 caracteres']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'La descripción no puede exceder 500 caracteres']
    },
    type: {
        type: String,
        required: [true, 'El tipo de insumo es obligatorio'],
        enum: ['clavos', 'tornillos', 'goma', 'pintura', 'barniz', 'lija', 'bisagras', 'tiradores', 'otro'],
        default: 'otro'
    },
    unit: {
        type: String,
        required: [true, 'La unidad de medida es obligatoria'],
        enum: ['unidad', 'kilogramo', 'gramo', 'litro', 'mililitro', 'metro', 'centimetro', 'paquete'],
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
    specifications: {
        size: {
            type: String,
            trim: true
        },
        color: {
            type: String,
            trim: true
        },
        material: {
            type: String,
            trim: true
        },
        brand: {
            type: String,
            trim: true
        }
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
inputSchema.index({ name: 1 });
inputSchema.index({ type: 1 });
inputSchema.index({ stock: 1 });

// Virtual para verificar stock bajo
inputSchema.virtual('isLowStock').get(function() {
    return this.stock <= this.minimumStock;
});

// Virtual para valor total del stock
inputSchema.virtual('totalStockValue').get(function() {
    return this.stock * this.unitPrice;
});

// Método para reducir stock
inputSchema.methods.reduceStock = function(quantity) {
    if (this.stock < quantity) {
        throw new Error(`Stock insuficiente de ${this.name}. Disponible: ${this.stock} ${this.unit}, Requerido: ${quantity} ${this.unit}`);
    }
    this.stock -= quantity;
    return this.save();
};

// Método para agregar stock
inputSchema.methods.addStock = function(quantity) {
    this.stock += quantity;
    return this.save();
};

// Middleware pre-save
inputSchema.pre('save', function(next) {
    if (this.isModified('stock') && this.stock < 0) {
        return next(new Error('El stock no puede ser negativo'));
    }
    next();
});

// Método estático para buscar por tipo
inputSchema.statics.findByType = function(type) {
    return this.find({ type, isActive: true });
};

// Método estático para buscar insumos con stock bajo
inputSchema.statics.findLowStock = function() {
    return this.find({
        $expr: { $lte: ['$stock', '$minimumStock'] },
        isActive: true
    });
};

// Configurar toJSON para incluir virtuals
inputSchema.set('toJSON', { 
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

const Input = mongoose.model('Input', inputSchema);

module.exports = Input;