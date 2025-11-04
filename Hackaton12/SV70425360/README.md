# Armarios + Mongoose (Reto)

Proyecto base para la empresa de producción de armarios.

## Requisitos
- Node.js 18+
- MongoDB en local (o Atlas)

## Instalación
```bash
npm install
cp .env.example .env
# Edita .env con tu código de alumno en el nombre de BD
```

## Scripts
- `npm run dev` arranca el servidor con recarga
- `npm start` arranca el servidor
- `npm run seed` carga datos demo
- `npm run reset` limpia la base

## Endpoints (principales)
- `POST /api/compras` registrar compra
- `GET  /api/inventario/stock` resumen de stock
- `POST /api/produccion/op` iniciar orden (OP)
- `POST /api/produccion/op/:id/terminar` terminar OP
- `POST /api/rrhh/horas` registrar horas
- `GET  /api/analitica/capacidad` capacidad máxima producible
- `GET  /api/analitica/costo-unitario` costo unitario estimado

## Notas
- BOM por armario: **1 tablón**, **0.25 kg de goma**, **8 HH**.
- Si necesitas transacciones, habilita un *replica set*.
