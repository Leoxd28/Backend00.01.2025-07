const getStudentNames = estudiantes => estudiantes.map(e => e.name);

console.log(getStudentNames([
  { name: "Steve" },
  { name: "Mike" },
  { name: "John" }
]));