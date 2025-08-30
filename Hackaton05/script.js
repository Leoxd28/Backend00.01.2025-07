
class SistemaReparaciones {
    constructor() {
        this.sucursales = [];
        this.tecnicos = [];
        this.reparaciones = [];
        this.repuestos = [];
        this.telefonosReportados = new Set(); // IMEIs y números de serie reportados
    }

    
    verificarTelefonoReportado(imei, numeroSerie) {
        return this.telefonosReportados.has(imei) || this.telefonosReportados.has(numeroSerie);
    }

    
    agregarTelefonoReportado(imei, numeroSerie) {
        this.telefonosReportados.add(imei);
        this.telefonosReportados.add(numeroSerie);
    }
}


class Telefono {
    constructor(marca, modelo, imei, numeroSerie, sistemaOperativo) {
        this.marca = marca;
        this.modelo = modelo;
        this.imei = imei;
        this.numeroSerie = numeroSerie;
        this.sistemaOperativo = sistemaOperativo.toLowerCase();
        this.reportado = false;
    }

    
    obtenerTipoSO() {
        switch(this.sistemaOperativo) {
            case 'android':
                return 'ANDROID';
            case 'ios':
                return 'IOS';
            default:
                return 'OTRO';
        }
    }
}


class Tecnico {
    constructor(nombre, skills) {
        this.nombre = nombre;
        this.skills = skills; 
        this.disponible = true;
    }

    
    tieneSkillPara(marca) {
        return this.skills.includes(marca.toLowerCase());
    }

  
    estaDisponible() {
        return this.disponible;
    }
}


class Reparacion {
    constructor(telefono, cliente) {
        this.telefono = telefono;
        this.cliente = cliente;
        this.diagnosticoInicial = null;
        this.autorizacionEscrita = false;
        this.abonoRealizado = false;
        this.estado = 'INGRESADO'; 
        this.tecnicoAsignado = null;
        this.repuestos = [];
        this.historialEstados = [];
        this.costoTotal = 0;
        this.abono = 0;
    }

    
    realizarDiagnosticoInicial(diagnostico, costoEstimado) {
        this.diagnosticoInicial = diagnostico;
        this.costoTotal = costoEstimado;
        this.estado = 'DIAGNOSTICO';
        this.agregarAlHistorial('Diagnóstico inicial realizado');
    }

 
    recibirAutorizacionYAbono(autorizacion, abono) {
        if (abono >= this.costoTotal * 0.5) {
            this.autorizacionEscrita = autorizacion;
            this.abonoRealizado = true;
            this.abono = abono;
            this.estado = 'ESPERA_AUTORIZACION';
            this.agregarAlHistorial('Autorización y abono recibidos');
            return true;
        }
        return false;
    }

    
    asignarTecnico(tecnico) {
        if (tecnico.estaDisponible() && tecnico.tieneSkillPara(this.telefono.marca)) {
            this.tecnicoAsignado = tecnico;
            tecnico.disponible = false;
            this.estado = 'EN_REPARACION';
            this.agregarAlHistorial(`Técnico asignado: ${tecnico.nombre}`);
            return true;
        }
        return false;
    }

   
    agregarRepuesto(repuesto, cantidad = 1) {
        this.repuestos.push({ repuesto, cantidad });
        this.agregarAlHistorial(`Repuesto agregado: ${repuesto.nombre} x${cantidad}`);
    }

   
    actualizarEstado(nuevoEstado) {
        this.estado = nuevoEstado;
        this.agregarAlHistorial(`Estado cambiado a: ${nuevoEstado}`);
    }

   
    agregarAlHistorial(mensaje) {
        this.historialEstados.push({
            fecha: new Date(),
            mensaje: mensaje,
            estado: this.estado
        });
    }

    
    completarReparacion() {
        this.estado = 'COMPLETADO';
        if (this.tecnicoAsignado) {
            this.tecnicoAsignado.disponible = true;
        }
        this.agregarAlHistorial('Reparación completada');
    }
}


class Repuesto {
    constructor(nombre, codigo, precio, compatibleCon = []) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.precio = precio;
        this.compatibleCon = compatibleCon; // Marcas compatibles
    }
}


class Cliente {
    constructor(nombre, telefono, email) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
    }
}


function asignarTecnicoPorSO(reparacion, tecnicos) {
    const tipoSO = reparacion.telefono.obtenerTipoSO();
    
    switch(tipoSO) {
        case 'ANDROID':
            
            const tecnicoAndroid = tecnicos.find(tec => 
                tec.estaDisponible() && 
                tec.tieneSkillPara('android') &&
                tec.tieneSkillPara(reparacion.telefono.marca)
            );
            if (tecnicoAndroid) {
                return reparacion.asignarTecnico(tecnicoAndroid);
            }
            break;
            
        case 'IOS':
          
            const tecnicoIOS = tecnicos.find(tec => 
                tec.estaDisponible() && 
                tec.tieneSkillPara('ios') &&
                tec.tieneSkillPara(reparacion.telefono.marca)
            );
            if (tecnicoIOS) {
                return reparacion.asignarTecnico(tecnicoIOS);
            }
            break;
            
        default:
            console.log('No hay técnico disponible para esta marca/sistema');
            return false;
    }
    
    return false;
}


const sistema = new SistemaReparaciones();

// Agregar algunos teléfonos reportados
sistema.agregarTelefonoReportado('123456789012345', 'SN001');
sistema.agregarTelefonoReportado('987654321098765', 'SN002');


const tecnico1 = new Tecnico('Juan Pérez', ['samsung', 'android', 'xiaomi']);
const tecnico2 = new Tecnico('María García', ['apple', 'ios', 'iphone']);
const tecnico3 = new Tecnico('Carlos López', ['motorola', 'android', 'lg']);

sistema.tecnicos = [tecnico1, tecnico2, tecnico3];


const pantallaSamsung = new Repuesto('Pantalla Samsung S20', 'P-SAMS20', 150, ['samsung']);
const bateriaiPhone = new Repuesto('Batería iPhone 12', 'B-IPH12', 120, ['apple']);


const telefonoCliente = new Telefono('Samsung', 'Galaxy S20', '111222333444555', 'SN123', 'Android');

if (!sistema.verificarTelefonoReportado(telefonoCliente.imei, telefonoCliente.numeroSerie)) {
    
    const cliente = new Cliente('Ana Rodriguez', '555-1234', 'ana@email.com');
    
   
    const reparacion = new Reparacion(telefonoCliente, cliente);
    
   
    reparacion.realizarDiagnosticoInicial('Pantalla rota y batería defectuosa', 300);
    
    if (reparacion.recibirAutorizacionYAbono(true, 150)) {
        
        if (asignarTecnicoPorSO(reparacion, sistema.tecnicos)) {
            
            reparacion.agregarRepuesto(pantallaSamsung, 1);
            
            
            reparacion.completarReparacion();
            
            console.log('Reparación completada exitosamente');
            console.log('Estado final:', reparacion.estado);
            console.log('Historial:', reparacion.historialEstados);
        }
    }
} else {
    console.log('El teléfono está reportado, no se puede realizar el servicio');
}   