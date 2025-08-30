export class Telefono {
  constructor(imei, serie, marca) {
    this.imei = imei;
    this.serie = serie;
    this.marca = marca;
    this.diagnostico = null;
    this.autorizado = false;
    this.abono = 0;
    this.repuestos = [];
    this.estado = 'Ingreso';
    this.tecnicoAsignado = null;
  }

  validarIngreso(listaReportados) {
    return !listaReportados.includes(this.imei) && !listaReportados.includes(this.serie);
  }

  registrarDiagnostico(texto) {
    this.diagnostico = texto;
    this.estado = 'Diagnóstico inicial';
  }

  autorizarServicio(autorizacionUsuario, abono) {
    if (autorizacionUsuario && abono >= 0.5) {
      this.autorizado = true;
      this.abono = abono;
      this.estado = 'Autorizado para reparación';
    }
  }

  agregarRepuesto(repuesto) {
    if (repuesto) {
      this.repuestos.push(repuesto);
      this.estado = 'Repuestos agregados';
    }
  }

  asignarTecnico(tecnico) {
    this.tecnicoAsignado = tecnico;
    this.estado = tecnico ? `Asignado a ${tecnico.nombre}` : 'Sin técnico disponible';
  }

  actualizarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
}

