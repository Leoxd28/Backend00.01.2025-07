const express = require('express');
const router = express.Router();
const productionController = require('../controllers/production.controller');

// Rutas principales de producción
router.get('/', productionController.getAll);
router.get('/statistics', productionController.getStatistics);
router.get('/capacity', productionController.calculateCapacity);
router.get('/:id', productionController.getById);
router.post('/', productionController.create);
router.post('/produce', productionController.produce);

module.exports = router;