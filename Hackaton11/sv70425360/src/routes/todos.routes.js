import { Router } from 'express';
import Todo from '../models/Todo.js';

const r = Router();

// Crear un item de la lista
// POST /api/todos
r.post('/', async (req, res, next) => {
  try {
    const { nombre, descripcion, fecha, esCompletado } = req.body || {};
    const todo = await Todo.create({
      nombre,
      descripcion,
      fecha: fecha ? new Date(fecha) : undefined,
      esCompletado: !!esCompletado
    });
    res.status(201).json(todo);
  } catch (e) { next(e); }
});

// Mostrar todos
// GET /api/todos
r.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 }).lean();
    res.json(todos);
  } catch (e) { next(e); }
});

// Mostrar pendientes
// GET /api/todos/pending
r.get('/pending', async (req, res, next) => {
  try {
    const items = await Todo.find({ esCompletado: false }).sort({ fecha: 1 }).lean();
    res.json(items);
  } catch (e) { next(e); }
});

// Mostrar completados
// GET /api/todos/completed
r.get('/completed', async (req, res, next) => {
  try {
    const items = await Todo.find({ esCompletado: true }).sort({ completedAt: -1 }).lean();
    res.json(items);
  } catch (e) { next(e); }
});

// Completar un item
// PATCH /api/todos/:id/complete
r.patch('/:id/complete', async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await Todo.findByIdAndUpdate(
      id,
      { esCompletado: true, completedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ error: 'NOT_FOUND' });
    res.json(doc);
  } catch (e) { next(e); }
});

export default r;
