Postman:

1. JWT:

POST http://localhost:3000/jwt/login { "email":"admin@demo.com","password":"Admin123!" }

GET http://localhost:3000/jwt/me con Authorization: Bearer <access>

POST http://localhost:3000/jwt/refresh (usa cookie)



2. Sesión:

GET http://localhost:3000/session/csrf
POST http://localhost:3000/session/login { "email":"admin@demo.com","password":"Admin123!" }

GET http://localhost:3000/session/me

POST http://localhost:3000/session/logout con header x-csrf-token del paso csrf
