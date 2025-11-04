# 🚀 Hackatón Express Pro — 6 Horas

API modular con: middlewares, rutas versionadas, uploads, idempotencia, métricas y Swagger.

## Requisitos
- Node.js 18+

## Setup
```bash
npm install
cp .env.example .env
npm run dev
```

## Variables (.env)
- PORT=3000
- API_TOKEN=secret
- API_KEY=abc123
- RATE_LIMIT_WINDOW=60000   # ms
- RATE_LIMIT_MAX=100
- UPLOAD_DIR=uploads
- MAX_FILE_MB=2

## Endpoints clave
- GET  /api/health
- POST /api/data
- /api/v1/users     (GET, POST, GET/:id)
- /api/v1/orders    (GET – protegido x-token, POST – protegido x-token, GET /export – CSV)
- /api/v1/uploads/avatar  (POST imagen 2MB)
- /api/v1/payments        (POST con Idempotency-Key)
- GET /api/metrics
- GET /api/docs
- GET /api/stream (SSE)
