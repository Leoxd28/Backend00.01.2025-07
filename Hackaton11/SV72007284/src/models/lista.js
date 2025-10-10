function validarItem({ nombre, descripcion, fecha }) {
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    throw new Error("El campo 'nombre' es obligatorio y debe ser texto");
  }

  return {
    nombre: nombre.trim(),
    descripcion: descripcion ? descripcion.trim() : "",
    fecha: fecha ? new Date(fecha) : new Date(),
    esCompletado: false,
    creadoEn: new Date(),
  };
}

module.exports = { validarItem };
