const { readdirSync, readFileSync, writeFileSync } = require("fs");
const { fileURLToPath } = require("url");
const path = require("path");
const { error } = require("console");

const DATA_FILE = path.join(__dirname, "..", "data", "data.json");

let db = JSON.parse(readFileSync(DATA_FILE), "utf8");

function saveDB() {
  writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

const getAllNotes = (req, res) => {
    const alumnos = db.alumnos.map((student) => {
        return {
            id: student.id,
            nombre: student.nombre,
            nota: student.nota,
        };
    });
    res.json(alumnos);
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    const alumnos = db.alumnos.find((student) => student.id === id);
    // console.log(alumnos);
    if (!alumnos) {
        return res.status(404).json({error: "Alumno no encontrado"})
    }
    return res.send(alumnos);
}

const studentsWithFilterAndOrder = (req, res) => {
  let { minNota, sort } = req.query;
  minNota = parseInt(minNota) || 0;

  let alumnos = db.alumnos.filter((a) => a.nota >= minNota);

  if (sort === "asc") alumnos.sort((a, b) => a.nota - b.nota);
  if (sort === "desc") alumnos.sort((a, b) => b.nota - a.nota);

  res.json(alumnos);
}

const rankingStudents = (req, res) => {
    const ranking = [...db.alumnos].sort((a, b) => b.nota - a.nota);
    const rankingFinal = ranking.map((alumno, index) => ({...alumno, posicion: index + 1}));
    res.json(rankingFinal);
}

module.exports = {
    getAllNotes,
    getStudentById,
    studentsWithFilterAndOrder,
    rankingStudents,
};