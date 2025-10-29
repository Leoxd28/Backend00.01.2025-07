#!/usr/bin/env bash
set -euo pipefail

# Crear
curl -s -X POST http://localhost:3000/api/todos   -H 'Content-Type: application/json'   -d '{"nombre":"Leche","descripcion":"Entera 1L","fecha":"2025-10-23"}' | jq .

# Pendientes
curl -s http://localhost:3000/api/todos/pending | jq .

# Completar (reemplaza ID por el _id real)
# curl -s -X PATCH http://localhost:3000/api/todos/ID/complete | jq .

# Completados
curl -s http://localhost:3000/api/todos/completed | jq .
