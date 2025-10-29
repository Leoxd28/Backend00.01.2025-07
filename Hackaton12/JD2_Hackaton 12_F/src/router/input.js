const express = require('express');
const router = express.Router();
const {
    getAllInputs,
    getInputById,
    createInput,
    updateInput,
    deleteInput,
    addStock
} = require('../controllers/input.controller');

// Rutas principales
router.get('/', getAllInputs);
router.get('/:id', getInputById);
router.post('/', createInput);
router.put('/:id', updateInput);
router.delete('/:id', deleteInput);
router.patch('/:id/add-stock', addStock);

module.exports = router;