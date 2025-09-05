const imeisReportados = [
    "357289101234567",
    "359876543210123",
    "352099001122334",
    "356789123456789",
    "353322445566778",
];
const numSerieReportados = [
    "SN1234567890",
    "SN0987654321",
    "SN1122334455",
    "SN5566778899",
];
let arrCelulares = [];
let servicioActual = null;

const Servicios = function () {
    let Nombre, Direccion;
    function configurar() {
        document.getElementById("txt_nombre").innerText = Nombre;
        $("#txt_direccion").text(Direccion);

    }
    function eventos() {
        $("#servicio").on("click", servicioCelular);
    }
    async function servicioCelular(e) {
        e.preventDefault();
        servicioActual = null;
        console.log("Hizo click")
        $("#divServicio").hide();
        const { value: formValues } = await Swal.fire({
            title: "Datos del celular",
            icon: "info",
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            html: `
            <div class="text-center mb-3" style="color: #90A1B9;">
                <i class="bi bi-phone" style="font-size: 2rem;"></i>
            </div>
            <div class="mb-3">
                <input id="sistemaOperativo" type="text" placeholder="android/ios" class="form-control input-md">
            </div>
            <div class="mb-3">
                <input id="modelo" type="text" placeholder="Samsung, iPhone, Motorola..." class="form-control input-md">
            </div>
            <div class="mb-3">
                <input id="serie" type="text" placeholder="Número de serie" class="form-control input-md">
            </div>
            <div class="mb-3">
                <input id="imei" type="text" placeholder="IMEI" class="form-control input-md">
            </div>`,
            preConfirm: () => {
                return {
                    sistemaOperativo: $("#sistemaOperativo").val(),
                    modelo: $("#modelo").val(),
                    serie: $("#serie").val(),
                    imei: $("#imei").val()
                }
            }
        });
        if (!formValues) return;
        console.log(formValues)
        const objCelular = new Celular(formValues.sistemaOperativo, formValues.modelo);
        console.log(objCelular)
        const isIemiValido = objCelular.verificarIMEI(formValues.imei);
        if (!isIemiValido) return;
        const isSerieValido = objCelular.verificarNumeroSerie(formValues.serie);
        if (!isSerieValido) return;
        if (isIemiValido && isSerieValido) {
            await Swal.fire("Correcto", "IMEI y número de serie validos. Ahora ingresa los datos personales del cliente.", "success");
            servicioActual = new Servicio("Diagnóstico inicial", 0);
        }
        try {
            const objCliente = await designarDuenio();
            objCelular.agregarDuenio(objCliente.nombres);
            const tecnico = arrTecnicos.find(t => t.puedeReparar(objCelular.sistemaOperativo) && t.isActivo !== false);
            console.log(tecnico);
            if (tecnico) {
                tecnico.asignarCelular();
            } else {
                Swal.fire("Sin técnicos disponibles", "No hay técnicos activos con esa habilidad.", "warning");
            }
            arrCelulares.push(objCelular);
            dibujarServicio(objCliente, objCelular, tecnico);
        } catch (error) {
            console.error("Error en asignación de dueño:", error);
        }
    }
    function dibujarServicio(objCliente, objCelular, tecnico) {
        $("#clienteNombre").val(objCliente.nombres);
        $("#clienteApellido").val(objCliente.apellidos);
        $("#clienteDNI").val(objCliente.dni);
        $("#sistemaOperativoCel").val(objCelular.sistemaOperativo);
        $("#modeloCel").val(objCelular.modelo);
        $("#imeiCel").val(objCelular.imei);
        $("#serieCel").val(objCelular.serie);
        $("#tecnicoNombre").val(tecnico.nombres);
        $("#tecnicoDispositivos").val(tecnico.celularesAsignados);
        $("#tecnicoEstado").val(tecnico.isActivo ? "Disponible" : "Ocupado");

        // $("#montoAbonado").val(servicioActual.abonos);
        // $("#estadoServicio").val(servicioActual.estados);

        $("#divServicio").show();
        $("#diagnosticoSection").show();
        $("#diagnosticoForm").show();
    }
    async function designarDuenio() {
        const { value: formValues } = await Swal.fire({
            title: "Datos personales del cliente",
            icon: "info",
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            html: `
            <div class="text-center mb-3" style="color: #90A1B9;">
                <i class="bi bi-person-fill" style="font-size: 2rem";></i>
            </div>
            <div class="mb-3">
                <input id="nombres" type="text" placeholder="Nombres" class="form-control input-md">
            </div>
            <div class="mb-3">
                <input id="apellidos" type="text" placeholder="Apellidos" class="form-control input-md">
            </div>
            <div class="mb-3">
                <input id="dni" type="text" placeholder="DNI" class="form-control input-md">
            </div>
            `,
            preConfirm: () => {
                return {
                    nombres: $("#nombres").val(),
                    apellidos: $("#apellidos").val(),
                    dni: $("#dni").val()
                }
            }
        })
        if (formValues) {
            let objCliente = new Cliente(formValues.nombres, formValues.apellidos, formValues.dni);
            return objCliente;
        }
    }
    return {
        init: function (parametros) {
            console.log(parametros);
            Nombre = parametros.nombre;
            Direccion = parametros.direccion;
            configurar();
            eventos();
        }
    }
}()
class Persona {
    constructor(nombres, apellidos, dni) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.dni = dni;
    }
}
class Tecnico extends Persona {
    constructor(nombres, apellidos, dni, skills = []) {
        super(nombres, apellidos, dni);
        this.skills = skills.map(s => s.toLowerCase());
        this.isActivo = true;
        this.celularesAsignados = 0;
    }
    puedeReparar(so) {
        return this.skills.includes(so.toLowerCase()) && this.celularesAsignados < 20;
    }
    asignarCelular() {
        this.celularesAsignados++;
        if (this.celularesAsignados >= 20) {
            this.isActivo = false;
        }
    }
}
let arrTecnicos = [
    new Tecnico("Alexander", "Cordova", 72007284, ["android", "ios"]),
    new Tecnico("Steve", "Huaman", 87654321, ["android"]),
    new Tecnico("Martin", "Vizcarra", 56781234, ["ios"]),
];
arrTecnicos[0].celularesAsignados = 19;
class Cliente extends Persona {
    constructor(nombres, apellidos, dni) {
        super(nombres, apellidos, dni);
        this.codigoCliente = this.generarCodigoCliente();
    }
    generarCodigoCliente() {
        const inicial = this.nombres.charAt(0).toUpperCase();
        const medio = this.apellidos.slice(-2).toUpperCase();
        const final = String(this.dni).slice(-3);
        return `${inicial}${medio}${final}`;
    }
}
class Dispositivo {
    constructor(sistemaOperativo, modelo) {
        this.sistemaOperativo = sistemaOperativo;
        this.modelo = modelo;
    }
}
class Celular extends Dispositivo {
    constructor(sistemaOperativo, modelo) {
        super(sistemaOperativo, modelo);
        this.imei = null;
        this.serie = null;
        this.duenio = null;
    }
    agregarDuenio(nombreDuenio) {
        this.duenio = nombreDuenio;
    }
    verificarIMEI(imeiCelular) {
        if (imeisReportados.includes(imeiCelular)) {
            Swal.fire("Error", "El IMEI ha sido reportado. No se puede realizar el servicio.", "error");
            return false;
        } else {
            this.imei = imeiCelular;
            return true;
        }
    }
    verificarNumeroSerie(serieCelular) {
        if (numSerieReportados.includes(serieCelular)) {
            Swal.fire("Error", "El número de serie ha sido reportado. No se puede realizar el servicio.", "error")
            return false;
        } else {
            this.serie = serieCelular;
            return true;
        }
    }

}
class Repuesto {
    constructor(nombreRepuesto, costoRepuesto) {
        this.nombreRepuesto = nombreRepuesto;
        this.costoRepuesto = costoRepuesto;
    }
}
class Servicio extends Repuesto {
    constructor(nombreRepuesto, costoRepuesto) {
        super(nombreRepuesto, costoRepuesto);
        this.diagnosticos = "";
        this.autorizado = false;
        this.arrTareas = [];
        this.abonos = 0;
        this.arrRepuestos = [];
        this.estados = "Ingresado";
        this.costoServicios = 0;
        this.enEspera = 0;
    }
    agregarDiagnostico(diagnostico, costoDiagnostico) {
        if (!this.autorizado && this.arrTareas.length > 0) {
            throw new Error("No se puede agregar un nuevo diagnóstico sin la autorización del cliente.");
        }
        this.diagnosticos = diagnostico;
        this.arrTareas.push(diagnostico);
        this.costoServicios += costoDiagnostico;
        this.estados = "Diagnóstico asignado. Costo del servicio establecido"
    }
    autorizarServicio(abono) {
        const minimoRequerido = this.costoServicios * 0.5;
        if (abono < minimoRequerido) {
            throw new Error(`Se requiere al menos el 50% del abono ($${minimoRequerido}) para autorizar el servicio.`);
        }
        this.abonos = abono;
        this.autorizado = true;
        this.enEspera++;
        this.estados = "El cliente ha autorizado la reparación."
    }
    agregarRepuesto(repuesto) {
        if (!this.autorizado) throw new Error("No se pueden agregar repuestos sin autorización del cliente.");
        this.arrRepuestos.push(repuesto);
        this.costoServicios += repuesto.costoRepuesto;
    }
    cambiarEstado(nuevoEstado) {
        this.estados = nuevoEstado;
    }
}
function mostrarTareas(tareas) {
    if (!tareas || tareas.length === 0) {
        console.log("No hay tareas para mostrar.");
        return;
    }

    let html = "<ul class='list-group'>";
    tareas.forEach(t => {
        html += `<li class='list-group-item'>${t}</li>`;
    });
    html += "</ul>";

    html += `<div class="mt-3">
                <button id="btnNuevoDiagnostico" class="btn btn-primary btn-sm">Añadir nuevo diagnóstico</button>
             </div>`;

    $("#tareasContent").html(html);
    $("#tareasSection").show();
    console.log("Se va a mostrar tareas:", tareas);

}

$(document).on("click", "#btnDiagnostico", function () {
    $("#diagnosticoForm").toggle();
});

$(document).on("submit", "#diagnosticoForm", function (e) {
    e.preventDefault();
    const costo = parseFloat($("#costoServicio").val());
    const diagnosticoTexto = $("#txtDiagnostico").val().trim();

    if (!diagnosticoTexto) {
        Swal.fire("Error", "Ingresa una descripción del diagnóstico", "error");
        return;
    }

    if (isNaN(costo) || costo <= 0) {
        Swal.fire("Error", "Ingresa un costo válido", "error");
        return;
    }

    try {
        if (!servicioActual) {
            Swal.fire("Error", "No se ha creado el servicio. Vuelve a ingresar los datos del celular.", "error");
            return;
        }

        servicioActual.agregarDiagnostico(diagnosticoTexto, costo);

        const montoAbonado = costo * 0.5;
        $("#montoAbonado").val(montoAbonado.toFixed(2));
        if (servicioActual) {
            servicioActual.montoAbonado = montoAbonado;
        }
        actualizarMontos();
        mostrarTareas(servicioActual.arrTareas);

        Swal.fire("Diagnóstico guardado", `El servicio ha sido abonado correctamente S/${montoAbonado}.`, "success");
        $("#diagnosticoForm").hide();
    } catch (error) {
        Swal.fire("Error", error.message, "error");
    }
});

$(document).on("click", "#btnAutorizar", function (e) {
    e.preventDefault();
    if (!servicioActual || servicioActual.arrTareas.length === 0) {
        Swal.fire("Error", "Debes agregar un diagnóstico antes de autorizar el servicio.", "error");
        return;
    }
    const abono = parseFloat($("#adelanto").val());
    if (isNaN(abono) || abono <= 0) {
        Swal.fire("Error", "Ingresa un adelanto válido", "error");
        return;
    }
    Swal.fire({
        title: "¿Deseas autorizar el servicio?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            try {
                servicioActual.autorizarServicio(abono);
                mostrarTareas(servicioActual.arrTareas);
                actualizarMontos();
                console.log("Tareas actuales:", servicioActual.arrTareas);
                Swal.fire("Servicio autorizado", "La lista de tareas se ha mostrado.", "success");
            } catch (e) {
                Swal.fire("Error", e.message, "error");
            }
        } else {
            
        }
    });
});
$(document).on("click", "#btnNuevoDiagnostico", async function () {
    // Preguntar si cuenta con autorización
    const result = await Swal.fire({
        title: "¿Cuentas con la autorización del cliente?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
    });

    if (!result.isConfirmed) {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se puede agregar un nuevo diagnóstico sin la autorización del cliente.",
    });
    return;
} else {
    servicioActual.autorizado = true;
}


    // Si hay autorización, mostrar formulario para nuevo diagnóstico
    const { value: formValues } = await Swal.fire({
        title: "Nuevo diagnóstico",
        html:
            '<input id="swalDiagnostico" class="swal2-input" placeholder="Descripción del diagnóstico">' +
            '<input id="swalCosto" type="number" min="0" step="0.01" class="swal2-input" placeholder="Costo">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        preConfirm: () => {
            return {
                diagnostico: document.getElementById('swalDiagnostico').value.trim(),
                costo: parseFloat(document.getElementById('swalCosto').value)
            }
        }
    });

    if (!formValues) return;

    // Validaciones
    if (!formValues.diagnostico) {
        Swal.fire("Error", "Ingresa una descripción del diagnóstico", "error");
        return;
    }
    if (isNaN(formValues.costo) || formValues.costo <= 0) {
        Swal.fire("Error", "Ingresa un costo válido", "error");
        return;
    }

    try {
        if (!servicioActual) {
            Swal.fire("Error", "No se ha creado el servicio. Vuelve a ingresar los datos del celular.", "error");
            return;
        }

        // Verificación de autorización por seguridad
        if (!servicioActual.autorizado && servicioActual.arrTareas.length > 0) {
            Swal.fire("Error", "No se puede agregar un nuevo diagnóstico sin la autorización del cliente.", "error");
            return;
        }

        // Agregar nuevo diagnóstico
        servicioActual.diagnosticos += (servicioActual.diagnosticos ? "\n" : "") + formValues.diagnostico;
        servicioActual.arrTareas.push(formValues.diagnostico);
        servicioActual.costoServicios += formValues.costo;
        actualizarMontos();
        mostrarTareas(servicioActual.arrTareas);

        Swal.fire("Diagnóstico guardado", "El diagnóstico fue agregado correctamente.", "success");

    } catch (error) {
        Swal.fire("Error", error.message, "error");
    }
});

document.getElementById("costoServicio").addEventListener("input", function () {
    const costo = parseFloat(this.value);
    const montoInput = document.getElementById("montoAbonado");

    if (!isNaN(costo)) {
        montoInput.value = (costo * 0.5).toFixed(2);
    } else {
        montoInput.value = "";
    }
});
function actualizarMontos() {
    if (!servicioActual) return;
    const costo = parseFloat(document.getElementById("costoServicio").value);
    const abonado = (costo * 0.5).toFixed(2);
    const total = servicioActual.costoServicios.toFixed(2) - abonado;

    document.getElementById("montoAbonado").innerText = `S/ ${abonado}`;
    document.getElementById("costoTotal").innerText = `S/ ${total}`;
}
