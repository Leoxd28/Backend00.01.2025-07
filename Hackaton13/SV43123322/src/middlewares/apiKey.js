/**
 * Middleware para autenticación con API Key (Bonus Feature)
 */
function requireApiKey(req, res, next) {
    const apiKey = req.get('x-api-key');
    const validApiKeys = process.env.API_KEYS?.split(',') || [
        'dev-key-123', 
        'prod-key-456',
        'hackaton-key-789'
    ];
    
    if (!apiKey) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'API key required in x-api-key header',
            hint: 'Use: dev-key-123 for development',
            timestamp: new Date().toISOString()
        });
    }
    
    if (!validApiKeys.includes(apiKey)) {
        return res.status(401).json({
            error: 'Unauthorized', 
            message: 'Invalid API key',
            timestamp: new Date().toISOString()
        });
    }
    
    req.apiKey = apiKey;
    next();
}

/**
 * Middleware opcional para API Key
 */
function optionalApiKey(req, res, next) {
    const apiKey = req.get('x-api-key');
    if (apiKey) {
        const validApiKeys = process.env.API_KEYS?.split(',') || ['dev-key-123', 'prod-key-456'];
        if (validApiKeys.includes(apiKey)) {
            req.apiKey = apiKey;
            req.authenticated = true;
        }
    }
    next();
}

module.exports = {
    requireApiKey,
    optionalApiKey
};