/**
 * Middleware condicional para logging (Bonus Feature)
 * Solo registra métodos POST y PUT
 */
function conditionalLogger(req, res, next) {
    if (['POST', 'PUT'].includes(req.method)) {
        const timestamp = new Date().toISOString();
        const ip = req.ip || req.connection.remoteAddress;
        const userAgent = req.get('User-Agent') || 'Unknown';
        
        console.log(`\n🔄 [CONDITIONAL LOG] ${timestamp}`);
        console.log(`📝 Method: ${req.method}`);
        console.log(`🌐 URL: ${req.originalUrl}`);
        console.log(`💻 IP: ${ip}`);
        console.log(`🔧 User-Agent: ${userAgent}`);
        
        // Loggear headers importantes
        const importantHeaders = ['content-type', 'x-token', 'x-api-key', 'idempotency-key'];
        const headers = {};
        importantHeaders.forEach(header => {
            if (req.get(header)) {
                headers[header] = header === 'x-token' || header === 'x-api-key' 
                    ? '***hidden***' 
                    : req.get(header);
            }
        });
        
        if (Object.keys(headers).length > 0) {
            console.log(`📋 Headers:`, headers);
        }
        
        // Loggear body (sin información sensible)
        if (req.body && Object.keys(req.body).length > 0) {
            const safeBody = { ...req.body };
            // Ocultar campos sensibles
            ['password', 'token', 'secret', 'key'].forEach(field => {
                if (safeBody[field]) {
                    safeBody[field] = '***hidden***';
                }
            });
            console.log(`📄 Body:`, JSON.stringify(safeBody, null, 2));
        }
        
        console.log(`${'─'.repeat(50)}`);
        
        // Medir tiempo de respuesta
        const startTime = Date.now();
        
        const originalSend = res.send;
        res.send = function(data) {
            const duration = Date.now() - startTime;
            console.log(`⏱️  [RESPONSE TIME] ${req.method} ${req.originalUrl} - ${duration}ms - Status: ${res.statusCode}`);
            return originalSend.call(this, data);
        };
    }
    
    next();
}

module.exports = conditionalLogger;