var express = require('express');
var router = express.Router();
const cursos = require('../controllers/cursos.controller');
const auth = require('../middelwares/auth.middelware');
const validateNombre = require('../middelwares/validateNombre.middelware');

// Solo profesores pueden ver notas (GET cursos, GET curso por id, GET alumnos, GET alumno)
router.get('/', [auth], (req, res, next) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Solo profesores pueden ver notas' });
  }
  next();
}, cursos.traerCursos);

router.get('/:id', [auth], (req, res, next) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Solo profesores pueden ver notas' });
  }
  next();
}, cursos.traerCurso);

router.get('/:id/alumnos', [auth], (req, res, next) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Solo profesores pueden ver notas' });
  }
  next();
}, cursos.traerAlumnos);

router.get('/:id/alumnos/:idAlumno', [auth], (req, res, next) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Solo profesores pueden ver notas' });
  }
  next();
}, cursos.traerAlumno);

//-------------------------------------------------------------------------------
// Hora 2 – CRUD con persistencia en JSON
// Solo profesores pueden crear cursos y nombre es obligatorio
router.post('/', [auth, validateNombre], (req, res, next) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Solo profesores pueden crear cursos' });
  }
  next();
}, cursos.crearCurso);
//-------------------------------------------------------------------------------

// Para agregar alumno, valida nombre
router.post('/:id/alumnos', [auth, validateNombre], cursos.agregarAlumno);

//-------------------------------------------------------------------------------
// Hora 4 – Filtros, orden y paginación
//-------------------------------------------------------------------------------

// GET /cursos/filtros?page=1&limit=2&sort=asc|desc
router.get('/filtros', [auth], (req, res) => {
  const { readCursos } = require('../utils/handleData');
  let cursos = readCursos();

  console.log('Cursos leídos:', JSON.stringify(cursos, null, 2));
  
  // Ordenamiento por id
  const sort = req.query.sort === 'desc' ? 'desc' : 'asc';
  cursos = cursos.sort((a, b) => sort === 'asc' ? a.id - b.id : b.id - a.id);

  // Paginación
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || cursos.length;
  if (page < 1 || limit < 1) {
    return res.status(400).json({ error: 'Parámetros de paginación inválidos' });
  }
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = cursos.slice(start, end);

  res.json({
    page,
    limit,
    total: cursos.length,
    data: paginated
  });
});

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
