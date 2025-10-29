const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
  info: {
    title: 'API Demo',
    description: 'OpenAPI generado automáticamente sin JSDoc',
  },
  host: `localhost:${process.env.PORT}`,
  basePath: '/api/v1/users',
  schemes: ['http'],
  tags: [{ name: 'Todos', description: 'Operaciones de TODOs' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
  },
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./routes/v1/users.routes.js']; // Archivos a escanear

swaggerAutogen(outputFile, endpointsFiles, doc);
