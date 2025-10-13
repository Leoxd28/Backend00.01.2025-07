const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
    productionId: {
        type: String,
        unique: true,
        trim: true,
        default: function() {
            const now = new Date();
            const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
            const timeStr = now.toISOString().slice(11, 16).replace(/:/g, '');
            const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            return `PROD-${dateStr}-${timeStr}-${random}`;
        }
    },
    productType: {
        type: String,
        required: [true, 'El tipo de producto es obligatorio'],
        enum: ['armario_basico', 'armario_premium', 'armario_personalizado'],
        default: 'armario_basico'
    },
    quantityRequested: {
        type: Number,
        required: [true, 'La cantidad solicitada es obligatoria'],
        min: [1, 'La cantidad debe ser al menos 1']
    },
    quantityProduced: {
        type: Number,
        default: 0,
        min: [0, 'La cantidad producida no puede ser negativa']
    },
    status: {
        type: String,
        enum: ['planificado', 'en_progreso', 'completado', 'cancelado', 'pausado'],
        default: 'planificado'
    },
    requirements: {
        rawMaterials: [{
            materialId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'RawMaterial'
            },
            materialName: {
                type: String
            },
            quantityPerUnit: {
                type: Number,
                min: [0, 'La cantidad no puede ser negativa'],
                default: 1
            },
            totalRequired: {
                type: Number,
                min: [0, 'El total no puede ser negativo'],
                default: 0
            },
            totalUsed: {
                type: Number,
                default: 0,
                min: [0, 'El total usado no puede ser negativo']
            },
            unitPrice: {
                type: Number,
                min: [0, 'El precio no puede ser negativo'],
                default: 0
            }
        }],
        inputs: [{
            inputId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Input'
            },
            inputName: {
                type: String
            },
            quantityPerUnit: {
                type: Number,
                min: [0, 'La cantidad no puede ser negativa'],
                default: 0.25
            },
            totalRequired: {
                type: Number,
                min: [0, 'El total no puede ser negativo'],
                default: 0
            },
            totalUsed: {
                type: Number,
                default: 0,
                min: [0, 'El total usado no puede ser negativo']
            },
            unitPrice: {
                type: Number,
                min: [0, 'El precio no puede ser negativo'],
                default: 0
            }
        }],
        labor: {
            hoursPerUnit: {
                type: Number,
                min: [0.1, 'Las horas por unidad deben ser al menos 0.1'],
                default: 8
            },
            totalHoursRequired: {
                type: Number,
                min: [0, 'El total de horas no puede ser negativo'],
                default: 0
            },
            totalHoursUsed: {
                type: Number,
                default: 0,
                min: [0, 'El total de horas usado no puede ser negativo']
            }
        }
    },
    assignedStaff: [{
        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Staff'
        },
        staffName: {
            type: String
        },
        hoursAssigned: {
            type: Number,
            min: [0, 'Las horas asignadas no pueden ser negativas'],
            default: 0
        },
        hourlyRate: {
            type: Number,
            min: [0, 'La tarifa no puede ser negativa'],
            default: 0
        }
    }],
    costs: {
        rawMaterialsCost: {
            type: Number,
            default: 0,
            min: [0, 'El costo no puede ser negativo']
        },
        inputsCost: {
            type: Number,
            default: 0,
            min: [0, 'El costo no puede ser negativo']
        },
        laborCost: {
            type: Number,
            default: 0,
            min: [0, 'El costo no puede ser negativo']
        },
        totalCost: {
            type: Number,
            default: 0,
            min: [0, 'El costo total no puede ser negativo']
        }
    },
    timeline: {
        startDate: {
            type: Date,
            default: Date.now
        },
        estimatedEndDate: {
            type: Date
        },
        actualEndDate: {
            type: Date
        }
    }
}, {
    timestamps: true,
    versionKey: false
});

// Índices para optimización
productionSchema.index({ productionId: 1 }, { unique: true, sparse: true });
productionSchema.index({ status: 1 });
productionSchema.index({ createdAt: -1 });

// Método estático para buscar por productionId personalizado
productionSchema.statics.findByProductionId = function(productionId) {
    return this.findOne({ productionId: productionId });
};

// Virtual para progreso
productionSchema.virtual('progress').get(function() {
    if (this.quantityRequested === 0) return 0;
    return Math.round((this.quantityProduced / this.quantityRequested) * 100);
});

// Configurar toJSON
productionSchema.set('toJSON', { 
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

const Production = mongoose.model('Production', productionSchema);

module.exports = Production;