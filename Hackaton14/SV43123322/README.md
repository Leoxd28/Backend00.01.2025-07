# Hackatón 14 — Autenticación y Sesiones en Express

Implementa:
- Sesión + Cookies seguras (express-session + MongoStore)
- JWT access + refresh con rotación/revocación
- RBAC (admin/user)
- Seguridad: helmet, rate limit, SameSite/HttpOnly/Secure, CSRF (solo sesión), session fixation
- Pruebas básicas (supertest)

## Requisitos
- Node.js 18+
- MongoDB Atlas/Compass
- Variables de entorno

## Configuración
1) Copia `.env.sample` a `.env` y ajusta:
- SESSION_SECRET, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET
- DATABASE_URL (ejemplo Atlas provisto):
  `mongodb+srv://jhoden2005_db_user:OaTGcs8NLhygravS@cluster0.pgxffcl.mongodb.net/`
- DATABASE_NAME (por defecto: `hackathon14`)

2) Instala dependencias:
```
npm i
```

3) Ejecuta:
```
npm run dev
```

Se seedearán usuarios:
- admin@demo.com / Admin123! (admin)
- user@demo.com / User123! (user)

## Endpoints
- Sesión:
  - GET /session/csrf
  - POST /session/login
  - GET /session/me
  - POST /session/logout (requiere header `x-csrf-token`)
  - POST /session/x-form (demo CSRF)
- JWT:
  - POST /jwt/login
  - POST /jwt/refresh
  - POST /jwt/logout
  - GET /jwt/me (Bearer)
- Privados:
  - GET /private/profile (sesión o JWT)
  - GET /admin/stats (admin)
- Utilidad:
  - GET /health

## Seguridad
- Cookies: HttpOnly + SameSite=Lax, `secure` en producción
- Session fixation: `req.session.regenerate()` en login
- CSRF: token HMAC(sessionID, CSRF_SECRET) sólo para flujo sesión/form
- Rate limit: 100 req/15m global, 20 req/15m en `/session/login` y `/jwt/login`
- CORS restringido por `CORS_ORIGINS`
- `trust proxy` habilitado en producción

## Pruebas
```
npm test
```
Incluye smoke básico. Se recomienda colección Postman con casos:
- Login éxito/fracaso (sesión/JWT)
- /me con/sin auth
- Admin 403 sin rol adecuado
- Refresh válido/revocado
- CSRF correcto/incorrecto (usar GET /session/csrf)

## Diagrama (resumen)
Sesión:
Client -> POST /session/login -> [Express-session + MongoStore] -> Set-Cookie sid -> GET /session/me

JWT:
Client -> POST /jwt/login -> access (JSON) + refresh (cookie HttpOnly) -> GET /jwt/me (Bearer)
Refresh: POST /jwt/refresh -> rota refresh y emite nuevo access
Logout: /jwt/logout -> revoca refresh + (opcional) blacklist de access