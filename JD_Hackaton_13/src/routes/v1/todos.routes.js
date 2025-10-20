const express = require('express');
const router = express.Router();

// Base de datos simulada de TODOs
const todos = [
  { id: '1', title: 'Completar documentación', done: false, createdAt: new Date().toISOString() },
  { id: '2', title: 'Revisar código', done: true, createdAt: new Date().toISOString() },
  { id: '3', title: 'Implementar tests', done: false, createdAt: new Date().toISOString() }
];

// GET /api/v1/todos - Lista todos los TODOs
router.get('/', (req, res) => {
  res.json(todos);
});

// GET /api/v1/todos/:id - Obtiene un TODO específico
router.get('/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ error: 'TODO no encontrado' });
  }
  res.json(todo);
});

// POST /api/v1/todos - Crear un nuevo TODO
router.post('/', (req, res) => {
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'El título es requerido' });
  }
  
  const newTodo = {
    id: String(todos.length + 1),
    title,
    done: false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /api/v1/todos/:id - Actualizar un TODO
router.put('/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  
  if (!todo) {
    return res.status(404).json({ error: 'TODO no encontrado' });
  }
  
  if (req.body.title !== undefined) todo.title = req.body.title;
  if (req.body.done !== undefined) todo.done = req.body.done;
  
  res.json(todo);
});

// DELETE /api/v1/todos/:id - Eliminar un TODO
router.delete('/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'TODO no encontrado' });
  }
  
  todos.splice(index, 1);
  res.status(204).send();
});

module.exports = router;