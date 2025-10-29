# Express Pro API - Hackaton 13

API REST modular desarrollada con Express.js que implementa middlewares personalizados, rutas versionadas, validaciones robustas, upload de archivos, endpoints idempotentes y documentación Swagger profesional.

## 🚀 Características Implementadas

### ✅ Fase 1: Estructura y Middlewares
- **Estructura modular**: `src/app.js`, `server.js`, `routes/`, `middlewares/`
- **Middleware logger**: Muestra método, ruta y duración de requests
- **Middleware requireJson**: Bloquea requests sin `Content-Type: application/json`
- **ErrorHandler global**: Manejo avanzado de errores async
- **Middlewares de seguridad**: helmet, cors, compression, morgan, express-rate-limit

### ✅ Fase 2: Rutas y Validaciones
- **Rutas versionadas**: `/api/v1/` y `/api/v2/` con Express Router
- **Endpoints con validaciones**: Params, query y body validation
- **Protección con headers**: Autenticación con `x-token` y `x-api-key`
- **Paginación y filtros**: Para listados de usuarios y órdenes

### ✅ Fase 3: Uploads, Idempotencia y Métricas
- **Upload de archivos**: Multer para imágenes (máx. 2MB)
- **Endpoints idempotentes**: Pagos con `Idempotency-Key`
- **Sistema de métricas**: Tiempo real de performance de la API
- **Documentación Swagger**: Completa y navegable

### ✅ Funcionalidades Bonus
- **Autenticación API Key**: Header `x-api-key`
- **Logging condicional**: Solo para POST y PUT
- **Server-Sent Events**: Endpoint `/api/stream` con 5 ticks

## 📋 Requisitos Previos

- Node.js >= 16.0.0
- npm >= 8.0.0

## 🛠️ Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
```

## 🌐 Endpoints Disponibles

### 🔍 Health & Monitoring
- `GET /api/health` - Health check del servidor
- `GET /api/metrics` - Métricas detalladas de la API
- `GET /api/stream` - Server-Sent Events (5 ticks/segundo)

### 📊 Data
- `POST /api/data` - Endpoint que requiere JSON (Content-Type validation)

### 👥 Users (v1)
- `GET /api/v1/users` - Lista usuarios con paginación y búsqueda
- `POST /api/v1/users` - Crear usuario (valida name, email)
- `GET /api/v1/users/:id` - Obtener usuario por ID
- `PUT /api/v1/users/:id` - Actualizar usuario

### 📦 Orders (v1) - *Requiere autenticación*
- `GET /api/v1/orders` - Lista órdenes (paginación, filtros, ordenamiento)
- `POST /api/v1/orders` - Crear orden (valida items[], customerId)
- `GET /api/v1/orders/export` - Exportar órdenes en CSV streaming

### 📤 Uploads
- `POST /api/v1/uploads/avatar` - Subir avatar (máx. 2MB, solo imágenes)

### 💳 Payments - *Idempotente*
- `POST /api/v1/payments` - Procesar pago (requiere Idempotency-Key)

### 📚 Documentation
- `GET /api/docs` - Swagger UI interactivo
- `GET /api/docs.json` - Especificación OpenAPI en JSON

## 🔐 Autenticación y Headers

### Para endpoints de Orders:
```http
x-token: secret
```

### Para endpoints protegidos con API Key:
```http
x-api-key: dev-key-123
```

### Para operaciones idempotentes:
```http
x-token: secret
Idempotency-Key: unique-key-123
```

### Para uploads y JSON requests:
```http
Content-Type: application/json
Content-Type: multipart/form-data (solo uploads)
```

## 📝 Ejemplos de Uso

### 1. Crear Usuario
```bash
curl -X POST http://localhost:8080/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Juan Pérez", "email": "juan@email.com"}'
```

### 2. Listar Órdenes con Filtros
```bash
curl -X GET "http://localhost:8080/api/v1/orders?page=1&limit=5&status=pending&sort=-id" \
  -H "x-token: secret"
```

### 3. Subir Avatar
```bash
curl -X POST http://localhost:8080/api/v1/uploads/avatar \
  -H "x-token: secret" \
  -F "avatar=@imagen.jpg"
```

### 4. Procesar Pago Idempotente
```bash
curl -X POST http://localhost:8080/api/v1/payments \
  -H "Content-Type: application/json" \
  -H "x-token: secret" \
  -H "Idempotency-Key: payment-123456" \
  -d '{"amount": 100.50, "currency": "USD", "customerId": 456}'
```

### 5. Ver Métricas
```bash
curl -X GET http://localhost:8080/api/metrics
```

### 6. Stream SSE
```bash
curl -X GET http://localhost:8080/api/stream
```

## 📊 Métricas Disponibles

El endpoint `/api/metrics` proporciona:
- **Server**: Uptime, tiempo de inicio
- **Requests**: Total, requests por segundo
- **Errors**: Total de errores, tasa de error, errores por código de estado
- **Routes**: Estadísticas por ruta (count, tiempo promedio, códigos de estado)
- **Memory**: Uso de memoria del proceso Node.js

## 🗂️ Estructura del Proyecto

```
JD_Hackaton_13/
├── server.js                     # Punto de entrada
├── src/
│   ├── app.js                    # Configuración principal de Express
│   ├── swagger.js                # Configuración de Swagger
│   ├── middlewares/              # Middlewares personalizados
│   │   ├── async.js              # Wrapper para funciones async
│   │   ├── errorHandler.js       # Manejo global de errores
│   │   ├── httpError.js          # Clase para errores HTTP
│   │   ├── logger.js             # Logger personalizado
│   │   ├── requireJson.js        # Validación Content-Type
│   │   ├── apiKey.js             # Autenticación API Key
│   │   ├── metrics.js            # Recolección de métricas
│   │   ├── conditionalLogger.js  # Logging condicional
│   │   └── validates.js          # Validaciones de datos
│   └── routes/                   # Rutas modulares
│       ├── index.js              # Rutas principales
│       ├── v1/                   # API versión 1
│       │   ├── index.js
│       │   ├── users.routes.js
│       │   ├── orders.routes.js
│       │   └── swagger.routes.js
│       └── v2/                   # API versión 2
│           ├── index.js
│           └── users.routes.js
├── uploads/                      # Archivos subidos
├── docs/                         # Documentación
│   └── openapi.yaml             # Especificación OpenAPI
├── postman/                      # Colección Postman
│   └── Express_Pro_API.postman_collection.json
├── .env.sample                   # Variables de entorno ejemplo
├── package.json
└── README.md
```

## 🔧 Variables de Entorno

Crear archivo `.env` basado en `.env.sample`:

```env
PORT=8080
NODE_ENV=development
ORIGINS=http://localhost:3000,http://localhost:3001
API_KEYS=dev-key-123,prod-key-456
VALID_TOKENS=secret,dev-token,test-token
```

## 📚 Documentación Swagger

Accede a la documentación interactiva en:
- **Swagger UI**: http://localhost:8080/api/docs
- **OpenAPI JSON**: http://localhost:8080/api/docs.json

## 🧪 Testing

### Con cURL:
Ver ejemplos arriba

### Con Postman:
Importar la colección incluida en `postman/Express_Pro_API.postman_collection.json`

### Con el navegador:
- Health: http://localhost:8080/api/health
- Métricas: http://localhost:8080/api/metrics
- Swagger: http://localhost:8080/api/docs

## 🏆 Criterios del Desafío Cumplidos

- ✅ **Funcionalidad completa**: Todos los endpoints implementados
- ✅ **Estructura y modularidad**: Código limpio, routers separados
- ✅ **Manejo de errores y seguridad**: Validaciones, idempotencia, headers
- ✅ **Documentación Swagger**: Navegable y actualizada
- ✅ **Originalidad/Bonus**: SSE, métricas avanzadas, logging condicional

## 📄 Licencia

MIT License - ver archivo LICENSE para más detalles.

---

**Desarrollado para Hackaton 13 - Express Pro Challenge**