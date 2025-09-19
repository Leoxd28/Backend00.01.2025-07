const handleData = require('../utils/handleData');
let cursos = []

exports.traerCursos = (req, res) => {
    if (req.user.role === "teacher") {
        cursos = handleData.cargarData();
        res.status(200).json(cursos);
    } else {
        res.status(400).json({ message: "No tienes acceso a esa informacion" })
    }

}
exports.traerCurso = (req, res) => {
    if (req.user.role === "teacher") {
        cursos = handleData.cargarData();
        let idCurso = req.params.id;
        let curso = cursos.find(a => a.id == req.params.id);
        console.log(idCurso);
        res.status(200).json(curso);
    } else {
        res.status(400).json({ message: "No tienes acceso a esa informacion" })
    }

}
exports.traerAlumnos = (req, res) => {
    if (req.user.role === "teacher") {
        cursos = handleData.cargarData();
        let idCurso = req.params.id;
        let curso = cursos.find(a => a.id == req.params.id);
        console.log(idCurso);
        res.status(200).json(curso.alumnos);
    } else {
        res.status(400).json({ message: "No tienes acceso a esa informacion" })
    }

}

exports.agregarAlumno = (req, res) => {
    cursos = handleData.cargarData();
    let idCurso = req.params.id;
    let curso = cursos.find(a => a.id == req.params.id);
    let alumno = { id: curso.alumnos.length + 1, nombre: req.body.nombre, nota: req.body.nota }
    curso.alumnos.push(alumno);
    const index = cursos.indexOf(curso);
    if (index > -1) { // only splice array when item is found
        cursos[index] = curso;
    }
    console.log(cursos)
    if (handleData.guardarData(cursos))
        res.status(200).json(curso.alumnos);
}

exports.traerAlumno = (req, res) => {
    
        cursos = handleData.cargarData();
        let idCurso = req.params.id;
        let curso = cursos.find(a => a.id == req.params.id);
        console.log(idCurso);
        let alumno = curso.alumnos.find(a=>a.id==req.params.idAlumno)
        res.status(200).json(alumno);

}


//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Hora 2 – CRUD con persistencia en JSON
//------------------------------------------------------------------------------- 
//------------------------------------------------------------------------------- 

const { readCursos, writeCursos } = require('../utils/handleData');

exports.crearCurso = (req, res) => {
  const cursos = readCursos();
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });
  const nuevoCurso = {
    id: cursos.length ? cursos[cursos.length - 1].id + 1 : 1,
    nombre,
    alumnos: []
  };
  cursos.push(nuevoCurso);
  writeCursos(cursos);
  res.status(201).json(nuevoCurso);
};
