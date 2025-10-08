# Hackathon Lista de Compras (NodeJS + MongoDB)

## Crea un archivo `.env` 

MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/
DB_NAME=SV73919694
PORT=5000

## Instala las dependencias:

npm install express mongodb dotenv nodemon

## Ejecuta

npm run dev


## Endpoints/post

POST    /api/items	                -Crea un nuevo item de la lista
GET 	/api/items/pendientes	    -Muestra los pendientes
GET  	/api/items/completados   	-Muestra los completados
PUT 	/api/items/:id/completar 	-Marca un item como completado