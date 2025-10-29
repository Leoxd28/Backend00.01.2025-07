const express = require('express');
const router = express.Router();
const { dtoCreateUser, validateUserId } = require('../../middlewares/validates');

// Simulated database
const users = [
    { id: 1, name: "Roberto Pineda", email: "rpineda@x-codec.com", createdAt: "2024-01-15T10:30:00Z" },
    { id: 2, name: "David Martinez", email: "david@x-codec.com", createdAt: "2024-01-16T11:45:00Z" },
    { id: 3, name: "Ana García", email: "ana@x-codec.com", createdAt: "2024-01-17T09:20:00Z" },
    { id: 4, name: "Carlos Ruiz", email: "carlos@x-codec.com", createdAt: "2024-01-18T14:15:00Z" },
    { id: 5, name: "Laura Fernández", email: "laura@x-codec.com", createdAt: "2024-01-19T16:30:00Z" }
];

/**
 * GET /api/v1/users
 * Lista todos los usuarios
 */
router.get('/', (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    let filteredUsers = [...users];
    
    // Filter by search term
    if (search) {
        const searchTerm = search.toLowerCase();
        filteredUsers = filteredUsers.filter(user => 
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    res.json({
        users: paginatedUsers,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: filteredUsers.length,
            totalPages: Math.ceil(filteredUsers.length / limit),
            hasNext: endIndex < filteredUsers.length,
            hasPrev: page > 1
        },
        timestamp: new Date().toISOString()
    });
});

/**
 * POST /api/v1/users
 * Crear nuevo usuario
 */
router.post('/', dtoCreateUser, (req, res) => {
    const { name, email } = req.body;
    
    // Check if email already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return res.status(409).json({
            error: 'Conflict',
            message: 'El email ya está registrado',
            email: email
        });
    }
    
    const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    res.status(201).json({
        message: 'Usuario creado exitosamente',
        user: newUser
    });
});

/**
 * GET /api/v1/users/:id
 * Obtener usuario por ID
 */
router.get('/:id', validateUserId, (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({
            error: 'Not Found',
            message: 'Usuario no encontrado',
            userId: userId
        });
    }
    
    res.json({
        user: user,
        timestamp: new Date().toISOString()
    });
});

/**
 * PUT /api/v1/users/:id
 * Actualizar usuario (bonus endpoint)
 */
router.put('/:id', validateUserId, dtoCreateUser, (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({
            error: 'Not Found',
            message: 'Usuario no encontrado',
            userId: userId
        });
    }
    
    // Check if email conflicts with another user
    const { name, email } = req.body;
    const emailConflict = users.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && u.id !== userId
    );
    
    if (emailConflict) {
        return res.status(409).json({
            error: 'Conflict',
            message: 'El email ya está registrado por otro usuario',
            email: email
        });
    }
    
    // Update user
    users[userIndex] = {
        ...users[userIndex],
        name: name.trim(),
        email: email.toLowerCase().trim(),
        updatedAt: new Date().toISOString()
    };
    
    res.json({
        message: 'Usuario actualizado exitosamente',
        user: users[userIndex]
    });
});

module.exports = router;