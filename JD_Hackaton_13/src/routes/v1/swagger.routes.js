const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const fs = require('fs');

// Cargar el archivo openapi.yaml desde docs/
const yamlPath = path.join(__dirname, '../../../docs/openapi.yaml');

// Verificar que el archivo existe
if (!fs.existsSync(yamlPath)) {
  console.error('ERROR: No se encuentra el archivo openapi.yaml en', yamlPath);
  throw new Error('Archivo openapi.yaml no encontrado');
}

const swaggerDocument = YAML.load(yamlPath);

console.log('✅ Swagger cargado desde:', yamlPath);
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
    servers: swaggerDocument.servers
  });
});

module.exports = router;