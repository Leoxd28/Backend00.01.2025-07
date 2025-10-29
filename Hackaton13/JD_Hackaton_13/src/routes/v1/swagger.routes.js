const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger-output.json');

console.log('✅ Swagger cargado desde swagger-output.json');
console.log('📋 Paths disponibles:', Object.keys(swaggerDocument.paths || {}).length);

// Opciones de personalización para Swagger UI
const swaggerOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Demo Documentation',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'list',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true
  }
};

// Ruta para servir la documentación de Swagger UI
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument, swaggerOptions));

// Ruta para obtener el JSON de la especificación OpenAPI
router.get('/json', (req, res) => {
  res.json(swaggerDocument);
});

// Ruta para verificar el estado de Swagger
router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    pathsCount: Object.keys(swaggerDocument.paths || {}).length,
    schemasCount: Object.keys(swaggerDocument.components?.schemas || {}).length,
    host: swaggerDocument.host
  });
});

module.exports = router;