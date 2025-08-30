console.log("Inicio de la aplicacion")
let arrKits  = [];

class Gundam{
    #isFinalizado = false;
    constructor(nombre, descripcion, escala, imagen,isCustom=false, custom=[]){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.escala = escala;
        this.imagen = imagen;
        this.isCustom = isCustom;
        this.custom = custom;
    }
}

const KitStore = function(){
    console.log("Inicio el KitStore")
    arrKits = JSON.parse(localStorage.getItem("kits"))
    $("#tblKits").bootstrapTable({ data: arrKits });
}();

let btnAgregar = document.getElementById("agregar")
console.log(btnAgregar);
btnAgregar.addEventListener("click",async (e)=>{
    e.preventDefault();
    console.log("Hizo click en agregar")
    await pedirDatos().then((obj)=>{
       if(obj){
        arrKits.push(obj);
        $("#tblKits").bootstrapTable("load", arrKits);
        localStorage.setItem("kits",JSON.stringify(arrKits))
       }
    })

    console.log(arrKits)
})

$("#eliminarTodos").on("click",(e)=>{
    e.preventDefault();
    console.log("Hizo click en Eliminas todos")
    arrKits = [];
    $("#tblKits").bootstrapTable("load", arrKits);
    localStorage.setItem("kits",JSON.stringify(arrKits))
})

async function pedirDatos(data=null) {
    const {value: formValues} = await Swal.fire({
        title: "Ingresa los datos de tu kit",
        icon: "info",
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            html: `
            <input id="nombre" type="text" placeholder="Dime el Nombre" class="form-control input-md">
            <input id="descripcion" type="text" placeholder="Dime la descripcion" class="form-control input-md">
            <input id="escala" type="text" placeholder="Dime la escala" class="form-control input-md">
            <input id="imagen" type="text" placeholder="Dime la imagen" class="form-control input-md">
            <input id="isCustom" type="text" placeholder="Es o no es Custom" class="form-control input-md">
            <input id="custom" type="text" placeholder="Cual es el custom" class="form-control input-md">
            `,
            preConfirm: () => {
                return {
                    nombre: $("#nombre").val(),
                    descripcion: $("#descripcion").val(),
                    escala: $("#escala").val(),
                    imagen: $("#imagen").val(),
                    isCustom: $("#isCustom").val(),
                    custom: $("#custom").val()
                }
            }
        })
        if(formValues){
           return new Gundam(formValues.nombre, formValues.descripcion, formValues.escala,formValues.imagen, formValues.isCustom=="SI"?true:false, formValues.custom.split(","))
        }
        return null;
}