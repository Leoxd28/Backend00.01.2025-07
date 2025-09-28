**Inicializacion**
# npm init -y
# npm install express sequelize mysql2 dotenv

**Crear archivo .env**
DB_NAME=hackaton10
DB_USER=root
DB_PASS=tu_contraseña_mysql
DB_HOST=localhost
DB_SYNC=alter
PORT=3000
**Crear database**
# CREATE DATABASE hackaton10 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
**Correr la seed**
# npm run seed
**Correr servidor**
npm run dev
**Pruebas los endpoints**
importar en postman el archivo postman_collection.json
# Selecciona el archivo docs/postman_collection.json
# endpoints
POST /users

GET /courses

POST /courses/:id/enroll

POST /lessons/:id/comments

Leonardo A20101158