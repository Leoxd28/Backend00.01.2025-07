export class Sucursal {
  constructor(nombre) {
    this.nombre = nombre;
    this.telefonos = [];
    this.tecnicos = [];
  }

  ingresarTelefono(telefono, listaReportados) {
    if (telefono.validarIngreso(listaReportados)) {
      this.telefonos.push(telefono);
      return true;
    }
    return false;
  }

  mostrarEstadoTelefonos() {
    return this.telefonos.map(t => ({
      imei: t.imei,
      estado: t.estado,
      tecnico: t.tecnicoAsignado?.nombre || 'No asignado'
    }));
  }
}

