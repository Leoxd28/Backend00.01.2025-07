import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
export function setupSwagger(app) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: { title: 'Hackatón Express Pro', version: '1.0.0' }
    },
    apis: ['./src/routes/**/*.js']
  };
  const spec = swaggerJSDoc(options);
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(spec));
}
