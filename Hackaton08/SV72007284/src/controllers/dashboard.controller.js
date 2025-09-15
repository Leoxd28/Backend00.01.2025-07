const { readdirSync, readFileSync, writeFileSync } = require("fs");
const { fileURLToPath } = require("url");
const path = require("path");
const { error } = require("console");

const DATA_FILE = path.join(__dirname, "..", "data", "data.json");

let db = JSON.parse(readFileSync(DATA_FILE), "utf8");

const combinedStatistics = (req, res) => {
  const totalCursos = db.courses.length;
  const totalAlumnos = db.alumnos.length;
  const promedioGeneral = totalAlumnos > 0 ? db.alumnos.reduce((sum, a) => sum + a.nota, 0) / totalAlumnos : 0;
  const mejorAlumno = totalAlumnos > 0 ? db.alumnos.reduce((max, a) => (a.nota > max.nota ? a : max)).nombre : null;

  res.json({ totalCursos, totalAlumnos, promedioGeneral: parseFloat(promedioGeneral.toFixed(1)), mejorAlumno, });
};
module.exports = {
    combinedStatistics,
};