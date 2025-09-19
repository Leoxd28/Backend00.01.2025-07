var express = require('express');
var router = express.Router();

// Home
router.get('/', function(req, res, next) {
  res.send('Hackatón Express Avanzado');
});

//-------------------------------------------------------------------------------
// Hora 2 – CRUD con persistencia en JSON
//-------------------------------------------------------------------------------

const cursos = require('../controllers/cursos.controller');
const auth = require('../middelwares/auth.middelware');

// POST /cursos - Crear un nuevo curso
router.post('/cursos', [auth], cursos.crearCurso);

//-------------------------------------------------------------------------------
// Hora 3 – Middleware y autenticación
//-------------------------------------------------------------------------------

// Endpoint protegido /notas: solo profesores pueden ver todas las notas de todos los cursos
router.get('/notas', [auth], (req, res, next) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Solo profesores pueden ver notas' });
  }
  next();
}, (req, res) => {
  const { readCursos } = require('../utils/handleData');
  const cursos = readCursos();
  const notas = cursos.flatMap(curso =>
    (curso.alumnos || []).map(alumno => ({
      curso: curso.nombre,
      alumno: alumno.nombre,
      nota: alumno.nota
    }))
  );
  res.json(notas);
});

//-------------------------------------------------------------------------------
// Hora 4 – Filtros, orden y paginación
//-------------------------------------------------------------------------------

// GET /alumnos?minNota=15&sort=desc
router.get('/alumnos', [auth], (req, res) => {
  const { readCursos } = require('../utils/handleData');
  let cursos = readCursos();
  let alumnos = cursos.flatMap(curso =>
    (curso.alumnos || []).map(alumno => ({
      ...alumno,
      curso: curso.nombre
    }))
  );

  // Filtro por nota mínima
  const minNota = req.query.minNota ? parseFloat(req.query.minNota) : undefined;
  if (minNota !== undefined && isNaN(minNota)) {
    return res.status(400).json({ error: 'minNota debe ser un número' });
  }
  if (minNota !== undefined) {
    alumnos = alumnos.filter(a => a.nota >= minNota);
  }

  // Ordenamiento por nota
  const sort = req.query.sort === 'asc' ? 'asc' : req.query.sort === 'desc' ? 'desc' : null;
  if (sort) {
    alumnos = alumnos.sort((a, b) => sort === 'asc' ? a.nota - b.nota : b.nota - a.nota);
  }

  res.json(alumnos);
});

module.exports = router;
