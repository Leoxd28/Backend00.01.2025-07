const { readdirSync, readFileSync, writeFileSync } = require("fs");
const { fileURLToPath } = require("url");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "data", "data.json");

let db = JSON.parse(readFileSync(DATA_FILE), "utf8");

function saveDB() {
  writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

// Controllers

const getAllCourses = (req, res) => {
  const courses = db.courses.map((course) => {
    const teacher = db.profesores.find(
      (teacher) => teacher.id === course.profesorId
    );
    return {
      id: course.id,
      name: course.name,
      descripcion: course.descripcion,
      creditos: course.creditos,
      profesor: teacher || null,
    };
  });

  res.json(courses);
};

const getCourseById = (req, res) => {
  const id = req.params.id;

  const courses = db.courses.find((course) => course.id === id);

  if (!courses) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }

  return res.send(courses);
};

const createCourse = (req, res) => {
  const newCourse = { id: crypto.randomUUID(), ...req.body };

  db.courses.push(newCourse);

  saveDB();

  return res.status(201).send(newCourse);
};

const updateCourse = (req, res) => {
  const { id } = req.params;

  const index = db.courses.findIndex((course) => course.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }
  db.courses[index] = { ...db.courses[index], ...req.body };

  saveDB();
  res.json(db.courses[index]);
};

const deleteCourse = (req, res) => {
  const id = req.params.id;

  const courses = db.courses.find((course) => course.id === id);

  if (!courses) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }

  db.courses = db.courses.filter((course) => course.id !== id);

  saveDB();

  return res.json({
    message: `Curso con el id: ${id} eliminado correctamente`,
  });
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};