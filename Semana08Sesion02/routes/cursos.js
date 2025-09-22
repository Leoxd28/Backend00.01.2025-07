var express = require('express');
var router = express.Router();
const cursos = require('../controllers/cursos.controller')
const auth = require('../middelwares/auth.middelware');

/* GET users listing. */
router.get('/',[auth], cursos.traerCursos)
router.get('/:id',[auth], cursos.traerCurso)
router.get('/:id/alumnos',[auth], cursos.traerAlumnos)
router.get('/:id/alumnos/:idAlumno',[auth], cursos.traerAlumno)
router.post('/:id/alumnos',[auth], cursos.agregarAlumno)

module.exports = router;
