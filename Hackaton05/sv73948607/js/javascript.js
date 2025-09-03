

class datoverficacion {
    constructor(tipo, inhabilitado = false) {
        this.tipo = tipo
        this.inhabilitado = inhabilitado
    }
}
class telefono {
    constructor(tiopodecel, verificacion, entradas, pantalla, bateria, procesador, operatorio) {
        this.tiopodecel = tiopodecel
        this.entradas = entradas
        this.pantalla = pantalla
        this.bateria = bateria
        this.procesador = procesador
        this.operatorio = operatorio
        this.verificacion = verificacion
    }

}

function verificar(verificacion) {
    if (verificacion.inhabilitado == true) {
        console.log("Este dispostivo se encuntra inhabilitado")
    }
    else {
        console.log("Este dispositivo se ecnutra habilitado")
    }
}

class dinero {
    constructor(plata, suficiente = false) {
        this.plata = plata
        this.suficiente = suficiente
    }
}
class usuario {
    constructor(nombre, apellido, telefono, abono, autorizacion) {
        this.nombre = nombre
        this.apellido = apellido
        this.telefono = telefono
        this.abono = abono
        this.autorizacion = autorizacion
    }
}
function abanosuficiente(abono) {
    if (abono < 50) {
        abono.suficiente = false
        console.log("lo abonado no es suficiente")
    }
    else {
        abono.suficiente = true
        console.log("lo abonado es suficiente")
    }
}

class tecnico {
    constructor(nombre, apellido, sede, arrespecialidad = [], arrhabilidad = []) {
        this.nombre = nombre
        this.apellido = apellido
        this.sede = sede
        this.especialidad = arrespecialidad
        this.habilidad = arrhabilidad
    }
}

let tecnico1 = new tecnico("Ryan", "Verde", "centrl", ["samsung", "xiaomi"], ["pantalla", "bateria"])
let tecnico2 = new tecnico("Axel", "Barazorda", "sur", ["xiaomi"], ["entrada", "pantalla", "bateria", "porsesador"])
let tecnico3 = new tecnico("Samuel", "Derve ", "norte", ["Samsung"], ["pantalla", "bateria", "procesador", "operatorio"])
let tecnico4 = new tecnico("Neal", "Rozarda", "central", ["Samsung", "xiaomi"], ["pantalla", "operatorio"])
let tecnico5 = new tecnico("reat", "santer", "sur", ["samsung"], ["operatorios", "pantalla"])
let tecnico6 = new tecnico("benjaz", "lanaos", "norte", ["xiaomi"], ["opertarios,pantalla"])
let tecnico7 = new tecnico("leo", "sifuentes", "central", ["xiaomi"], ["pantalla", "bateria", "operacional"])
let tecnico8 = new tecnico("Samuel", "cruz", "central", ["samsung"], ["pantalla,bateria", "entrada"])


document.addEventListener("DOMContentLoaded", () => {
    // Botón que crea el formulario dinámicamente
    const boton = document.getElementById("abrirDiagnostico");
    boton.addEventListener("click", diagnosticoCelular);
});

async function diagnosticoCelular() {
    const { value: formValues } = await Swal.fire({
        title: "Formulario de diagnóstico",
        icon: "info",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        html: `
            <div class="mb-3">
                <label for="tipoCel" class="form-label">Tipo de celular</label>
                <input id="tipoCel" type="text" class="form-control" placeholder="Ej: Samsung A10">
            </div>

            <div class="mb-3">
                <label class="form-label">Problemas detectados</label>

                <div class="mb-2">
                    <label for="pantalla" class="form-label">Pantalla</label>
                    <input id="pantalla" type="text" class="form-control" placeholder="escribir NO si no hay probemas">
                </div>

                <div class="mb-2">
                    <label for="bateria" class="form-label">Batería</label>
                    <input id="bateria" type="text" class="form-control" placeholder="escribir NO si no hay problemas">
                </div>

                <div class="mb-2">
                    <label for="entrada" class="form-label">Entradas</label>
                    <input id="entrada" type="text" class="form-control" placeholder="escribir NO si no hay problemas">
                </div>

                <div class="mb-2">
                    <label for="procesador" class="form-label">Procesador</label>
                    <input id="procesador" type="text" class="form-control" placeholder="escribir NO si no hay problema">
                </div>

                <div class="mb-2">
                    <label for="operatorio" class="form-label">Operatorio</label>
                    <input id="operatorio" type="text" class="form-control" placeholder="(escribir NO si no hay problea">
                </div>
            </div>

            <div class="mb-3">
                <label for="observaciones" class="form-label">Observaciones</label>
                <textarea id="observaciones" class="form-control" rows="3" placeholder="Detalles adicionales"></textarea>
            </div>
        `,
        preConfirm: () => {
            return {
                tipoCel: document.getElementById("tipoCel").value,
                pantalla: document.getElementById("pantalla").value,
                bateria: document.getElementById("bateria").value,
                entrada: document.getElementById("entrada").value,
                procesador: document.getElementById("procesador").value,
                operatorio: document.getElementById("operatorio").value,
                observaciones: document.getElementById("observaciones").value
            };
        }

    }

    );

    if (!formValues)return;
    
        let telefono1 = new telefono(
            formValues.tipoCel,
            new datoverficacion(12432, false), // o según tu lógica
            formValues.entrada,
            formValues.pantalla,
            formValues.bateria,
            formValues.procesador,
            formValues.operatorio

           
        );
let arrayproblemas = []
let arraysano=[]
Object.entries(telefono1).forEach(([contenido, respuesta]) => {
    if (!["tiopodecel", "verificacion"].includes(contenido) && respuesta.trim() !== ""&& respuesta !=="NO") {
        arrayproblemas.push(contenido)
    }
})
Object.entries(telefono1).forEach(([contenido,respuesta])=>{
    if(respuesta=="NO")
        arraysano.push(contenido)
})
let listatecnicos = [tecnico1, tecnico2, tecnico3, tecnico4, tecnico5, tecnico6, tecnico7, tecnico8]
let listaTelefonos = [];
if (formValues) {
    listaTelefonos.push(telefono1);
    
}

let mejortecnico = null
let maxcoincidencia = 0
listatecnicos.forEach(tecnico => {
    let coincidencia = 0;
    arrayproblemas.forEach(problema => {
        if (tecnico.habilidad.includes(problema)) {
            coincidencia++
        }
    }
    )
    if (coincidencia > maxcoincidencia) {
        maxcoincidencia = coincidencia
        mejortecnico = tecnico
    }
})



const repuestos = {
    entrada: "cambio de entradas",
    pantalla: "pantalla nueva",
    bateria: "bateria nueva",
    procesador: "compro otro procesador",
    operatorio: "cambio de botones",
}

let respuestoncesarios = []
arrayproblemas.forEach(problema => {
    if (repuestos[problema]) {
        respuestoncesarios.push(repuestos[problema])
    }
})

let guardardatos=[]
  arraysano.forEach(gurdar=>{
    guardardatos.push(gurdar+":"+"BIEN")
  })
if (formValues) {
    console.log("Datos capturados:", formValues);


    const usuarioForm = await formularioUsuario(); 

    if (!usuarioForm) return;
    
    await mostrarResumen(usuarioForm, arrayproblemas, respuestoncesarios, mejortecnico,guardardatos)
    await mostrarResumenDetallado(telefono1);
    await swal.fire()
    await Finalizar(final)
}

}

async function formularioUsuario() {
    const { value: formValues } = await Swal.fire({
        title: "Formulario de diagnóstico",
        icon: "info",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        html: `
            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input id="nombre" type="text" class="form-control" placeholder="Ej: Ryan">
            </div>

              <div class="mb-3">
                <label for="apellido" class="form-label">Apellido</label>
                <input id="apellido" type="text" class="form-control" placeholder="Ej: Verde">
            </div>
               <div class="mb-3">
                <label for="abono" class="form-label">Abono</label>
                <input id="abono" type="text" class="form-control" placeholder="Ej: 100 maximo">
            </div>
               <div class="mb-3">
                <label for="autorizacion" class="form-label">Autorizacion escrita</label>
                <input id="autorizacion" type="text" class="form-control" placeholder="Ej: en caso de no atuorizar dejar en blanco">
            </div>
            <div class="mb-3">
            <label for="numerocel" class="form-label">numero de celular</label>
            <input id="numerocel" type="text" class="form-control" placeholder="Ej: 234235334">
            </div>
            `,
            preConfirm: () => {
                return {
                    nombre: document.getElementById("nombre").value,
                    apellido: document.getElementById("apellido").value,
                    abono: document.getElementById("abono").value,
                    autorizacion: document.getElementById("autorizacion").value,
                    numerocel: document.getElementById("numerocel").value,
                };
            }
        });
        return formValues;
    }
    
async function mostrarResumen(formValues, problemas, repuestos, tecnico,guardardatos) {
    let resumen = `
        <h3>📋 Resumen del registro</h3>
        <p><b>Nombre:</b> ${formValues.nombre}</p>
        <p><b>Apellido:</b> ${formValues.apellido}</p>
        <p><b>Celular:</b> ${formValues.numerocel}</p>
        <p><b>Problemas:</b> ${problemas.length > 0 ? problemas.join(", ") : "Ninguno"}</p>
        <p><b>Repuestos necesarios:</b> ${repuestos.length > 0 ? repuestos.join(", ") : "Ninguno"}</p>
        <p><b>Tecnico:</b>${tecnico ? tecnico.nombre : "ninguno"}</p>
        <p><b>areas:</b> ${guardardatos.length > 0 ? guardardatos.join(", ") : "Ninguno"}</p>
        `;

    await Swal.fire({
        title: "✅ Registro completado",
        html: resumen,
        icon: "success",
        confirmButtonText: "Finalizar"
    });
}
async function mostrarResumenDetallado(telefono) {
    // Mapeamos cada parte del celular con su estado
    let partes = {
        pantalla: telefono.pantalla,
        bateria: telefono.bateria,
        entradaa: telefono.entrada,
        operatorio: telefono.operatorio,
        procesador: telefono.procesador,
    };


       
async function Finalizar(final){
    await Swal.fire({
        title: "🔎 Diagnóstico detallado",
        html: detallesHtml,
        icon: "info",
        confirmButtonText: "Cerrar"
    });
 
}
}
