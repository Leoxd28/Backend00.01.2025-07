const express = require('express');
const router = express.Router();
const {
    getAllRawMaterials,
    getRawMaterialById,
    createRawMaterial,
    updateRawMaterial,
    deleteRawMaterial,
    addStock
} = require('../controllers/rawmaterial.controller');

// Rutas principales
router.get('/', getAllRawMaterials);
router.get('/:id', getRawMaterialById);
router.post('/', createRawMaterial);
router.put('/:id', updateRawMaterial);
router.delete('/:id', deleteRawMaterial);
router.patch('/:id/add-stock', addStock);

module.exports = router;