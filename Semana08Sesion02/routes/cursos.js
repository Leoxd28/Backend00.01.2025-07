var express = require('express');
var router = express.Router();
const cursos = require('../controllers/cursos.controller')
const auth = require('../middelwares/auth.middelware');

/* GET users listing. */
router.get('/',[auth], cursos.traerCursos)
router.get('/:id',[auth], cursos.traerCurso)

module.exports = router;
