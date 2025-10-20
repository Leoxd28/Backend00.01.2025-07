const express = require('express');
const router = express.Router();

const asyncMW = require('../middlewares/async');
const HttpError = require('../middlewares/httpError');
const requireJson = require('../middlewares/requireJson');
const { getMetrics } = require('../middlewares/metrics'); // Corregido: metrics en lugar de metricas

// Health check
router.get('/health', (req, res) => {
    res.json({ 
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Data endpoint que requiere JSON
router.post('/data', requireJson, (req, res) => {
    res.json({ 
        received: true,
        data: req.body,
        timestamp: new Date().toISOString()
    });
});

// Métricas endpoint
router.get('/metrics', (req, res) => {
    res.json(getMetrics());
});

// Server-Sent Events endpoint (Bonus)
router.get('/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    let tickCount = 0;
    const maxTicks = 5;
    
    const interval = setInterval(() => {
        tickCount++;
        const data = {
            tick: tickCount,
            timestamp: new Date().toISOString(),
            message: `Tick ${tickCount} of ${maxTicks}`
        };
        
        res.write(`data: ${JSON.stringify(data)}\n\n`);
        
        if (tickCount >= maxTicks) {
            clearInterval(interval);
            res.write('data: {"finished": true}\n\n');
            res.end();
        }
    }, 1000);
    
    // Cleanup si el cliente se desconecta
    req.on('close', () => {
        clearInterval(interval);
    });
});

// Test endpoint con manejo de errores async
router.get('/risky', asyncMW(async (req, res) => {
    const success = Math.random() > 0.5;
    if (!success) {
        throw new HttpError(503, "Servicio no disponible (Random)");
    }
    res.json({ success: true, message: "Lucky!" });
}));

// Rutas versionadas
router.use('/v1', require('./v1'));
router.use('/v2', require('./v2'));

// Swagger docs (en v1 por compatibilidad)
router.use('/docs', require('./v1/swagger.routes'));

module.exports = router;