const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        maxlength: [50, 'El nombre no puede exceder 50 caracteres']
    },
    lastName: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        trim: true,
        maxlength: [50, 'El apellido no puede exceder 50 caracteres']
    },
    employeeId: {
        type: String,
        required: [true, 'El ID de empleado es obligatorio'],
        unique: true,
        trim: true,
        maxlength: [20, 'El ID de empleado no puede exceder 20 caracteres']
    },
    position: {
        type: String,
        required: [true, 'El cargo es obligatorio'],
        enum: ['carpintero', 'ayudante', 'supervisor', 'jefe_produccion', 'otro'],
        default: 'carpintero'
    },
    skillLevel: {
        type: String,
        required: [true, 'El nivel de habilidad es obligatorio'],
        enum: ['principiante', 'intermedio', 'avanzado', 'experto'],
        default: 'intermedio'
    },
    weeklyHours: {
        type: Number,
        required: [true, 'Las horas semanales son obligatorias'],
        min: [1, 'Las horas semanales deben ser al menos 1'],
        max: [60, 'Las horas semanales no pueden exceder 60'],
        default: 40
    },
    availableHours: {
        type: Number,
        required: [true, 'Las horas disponibles son obligatorias'],
        min: [0, 'Las horas disponibles no pueden ser negativas'],
        default: 40
    },
    hourlyRate: {
        type: Number,
        required: [true, 'La tarifa por hora es obligatoria'],
        min: [0, 'La tarifa por hora no puede ser negativa']
    },
    contact: {
        phone: {
            type: String,
            trim: true,
            maxlength: [20, 'El teléfono no puede exceder 20 caracteres']
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            maxlength: [100, 'El email no puede exceder 100 caracteres'],
            validate: {
                validator: function(v) {
                    return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: 'Email no válido'
            }
        },
        address: {
            type: String,
            trim: true,
            maxlength: [200, 'La dirección no puede exceder 200 caracteres']
        }
    },
    hireDate: {
        type: Date,
        required: [true, 'La fecha de contratación es obligatoria'],
        default: Date.now
    },
    specialties: [{
        type: String,
        enum: ['corte_madera', 'ensamblaje', 'lijado', 'pintado', 'barnizado', 'instalacion_herrajes'],
        trim: true
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    performance: {
        efficiency: {
            type: Number,
            min: [0.1, 'La eficiencia debe ser al menos 0.1'],
            max: [2.0, 'La eficiencia no puede exceder 2.0'],
            default: 1.0
        },
        qualityScore: {
            type: Number,
            min: [1, 'La puntuación de calidad debe ser al menos 1'],
            max: [10, 'La puntuación de calidad no puede exceder 10'],
            default: 8
        }
    }
}, {
    timestamps: true,
    versionKey: false
});

// Índices
staffSchema.index({ employeeId: 1 }, { unique: true });
staffSchema.index({ position: 1 });
staffSchema.index({ isActive: 1 });

// Virtual para nombre completo
staffSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Virtual para verificar disponibilidad
staffSchema.virtual('isAvailable').get(function() {
    return this.availableHours > 0 && this.isActive;
});

// Virtual para calcular experiencia en años
staffSchema.virtual('experienceYears').get(function() {
    const now = new Date();
    const hire = new Date(this.hireDate);
    return Math.floor((now - hire) / (365.25 * 24 * 60 * 60 * 1000));
});

// Método para asignar horas de trabajo
staffSchema.methods.assignHours = function(hours) {
    if (this.availableHours < hours) {
        throw new Error(`Horas insuficientes para ${this.fullName}. Disponibles: ${this.availableHours}, Requeridas: ${hours}`);
    }
    this.availableHours -= hours;
    return this.save();
};

// Método para restaurar horas (al inicio de semana)
staffSchema.methods.resetWeeklyHours = function() {
    this.availableHours = this.weeklyHours;
    return this.save();
};

// Método para calcular horas efectivas considerando eficiencia
staffSchema.methods.getEffectiveHours = function(requestedHours) {
    return requestedHours / this.performance.efficiency;
};

// Middleware pre-save
staffSchema.pre('save', function(next) {
    if (this.isModified('availableHours') && this.availableHours < 0) {
        return next(new Error('Las horas disponibles no pueden ser negativas'));
    }
    
    if (this.isModified('availableHours') && this.availableHours > this.weeklyHours) {
        this.availableHours = this.weeklyHours;
    }
    
    next();
});

// Método estático para buscar por cargo
staffSchema.statics.findByPosition = function(position) {
    return this.find({ position, isActive: true });
};

// Método estático para buscar personal disponible
staffSchema.statics.findAvailable = function(minimumHours = 0) {
    return this.find({
        availableHours: { $gte: minimumHours },
        isActive: true
    });
};

// Método estático para buscar carpinteros
staffSchema.statics.findCarpinteros = function() {
    return this.find({ 
        position: 'carpintero',
        isActive: true 
    });
};

// Configurar toJSON para incluir virtuals
staffSchema.set('toJSON', { 
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;