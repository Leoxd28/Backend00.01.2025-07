# Reto: NodeJS y MongoDB — Lista de Compras

Mini‑proyecto que cumple con los requisitos del reto:
- Crear **ruta para crear** ítems de la lista (Nombre, Descripción, Fecha, EsCompletado).
- Crear **ruta para mostrar los pendientes**.
- Crear **ruta para mostrar los completados**.
- Crear **ruta para completar** un ítem de la lista.

Incluye una **página web** simple (`/`) para probar rápidamente desde el navegador.

## Stack
- NodeJS 18+
- Express
- MongoDB + Mongoose

## Instalación
```bash
cp .env.example .env
npm i
npm run dev
# Abre http://localhost:3000
```

Configura `MONGO_URI` en `.env`. Por defecto usa `mongodb://127.0.0.1:27017/shopping_list`.

## Endpoints

### Crear ítem
`POST /api/todos`

Body (JSON):
```json
{
  "nombre": "Leche",
  "descripcion": "Entera 1L",
  "fecha": "2025-10-23"
}
```

### Listar pendientes
`GET /api/todos/pending`

### Listar completados
`GET /api/todos/completed`

### Completar un ítem
`PATCH /api/todos/:id/complete`

### Extra
`GET /api/todos` — lista todo (útil para depurar).

## cURL rápido
```bash
# crear
curl -s -X POST http://localhost:3000/api/todos \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Leche","descripcion":"Entera 1L","fecha":"2025-10-23"}'

# pendientes
curl -s http://localhost:3000/api/todos/pending

# completar (reemplaza :id)
curl -s -X PATCH http://localhost:3000/api/todos/ID/complete

# completados
curl -s http://localhost:3000/api/todos/completed
```

## Notas
- Validaciones de esquema en Mongoose (longitud mínima, `trim`).
- Índice en `esCompletado` para consultas rápidas.
- `completedAt` se setea al completar.
