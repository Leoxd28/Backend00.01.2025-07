const { readdirSync, readFileSync, writeFileSync } = require("fs");
const { fileURLToPath } = require("url");
const path = require("path");
const { error } = require("console");

const DATA_FILE = path.join(__dirname, "..", "data", "data.json");

let db = JSON.parse(readFileSync(DATA_FILE), "utf8");

function saveDB() {
  writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

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
  const id = parseInt(req.params.id);
  const courses = db.courses.find((course) => course.id === id);
  // console.log(courses)
  if (!courses) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }
  return res.json(courses);
};

const createCourse = (req, res) => {
  const lastCourseId = Math.max(...db.courses.map((course) => course.id));
  const newCourseId = lastCourseId + 1;
  const newCourse = { id: newCourseId, ...req.body };

  db.courses.push(newCourse);
  saveDB();
  return res.status(201).send(newCourse);
};

const updateCourse = (req, res) => {
  const id = parseInt(req.params.id);
  // console.log(id);
  const index = db.courses.findIndex((course) => course.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }
  db.courses[index] = { ...db.courses[index], ...req.body };

  saveDB();
  return res.json(db.courses[index]);
};

const deletCourse = (req, res) => {
  const id = parseInt(req.params.id);
  const courses = db.courses.find((course) => (course.id = id));
  if (!courses) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }
  db.courses = db.courses.filter((course) => course.id !== id);

  saveDB();
  return res.json({
    message: `Curso con el id ${id} eliminado correctamente`,
  });
};

const getCourseStudents = (req, res) => {
  const id = parseInt(req.params.id);
  const courses = db.courses.find((course) => course.id === id);
  if (!courses) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }
  const alumnos = db.alumnos.filter((student) => courses.alumnosIds.includes(student.id));

  return res.json(alumnos);
}

const createCourseStudents = (req, res) => {
  const id = parseInt(req.params.id);
  const course = db.courses.find((course) => course.id === id);
  if (!course) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }
  
  const { alumnosIds } = req.body;
  if (!Array.isArray(alumnosIds) || alumnosIds.length === 0) {
    return res.status(400).json({ error: "Debes enviar un array de alumnosIds" });
  }

  const invalidIds = alumnosIds.filter((alumnoId) => !db.alumnos.some((a) => a.id === alumnoId));
  if (invalidIds.length > 0) {
    return res.status(400).json({error: "Alumnos no encontrados", invalidIds, });
  }

  course.alumnosIds = Array.from(new Set([...course.alumnosIds, ...alumnosIds]));

  saveDB();

  return res.json(course);
}

const coursesWithPagination = (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
    return res.status(400).json({ error: "Parámetros inválidos" });
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedCourses = db.courses.slice(start, end);

  res.json({ page, limit, total: db.courses.length, data: paginatedCourses});
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deletCourse,
  getCourseStudents,
  createCourseStudents,
  coursesWithPagination,
};
