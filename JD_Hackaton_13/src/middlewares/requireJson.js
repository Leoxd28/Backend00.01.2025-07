/**
 * Middleware que requiere Content-Type: application/json para métodos específicos
 */
function requireJson(req, res, next) {
    // Solo aplicar a métodos que típicamente requieren JSON
    const methodsRequiringJson = ['POST', 'PUT', 'PATCH'];
    
    if (methodsRequiringJson.includes(req.method)) {
        const contentType = req.get('Content-Type');
        
        // Check if Content-Type header is present and contains application/json
        if (!contentType || !contentType.includes('application/json')) {
            return res.status(400).json({
                error: 'Bad Request',
                message: `Content-Type debe ser 'application/json' para ${req.method} requests`,
                received: contentType || 'none',
                expected: 'application/json',
                hint: 'Agregar header: Content-Type: application/json'
            });
        }
    }
    
    next();
}

module.exports = requireJson;