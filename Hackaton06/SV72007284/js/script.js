const imeisReportados = ["111111111111111", "222222222222222"];
const seriesReportadas = ["SN001", "SN002"];

const Storage = {
    guardarServicio(servicio) {
        const servicios = JSON.parse(localStorage.getItem("servicios")) || [];
        servicios.push(servicio);
        localStorage.setItem("servicios", JSON.stringify(servicios));
    },
    eliminarServicio(servicioAEliminar) {
        let servicios = JSON.parse(localStorage.getItem("servicios")) || [];
        servicios = servicios.filter(servicio => servicio.celular.imei !== servicioAEliminar.celular.imei);
        localStorage.setItem("servicios", JSON.stringify(servicios));
    },
    actualizarServicio(servicioActualizado) {
        let servicios = JSON.parse(localStorage.getItem("servicios")) || [];
        const index = servicios.findIndex(s => s.celular.imei === servicioActualizado.celular.imei);
        if (index !== -1) {
            servicios[index] = servicioActualizado;
            localStorage.setItem("servicios", JSON.stringify(servicios));
        }
    },
    obtenerServicios() {
        return JSON.parse(localStorage.getItem("servicios")) || [];
    },
    limpiar() {
        localStorage.removeItem("servicios");
    }
};

class Persona {
    constructor(nombre, apellido, dni) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
    }
}

class Cliente extends Persona {
    constructor(nombre, apellido, dni) {
        super(nombre, apellido, dni);
        this.codigo = this.generarCodigo();
    }

    generarCodigo() {
        return `${this.nombre.charAt(0)}${this.apellido.slice(0, 2)}${this.dni.slice(-3)}`.toUpperCase();
    }
}

class Tecnico extends Persona {
    constructor(nombre, apellido, dni, skills = []) {
        super(nombre, apellido, dni);
        this.skills = skills.map(skill => skill.toLowerCase());
        this.activo = true;
        this.asignados = 0;
    }

    puedeReparar(sistemaOperativo) {
        return this.skills.includes(sistemaOperativo.toLowerCase()) && this.activo;
    }

    asignar() {
        this.asignados++;
        if (this.asignados >= 20) this.activo = false;
    }
}

class Dispositivo {
    constructor(sistemaOperativo, modelo) {
        this.sistemaOperativo = sistemaOperativo;
        this.modelo = modelo;
    }
}

class Celular extends Dispositivo {
    constructor(sistemaOperativo, modelo, imei, serie) {
        super(sistemaOperativo, modelo);
        if (imeisReportados.includes(imei)) throw new Error("IMEI reportado.");
        if (seriesReportadas.includes(serie)) throw new Error("Número de serie reportado.");

        this.imei = imei;
        this.serie = serie;
        this.duenio = null;
    }

    asignarDuenio(cliente) {
        this.duenio = cliente;
    }
}

class Repuesto {
    constructor(nombre, costo) {
        this.nombre = nombre;
        this.costo = costo;
    }
}

class Servicio {
    constructor(celular, tecnico) {
        this.celular = celular;
        this.tecnico = tecnico;
        this.diagnosticoInicial = null;
        this.autorizado = false;
        this.abono = 0;
        this.repuestos = [];
        this.estado = "Ingresado";
    }

    agregarDiagnostico(desc, costo) {
        if (this.diagnosticoInicial) throw new Error("Ya existe un diagnóstico inicial.");
        this.diagnosticoInicial = { desc, costo };
        this.estado = "Diagnóstico inicial registrado";
    }

    autorizarServicio(abono) {
        if (!this.diagnosticoInicial) throw new Error("Primero registra un diagnóstico.");
        const requerido = this.diagnosticoInicial.costo * 0.5;
        if (abono < requerido) throw new Error(`Se requiere al menos el 50% (${requerido})`);
        this.abono = abono;
        this.autorizado = true;
        this.estado = "Autorizado para reparación";
    }

    agregarRepuesto(repuesto) {
        if (!this.autorizado) throw new Error("No autorizado.");
        this.repuestos.push(repuesto);
        this.estado = "Repuestos en reparación";
    }

    cambiarEstado(nuevoEstado) {
        this.estado = nuevoEstado;
    }

    resumen() {
        return {
            celular: this.celular,
            tecnico: this.tecnico,
            cliente: this.celular.duenio,
            diagnostico: this.diagnosticoInicial,
            abono: this.abono,
            repuestos: this.repuestos,
            estado: this.estado
        };
    }
}

const arrTecnicos = [
    new Tecnico("Luis", "Gómez", "11223344", ["Android"]),
    new Tecnico("Rosa", "Delgado", "22334455", ["iOS"]),
    new Tecnico("Pedro", "Salas", "33445566", ["Android", "iOS"])
];

function cargarTabla() {
    const servicios = Storage.obtenerServicios();
    $('#tblServicios').bootstrapTable('load', servicios.map(s => ({
        cliente: `${s.cliente.nombre} ${s.cliente.apellido}`,
        modelo: s.celular.modelo,
        imei: s.celular.imei,
        diagnostico: s.diagnostico ? s.diagnostico.desc : "Pendiente",
        estado: s.estado,
        accion: "",
        _fullData: s
    })));
}

$("#btnAgregar").on("click", () => {
    Swal.fire({
        title: "Nuevo Servicio",
        html: `
            <div class="form-group">
                <input id="nombre" type="text" placeholder="Nombre Cliente" class="form-control input-md">
            </div>
            <div class="form-group">
                <input id="apellido" type="text" placeholder="Apellido Cliente" class="form-control input-md">
            </div>
            <div class="form-group">
                <input id="dni" type="text" placeholder="DNI" class="form-control input-md">
            </div>
            <div class="form-group">
                <input id="sistemaOperativo" type="text" placeholder="Android/iOS" class="form-control input-md">
            </div>
            <div class="form-group">
                <input id="modelo" type="text" placeholder="Modelo del celular" class="form-control input-md">
            </div>
            <div class="form-group">
                <input id="imei" type="text" placeholder="IMEI" class="form-control input-md">
            </div>
            <div class="form-group">
                <input id="serie" type="text" placeholder="Número de serie" class="form-control input-md">
            </div>
            <div class="form-group">
                <input id="diag" type="text" placeholder="Diagnóstico inicial" class="form-control input-md">
            </div>
            <div class="form-group">
                <input id="costo" type="number" placeholder="Costo (S/)" class="form-control input-md">
            </div>
            <div class="form-group">
                <input id="abono" type="number" placeholder="Abono inicial (S/)" class="form-control input-md">
            </div>

            <div class="form-group">
                <label class="checkbox-inline" for="chkRepuesto">
                    <input type="checkbox" id="chkRepuesto" onChange="toggleRepuesto(this);" value="SI">
                    ¿Agregar repuesto?
                </label>
            </div>
            <div class="form-group" id="divRepuesto" style="display: none;">
                <input id="repuesto" type="text" placeholder="Nombre del repuesto" class="form-control input-md">
                <input id="costoRepuesto" type="number" placeholder="Costo del repuesto (S/)" class="form-control input-md mt-2">
            </div>
        `,
        confirmButtonText: "Guardar",
        preConfirm: () => {
            const cliente = new Cliente(
                $("#nombre").val(),
                $("#apellido").val(),
                $("#dni").val()
            );

            const celular = new Celular(
                $("#sistemaOperativo").val(),
                $("#modelo").val(),
                $("#imei").val(),
                $("#serie").val()
            );
            celular.asignarDuenio(cliente);

            const tecnico = arrTecnicos.find(t => t.puedeReparar(celular.sistemaOperativo) && t.activo !== false);
            console.log(tecnico);
            if (tecnico) {
                tecnico.asignar();
            } else {
                Swal.fire("Sin técnicos disponibles", "No hay técnicos activos con esa habilidad.", "warning");
            }

            const servicio = new Servicio(celular, tecnico);
            servicio.agregarDiagnostico($("#diag").val(), Number($("#costo").val()));
            servicio.autorizarServicio(Number($("#abono").val()));

            Storage.guardarServicio(servicio.resumen());
        }
    }).then(result => {
        if (result.isConfirmed) {
            Swal.fire("Servicio agregado", "", "success");
            cargarTabla();
        }
    });
});

function toggleRepuesto(checkbox) {
    const div = document.getElementById("divRepuesto");
    if (checkbox.checked) {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
}

$("#btnEliminarTodos").on("click", () => {
    Swal.fire({
        title: "¿Seguro?",
        text: "Esto eliminará todos los servicios",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar"
    }).then(res => {
        if (res.isConfirmed) {
            Storage.limpiar();
            cargarTabla();
            Swal.fire("Eliminado", "Todos los servicios fueron borrados", "success");
        }
    });
});

function accionFormatter() {
    return `
        <button class="btn btn-info btn-sm ver"><i class="bi bi-eye-fill"></i></button>
        <button class="btn btn-danger btn-sm borrar"><i class="bi bi-x-circle-fill"></i></button>
        <button class="btn btn-success btn-sm editar"><i class="bi bi-pencil-square"></i></button>
    `;
}

window.operateEvents = {
    'click .ver': function (e, value, row) {
        const fullData = row._fullData;
        Swal.fire({
            title: "Detalle del Servicio",
            html: `
                <b>Cliente:</b> ${fullData.cliente.nombre} ${fullData.cliente.apellido}<br>
                <b>Código de Cliente:</b> ${fullData.cliente.codigo}<br>
                <b>Modelo:</b> ${fullData.celular.modelo}<br>
                <b>IMEI:</b> ${fullData.celular.imei}<br>
                <b>Diagnóstico:</b> ${fullData.diagnostico ? fullData.diagnostico.desc : 'Pendiente'}<br>
                <b>Técnico:</b> ${fullData.tecnico ? `${fullData.tecnico.nombre} ${fullData.tecnico.apellido}` : 'Sin asignar'}<br>
                <b>Estado:</b> ${fullData.estado}
            `
        });
    },
    
    'click .borrar': function (e, value, row) {
        const fullData = row._fullData;
        Swal.fire({
            title: "¿Seguro?",
            text: `Esto eliminará el servicio del cliente: ${fullData.cliente.codigo}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar"
        }).then(res => {
            if (res.isConfirmed) {
                Storage.eliminarServicio(fullData);
                cargarTabla();
                Swal.fire("Eliminado", `El servicio del cliente ${fullData.cliente.codigo} se ha borrado`, "success");
            }
        });
    },

    'click .editar': async function (e, value, row) {
        const fullData = row._fullData;
        const { value: formValues } = await Swal.fire({
            title: 'Editar Servicio',
            html:`
                <div class="form-group">
                    <label>Diagnóstico:</label>
                    <input id="fullData-input-diag" class="form-control input-md" value="${fullData.diagnostico.desc}">
                </div>
                <div class="form-group">
                    <label>Costo:</label>
                    <input id="fullData-input-costo" type="number" class="form-control input-md" value="${fullData.diagnostico.costo}">
                </div>
                <div class="form-group">
                    <label>Abono:</label>
                    <input id="fullData-input-abono" type="number" class="form-control input-md" value="${fullData.abono}">
                </div>
                <div class="form-group">
                    <label>Estado:</label>
                    <select id="fullData-select-estado" class="form-control input-md">
                        <option value="Ingresado">Ingresado</option>
                        <option value="Diagnóstico inicial registrado">Diagnóstico inicial registrado</option>
                        <option value="Autorizado para reparación">Autorizado para reparación</option>
                        <option value="Repuestos en reparación">Repuestos en reparación</option>
                        <option value="Reparado">Reparado</option>
                        <option value="Entregado">Entregado</option>
                    </select>
                </div>
                `,
            focusConfirm: false,
            preConfirm: () => {
                const newDiag = document.getElementById('fullData-input-diag').value;
                const newCosto = parseFloat(document.getElementById('fullData-input-costo').value);
                const newAbono = parseFloat(document.getElementById('fullData-input-abono').value);
                const newEstado = document.getElementById('fullData-select-estado').value;

                if (!newDiag || isNaN(newCosto) || isNaN(newAbono)) {
                    Swal.showValidationMessage(`Por favor, complete todos los campos.`);
                    return false;
                }

                return {
                    diag: newDiag,
                    costo: newCosto,
                    abono: newAbono,
                    estado: newEstado
                };
            }
        });

        if (formValues) {
            fullData.diagnostico.desc = formValues.diag;
            fullData.diagnostico.costo = formValues.costo;
            fullData.abono = formValues.abono;
            fullData.estado = formValues.estado;
            
            Storage.actualizarServicio(fullData);
            cargarTabla();
            Swal.fire('¡Actualizado!', 'El servicio ha sido actualizado.', 'success');
        }
    }
};

$(document).ready(() => {
    cargarTabla();
});
function detailFormatter(index, row) {
    const data = row._fullData;

    let html = [];

    html.push(`<b>Cliente:</b> ${data.cliente.nombre} ${data.cliente.apellido} (DNI: ${data.cliente.dni})<br>`);
    html.push(`<b>Modelo:</b> ${data.celular.modelo} - <b>SO:</b> ${data.celular.sistemaOperativo}<br>`);
    html.push(`<b>IMEI:</b> ${data.celular.imei} | <b>Serie:</b> ${data.celular.serie}<br>`);
    html.push(`<b>Técnico asignado:</b> ${data.tecnico.nombre} ${data.tecnico.apellido}<br>`);

    if (data.diagnostico) {
        html.push(`<b>Diagnóstico:</b> ${data.diagnostico.desc}<br>`);
        html.push(`<b>Costo estimado:</b> S/ ${data.diagnostico.costo}<br>`);
        html.push(`<b>Abono inicial:</b> S/ ${data.abono}<br>`);
    } else {
        html.push(`<b>Diagnóstico:</b> Pendiente<br>`);
    }

    html.push(`<b>Estado actual:</b> <span class="estado-servicio">${data.estado}</span><br>`);

    return html.join("");
}