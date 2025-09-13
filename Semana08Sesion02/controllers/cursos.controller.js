const handleData = require('../utils/handleData')

let cursos = []

exports.traerCursos = (req, res) => {
    if (req.user.role === "teacher") {
        cursos = handleData.cargarData();
        res.status(200).json(cursos);
    }else{
        res.status(400).json({message: "No tienes acceso a esa informacion"})
    }

}
exports.traerCurso = (req, res) => {
    if (req.user.role === "teacher") {
        cursos = handleData.cargarData();
        let idCurso = req.params.id;
       let curso =  cursos.find(a=> a.id == req.params.id);
        console.log(idCurso);
        res.status(200).json(curso);
    }else{
        res.status(400).json({message: "No tienes acceso a esa informacion"})
    }

}