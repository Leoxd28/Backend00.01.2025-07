var express = require('express');
var router = express.Router();
var cursos=require("../controllers/cursos.controller")
const auth=require("../middlewares/auth.middelware")
/* GET users listing. */
router.get("/dashboard",[auth],cursos.dashboard)
router.get("/descargar",[auth],cursos.exportar)
router.get("/ranking",[auth],cursos.ranking)
router.get("/filtro",[auth],cursos.ordenarsegun)
router.get("/notas",[auth],cursos.filtrarnota)
router.get("/pagina",[auth],cursos.pagina) 
router.post("/crearcurso",[auth],cursos.agregarCurso)
router.get("/",[auth],cursos.traerCursos)
router.get("/:id",[auth],cursos.traerCurso)
router.get("/:id/alumnos",[auth],cursos.traeralumnos)
router.post("/:id/crearalumno",[auth],cursos.crearalumnos)
module.exports = router;
