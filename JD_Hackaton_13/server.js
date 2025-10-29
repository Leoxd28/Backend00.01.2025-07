const app = require('./src/app');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Documentación Swagger: http://localhost:${PORT}/api/v1/swagger/docs`);
  console.log(`📊 Métricas: http://localhost:${PORT}/api/metrics`);
  console.log(`🔄 Stream SSE: http://localhost:${PORT}/api/stream`);
});