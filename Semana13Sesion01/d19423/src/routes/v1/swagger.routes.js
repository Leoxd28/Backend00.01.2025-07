const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const express = require('express');
const router = express.Router();
// Definición OpenAPI con swagger-jsdoc (escanea tus archivos con JSDoc)
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'API Demo',
      version: '1.0.0',
      description: 'API de ejemplo documentada con OpenAPI 3.1 + Swagger UI',
    },
    servers: [{ url: `http://localhost:${process.env.PORT}` }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        // apiKey: { type: 'apiKey', in: 'header', name: 'x-api-key' }
      },
      schemas: {
        Todo: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            done: { type: 'boolean' }
          },
          required: ['title']
        }
      }
    }
  },
  apis: [__dirname + '/users.routes.js'], // Archivos a escanear para comentarios JSDoc
});

console.log(__dirname)
router.get('/docs.json', (_req, res) => res.json(swaggerSpec));

// Swagger UI
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;