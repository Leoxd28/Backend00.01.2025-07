const express = require("express")
const userRouter =express.Router()
const controller =require("../controllers/user.controller")
const verifcation=require("../middlewares/verfication-info")
const upload=require("../middlewares/upload")


/**
 @swagger
 * /api/create:
 *   post:
 *     summary: Crea un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               email:
 *                 type: string
 *               id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Faltan datos
 */
userRouter.post("/create",[verifcation],controller.create)
/**
 * @swagger
* /api/search/{id}:
 *   get:
 *     summary: Regresa un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
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
userRouter.get("/search/:id",controller.search)
/**
 * @swagger
 * /api/get:
 *  get:
 *     summary: regresa los usarios
 *     responses:
 *       201:
 *         description:  vista usarios
 *       400:
 *         description: Faltan datos
 */
userRouter.get("/get",controller.all)

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Sube una imagen
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Imagen subida correctamente
 *       400:
 *         description: No se subió ninguna imagen
 */
userRouter.post("/upload",upload.single("imagen"),controller.uploadImage)


module.exports=userRouter
      