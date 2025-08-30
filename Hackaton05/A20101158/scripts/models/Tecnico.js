export class Tecnico {
  constructor(nombre, skills = []) {
    this.nombre = nombre;
    this.skills = skills;
  }

  puedeReparar(marcaTelefono) {
    return this.skills.includes(marcaTelefono.toLowerCase());
  }
}

