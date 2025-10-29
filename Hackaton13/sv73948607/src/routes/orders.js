const express =require("express")
const orderRouter =express.Router()
const controller =require("../controllers/orders.controller")
const vailidity=require("../middlewares/order-validty")




/**
 * @swagger
 * /api/view:
 *   get:
 *     summary: Lista usuarios con paginación
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: query
 *         name: pag
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de usuarios por página
 *     responses:
 *       200:
 *         description: Lista de usuarios paginada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     additionalProperties: true
 *                 totalItems:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       401:
 *         description: Token inválido o faltante
 */
orderRouter.get("/view",[vailidity],controller.view)

/**
 * @swagger
 * /api/additems/{id}:
 *   post:
 *     summary: Busca un usuario por ID y recibe un array de items
 *     security:
 *      - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   additionalProperties:
 *                     type:string   
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 user:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Usuario no encontrado
 */
orderRouter.post("/additems/:id",[vailidity],controller.buy)

/**
 * @swagger
 * /api/export:
 *   get:
 *     summary: "Exporta usuarios en CSV"
 *     security:
 *      - tokenAuth: []
 *     description: "Devuelve un archivo CSV como flujo de datos (stream)."
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: "Archivo CSV descargable"
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: "Error interno del servidor"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
orderRouter.get("/export",[vailidity],controller.stream)

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: "Procesa un pago con idempotencia"
 *     description: "Crea un pago. Si se envía la misma idempotency-key, devuelve el resultado anterior sin duplicar la transacción."
 *     tags:
 *       - Pagos
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: header
 *         name: idempotency-key
 *         schema:
 *           type: string
 *         required: true
 *         description: "Clave única para garantizar idempotencia"
 *     responses:
 *       201:
 *         description: "Pago creado exitosamente"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paymentId:
 *                   type: string
 *                   description: "ID único del pago generado"
 *                 status:
 *                   type: string
 *                   description: "Estado del pago"
 *               example:
 *                 paymentId: "f3a1d2e7"
 *                 status: "ok"
 *       200:
 *         description: "Pago previamente creado con la misma idempotency-key"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paymentId:
 *                   type: string
 *                 status:
 *                   type: string
 *               example:
 *                 paymentId: "f3a1d2e7"
 *                 status: "ok"
 *       400:
 *         description: "Falta idempotency-key en el header"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "idempotency key es requerida"
 *       500:
 *         description: "Error interno del servidor"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
orderRouter.post("/payments",[vailidity],controller.payment)    

module.exports=orderRouter