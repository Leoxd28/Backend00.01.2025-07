class Telefono {
  constructor(serie, imei, marca, so) {
    this.serie = serie;
    this.imei = imei;
    this.marca = marca;
    this.so = so;
    this.diagnostico = null;
    this.autorizado = false;
    this.repuestos = [];
    this.estado = "ingresado";
  }

  registrarDiagnostico(diag) {
    this.diagnostico = diag;
    this.estado = "iagnostico realizado";
  }

  autorizarCliente(pago) {
    if (pago >= 0.5) {
      this.autorizado = true;
      this.estado = "autorizado para reparación";
    } else {
      throw new Error("el cliente no abono el 50% del costo");
    }
  }

  agregarRepuesto(repuesto) {
    this.repuestos.push(repuesto);
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
}

class Tecnico {
  constructor(nombre, skills = []) {
    this.nombre = nombre;
    this.skills = skills; 
  }

  puedeReparar(so) {
    return this.skills.includes(so);
  }
}

class Reparacion {
  constructor(telefono, tecnico) {
    this.telefono = telefono;
    this.tecnico = tecnico;
  }

  asignarTecnico(tecnicos) {
    switch (this.telefono.so) {
      case "android":
        this.tecnico = tecnicos.find(t => t.puedeReparar("android"));
        break;
      case "ios":
        this.tecnico = tecnicos.find(t => t.puedeReparar("ios"));
        break;
      default:
        console.log("No hay técnico para esta marca");
    }

    if (!this.tecnico) {
      throw new Error("No hay técnico disponible");
    }
  }

  mostrarEstado() {
    console.log(`Teléfono ${this.telefono.marca} (${this.telefono.so}) está en estado: ${this.telefono.estado}`);
  }
}






let tecnicos = [
  new Tecnico("luis", ["android"]),
  new Tecnico("fredy", ["ios", "android"])
];

let tel = new Telefono("72272", "27728", "Samsung", "android");
tel.registrarDiagnostico("cambio de bateria ");
tel.autorizarCliente(0.5);

let reparacion = new Reparacion(tel);
reparacion.asignarTecnico(tecnicos);
tel.agregarRepuesto("bateria litio ");
tel.cambiarEstado("En Reparación");

reparacion.mostrarEstado();
