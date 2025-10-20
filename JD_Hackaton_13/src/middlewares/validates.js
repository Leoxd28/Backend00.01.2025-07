/**
 * Validaciones para diferentes endpoints
 */

// Validar creación de usuario
function dtoCreateUser(req, res, next) {
    const { name, email } = req.body;
    const errors = [];
    
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        errors.push('name: debe ser un string de al menos 2 caracteres');
    }
    
    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
        errors.push('email: debe ser un email válido');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Los datos enviados no son válidos',
            details: errors
        });
    }
    
    // Sanitizar datos
    req.body.name = name.trim();
    req.body.email = email.toLowerCase().trim();
    
    next();
}

// Validar creación de orden
function dtoCreateOrder(req, res, next) {
    const { items, customerId } = req.body;
    const errors = [];
    
    if (!Array.isArray(items) || items.length === 0) {
        errors.push('items: debe ser un array no vacío');
    } else if (items.some(item => typeof item !== 'string' || item.trim().length === 0)) {
        errors.push('items: todos los elementos deben ser strings no vacíos');
    }
    
    if (!customerId || !Number.isInteger(customerId) || customerId <= 0) {
        errors.push('customerId: debe ser un número entero positivo');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Los datos de la orden no son válidos',
            details: errors
        });
    }
    
    next();
}

// Validar ID de usuario
function validateUserId(req, res, next) {
    const id = req.params.id;
    const userId = parseInt(id);
    
    if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'ID de usuario debe ser un número entero positivo',
            received: id
        });
    }
    
    next();
}

// Validar token de autenticación
function validateToken(req, res, next) {
    const token = req.get('x-token');
    const validTokens = process.env.VALID_TOKENS?.split(',') || ['secret', 'dev-token', 'test-token'];
    
    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Header x-token es requerido para acceder a este endpoint'
        });
    }
    
    if (!validTokens.includes(token)) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Token inválido',
            validTokens: ['secret'] // Solo mostrar uno por seguridad
        });
    }
    
    req.token = token;
    next();
}

// Función auxiliar para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = {
    dtoCreateUser,
    dtoCreateOrder,
    validateUserId,
    validateToken
};