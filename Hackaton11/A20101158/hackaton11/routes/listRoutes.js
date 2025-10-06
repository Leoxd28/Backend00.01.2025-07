const express = require('express');
const router = express.Router();
const controller = require('../controllers/listController');

router.post('/lista', controller.crearItem);
router.get('/pendientes', controller.obtenerPendientes);
router.get('/completados', controller.obtenerCompletados);
router.patch('/completar/:id', controller.completarItem);

module.exports = router;
