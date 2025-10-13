const express = require('express');
const router = express.Router();
const {
    getAllStaff,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff,
    resetHours
} = require('../controllers/staff.controller');

// Rutas principales
router.get('/', getAllStaff);
router.get('/:id', getStaffById);
router.post('/', createStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);
router.patch('/:id/reset-hours', resetHours);

module.exports = router;