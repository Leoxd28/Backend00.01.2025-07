
arraytelefono = []
class telefono {
    constructor(tipo,verificacion, entradas, bateria, pantalla, software, subajavolumen) {
        this.tipo=tipo
        this.verificacion = verificacion
        this.entradas = entradas
        this.bateria = bateria
        this.pantalla = pantalla
        this.software = software
        this.subajavolumen = subajavolumen
    }
}

class usuario {
    constructor(nombre, apellido, año, contacto, abono) {
        this.nombre= nombre
        this.apellido= apellido
        this.año= año
        this.contacto = contacto
        this.abono = abono
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
let tecnico2 = new tecnico("Axel", "Barazorda", "sur", ["xiaomi"], ["entradas", "pantalla", "bateria", "software"])
let tecnico3 = new tecnico("Samuel", "Derve ", "norte", ["Samsung"], ["pantalla", "bateria", "software", "subajavolumen"])
let tecnico4 = new tecnico("Neal", "Rozarda", "central", ["Samsung", "xiaomi"], ["pantalla", "subajavolumen"])
let tecnico5 = new tecnico("reat", "santer", "sur", ["samsung"], ["subajavolumen", "pantalla"])
let tecnico6 = new tecnico("benjaz", "lanaos", "norte", ["xiaomi"], ["subajavolumen,pantalla"])
let tecnico7 = new tecnico("leo", "sifuentes", "central", ["xiaomi"], ["pantalla", "bateria", "subajavolumen"])
let tecnico8 = new tecnico("Samuel", "cruz", "central", ["samsung"], ["pantalla,bateria", "entradas"])
const repuestos = {
        entradas: "cambio de entradas",
        pantalla: "pantalla nueva",
        software: "nuevo software",
         bateria: "compro otro bateria",
        subajavolumen: "cambio de botones",
}
ultimousario=""
problemas=[]
guardardatos=[]
arrayproblemas=[]
arraysano=[]
repuestosnecesarios=[]
recepcion=[]
objreception=[]
aprobo=[]
let mejortecnico = null
let maxcoincidencia = 0
listatecnicos=[tecnico1,tecnico2,tecnico3,tecnico4,tecnico5,tecnico6,tecnico7,tecnico8]
const fono = function(){
    return arraytelefono=JSON.parse(localStorage.getItem("cliente"))
}

let boton= document.getElementById("boton")
boton.addEventListener("click",async(e)=>{
    e.preventDefault();
    const obj= await pedirDatos()
        if(obj){   
            
            Object.entries(obj).forEach(([contenido, respuesta]) => {
                if (!["tipo", "verificacion"].includes(contenido) && respuesta.trim() !== ""&& respuesta !=="NO") {
                    arrayproblemas.push(contenido)
                }
            })
            Object.entries(obj).forEach(([contenido,respuesta])=>{
                if(respuesta=="NO")
                    arraysano.push(contenido)
            })
            arraytelefono.push(obj)   
        }      
    
listatecnicos.forEach(tecnico => {
    let coincidencia = 0;
    arrayproblemas.forEach(problema => {
        if (tecnico.habilidad.includes(problema)){ 
            coincidencia++
        }
        })
    if(coincidencia > maxcoincidencia) {
        maxcoincidencia = coincidencia
        mejortecnico = tecnico

    }
    })
    recepcion.push(mejortecnico)
arrayproblemas.forEach(problema => {
    if (repuestos[problema]) {
        repuestosnecesarios.push(repuestos[problema])
    }
})
objreception=recepcion


arraysano.forEach(gurdar=>{
    guardardatos.push(gurdar+":"+"BIEN")
  })
  recepcion.push(repuestosnecesarios)
  await pedirUsuario().then((obj)=>{
    if(obj){
        arraytelefono.push(obj)
    }
})

 ultimousario=arraytelefono[arraytelefono.length-1]

 
 await mostrarResumen(ultimousario,arrayproblemas,repuestosnecesarios,mejortecnico,guardardatos)

 arraytelefono.push(objreception)
 
 await mostrarCubos()
  
  arraytelefono.push(aprobo)
})





async function pedirDatos(data=null) {
 const{value:formvalues} = await Swal.fire({
title:"Ingresa datos del telefono",
icon:"info",
showCloseButton:"true",
showCancelButton:"true",
confirmButtonText:"Guardar",
cancelButtonText:"Cancelar",
html:`
<div class="mb-3">
<label for="tipo" class="form-label">Tipo</label>
<input id="tipo" type="text" placeholder="Escribir tipo de celular" class="form-control" input-md"> 
</div>
<div class="mb-3">
<label for="comprobante" class="form-label">IDM</label>
<input id="verificacion" type="text" placeholder="IDM " class="form-control" input-md"> 
</div>
<div class="mb-3">
<label for="pantalla" class="form-label">Pantalla</label>
<input id="pantalla" type="text" placeholder="si esta bien escribir NO" class="form-control" input-md"> 
</div>
<div class="mb-3">
<label for="entradas" class="form-label">Entradas</label>
<input id="entradas" type="text" placeholder="si esta bien escribir NO" class="form-control" input-md"> 
</div>
<div class="mb-3">
<label for="subajabolumen" class="form-label">Volumen sube y baja</label>
<input id="subajavolumen" type="text" placeholder="si esta bien escribri NO" class="form-control" input-md"> 
</div>
<div class="mb-3">
<label for="software" class="form-label">Software</label>
<input id="software" type="text" placeholder="si esta bien escribir NO" class="form-control" input-md"> 
</div>
<div class="mb-3">
<label for="bateria" class="form-label">Bateria</label>
<input id="bateria" type="text" placeholder="si esta bien escribir NO" class="form-control" input-md"> 
</div>
`,
preConfirm:()=>{
    return{
    tipo: $("#tipo").val(),
    verificacion: $("#verificacion").val(),
    pantalla: $("#pantalla").val(),
    entradas: $("#entradas").val(),
    subajavolumen: $("#subajavolumen").val(),
    software:$("#software").val(),
    bateria:$("#bateria").val(),   
}
}
})
if(formvalues){
    return new telefono (formvalues.tipo,formvalues.verificacion,formvalues.pantalla,formvalues.entradas,formvalues.subajavolumen,formvalues.software,formvalues.bateria)

}
}


async function pedirUsuario(data=null) {
 const{value:formvalues} = await Swal.fire({
title:"Ingresa datos del telefono",
icon:"info",
showCloseButton:"true",
showCancelButton:"true",
confirmButtonText:"Guardar",
cancelButtonText:"Cancelar",
html:`
<div class="mb-3">
<label for="nombre" class="form-label">Nombre</label>
<input id="nombre" type="text" placeholder="Escribir Nombre" class="form-control" input-md"> 
</div>
<div class="mb-3">
<label for="apellido" class="form-label">Apellido</label>
<input id="apellido" type="text" placeholder="Escribir Apellido " class="form-control" input-md"> 
</div>
<div class="mb-3">
<label for="año" class="form-label">Año</label>
<input id="año" type="text" placeholder="Escribir edad" class="form-control" input-md"> 
</div>
<div class="mb-3">
<label for="abono" class="form-label">Abono</label>
<input id="abono" type="text" placeholder="Escribir plata paada" class="form-control" input-md"> 
</div>
<div class="mb-3">
<label for="contacto" class="form-label">Contacto</label>
<input id="contacto" type="text" placeholder="Escribir forma de contactar" class="form-control" input-md"> 
</div>
`,
preConfirm:()=>{
    return{
    nombre: $("#nombre").val(),
    apellido: $("#apellido").val(),
    año: $("#año").val(),
    abono: $("#abono").val(),
    contacto: $("#contacto").val(),
}

}
})
if(formvalues){
    return new usuario(formvalues.nombre,formvalues.apellido,formvalues.año,formvalues.abono,formvalues.contacto,)}

}   

 async function mostrarResumen(ultimousario ,arrayproblemas, repuestosnecesarios, mejortecnico,guardardatos) {
    let resumen = `
        <h3>📋 Resumen del registro</h3>
        <p><b>Nombre:</b> ${ultimousario.nombre}</p>
        <p><b>Apellido:</b> ${ultimousario.apellido}</p>
        <p><b>Contacto:</b> ${ultimousario.contacto}</p>
        <p><b>Problemas:</b> ${arrayproblemas.length > 0 ? arrayproblemas.join(", ") : "Ninguno"}</p>
        <p><b>Repuestos necesarios:</b> ${repuestosnecesarios.length > 0 ? repuestosnecesarios.join(", ") : "Ninguno"}</p>
        <p><b>Tecnico:</b>${mejortecnico ? mejortecnico.nombre : "ninguno"}</p>
        <p><b>areas:</b> ${guardardatos.length > 0 ? guardardatos.join(", ") : "Ninguno"}</p>
        `;

    await Swal.fire({
        title: "✅ Registro completado",
        html: resumen,
        icon: "success",
        confirmButtonText: "Finalizar"
    });
}
async function mostrarCubos() {
    await Swal.fire({
        title: "📦 Información de los cubos",
        html: `
            <div id="primero" style="background-color: #3498db; color: white; padding: 20px; margin-bottom: 10px; border-radius: 10px;">
                <h3>VERIFICACION/h3>
                <p>VERDE APROBO,ROJO DESAPROBO</p>
            </div>
            <div id="segundo" style="background-color: #e74c3c; color: white; padding: 20px; border-radius: 10px;">
                <h3>ABONO</h3>
                <p>VERDE APROBO , ROJO DESAPROBO</p>
            </div>
        `,
        showCloseButton: true,
        confirmButtonText: "Aceptar",
        didOpen: () => {
            const primero = Swal.getPopup().querySelector("#primero");
            const segundo = Swal.getPopup().querySelector("#segundo");

            if (ultimousario.abono > 100) {
                primero.style.backgroundColor = "#d41d10ff";
                let prueba=desaprobo
                aprobar.push(prueba)
                
            } else {
                primero.style.backgroundColor = "#37d410ff";
              let prueba=aprobo
                aprobar.push(prueba)
            }

            if (obj.verificacion.length > 6) {
                segundo.style.backgroundColor = "#d41d10ff";
                    let prueba=desaprobo
                aprobar.push(prueba)           
            } else {
                segundo.style.backgroundColor = "#37d410ff";
                  let prueba=aprobo
                aprobar.push(prueba)
            }
        }
    });

}