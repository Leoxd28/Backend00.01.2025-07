console.log("Inicio de la aplicacion")
let arrKits = [];
const $table = $('#tblKits');
class Gundam {
    constructor(nombre, descripcion, escala, imagen, isCustom = false, custom = [],isFinalizado = false) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.escala = escala;
        this.imagen = imagen;
        this.isCustom = isCustom;
        this.custom = custom;
        this.isFinalizado = isFinalizado;
    }
    finalizaKit(){
        this.isFinalizado = true;
    }
}
window.operateEvents = {
    'click .finalizar': (e, value, row) => {
      finalizar(row)
    },
    'click .remover': (e, value, row) => {
      remover(row);
    }
    ,
    'click .editar': (e, value, row) => {
      editarKit(row);

    }
  }


async function editarKit(row){
    const index = arrKits.indexOf(row);
    let kit = arrKits[index];
    await pedirDatos(kit).then((obj) => {
        if (obj) {
            arrKits[index] = obj
            console.log(arrKits);
            $table.bootstrapTable('load', arrKits);
            localStorage.setItem("kits", JSON.stringify(arrKits))
        }
    })
}

function finalizar(row){
const index = arrKits.indexOf(row);
    let kit = arrKits[index];
    kit.finalizaKit();
    arrKits[index] = kit;
    console.log(arrKits);
    $table.bootstrapTable('load', arrKits);
    localStorage.setItem("kits", JSON.stringify(arrKits))
}
function remover(row){
    const index = arrKits.indexOf(row);
    if (index > -1) { // only splice array when item is found
        arrKits.splice(index, 1); // 2nd parameter means remove one item only
    }
    console.log(arrKits);
    $table.bootstrapTable('load', arrKits);
    localStorage.setItem("kits", JSON.stringify(arrKits))
}

const KitStore = function () {
    console.log("Inicio el KitStore")
    arrKits = JSON.parse(localStorage.getItem("kits"))
    $table.bootstrapTable({
        data: arrKits
    });
}();

function accionFormatter (value, row,index) {
    return [
      '<a class="finalizar" href="javascript:void(0)" title="Finalizar">',
      '<i class="fa fa-heart"></i>',
      '</a>  ',
      '<a class="remover" href="javascript:void(0)" title="Remover">',
      '<i class="fa fa-trash"></i>',
      '</a>',
      '<a class="editar" href="javascript:void(0)" title="Editar">',
      '<i class="fa fa-edit"></i>',
      '</a>'
    ].join('')
  }



let btnAgregar = document.getElementById("agregar")
console.log(btnAgregar);
btnAgregar.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Hizo click en agregar")
    await pedirDatos().then((obj) => {
        if (obj) {
            arrKits.push(obj);
            $table.bootstrapTable("load", arrKits);
            localStorage.setItem("kits", JSON.stringify(arrKits))
        }
    })

    console.log(arrKits)
})

$("#eliminarTodos").on("click", (e) => {
    e.preventDefault();

    if (arrKits.length !== 0) {

        Swal.fire({
            title: 'Deseas Borrar TODOS los Kits?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                arrKits = [];
                $table.bootstrapTable("load", arrKits);
                localStorage.setItem("kits", JSON.stringify(arrKits))
                Swal.fire('Guardado!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('No se ha realizado ninigun cambio', '', 'info')
            }
        })
    }
    else {
        Swal.fire('No hay ningun kit para borrar', '', 'info')
    }


})

function isCustomCheck(event) {
    if (event.checked) {
        console.log("Hizo check")
        $("#divCustom").toggle(1000)
    }
    else {
        console.log("No Hizo check")
        $("#divCustom").toggle(1000)
    }
}

function detailFormatter (index, row) {
    const html = []

    $.each(row, function (key, value) {
        console.log(key)
        switch (key) {
            case 'imagen':
                    html.push(`<img src="img/${value}" alt="" width="300px">`)
                break;
            case 'isCustom':
                if(value){
                    let strHtml = "<b>Modificaciones:</b><ul>";
                    row.custom.forEach(element => {
                        strHtml += `<li>${element}</li>`
                    });
                    strHtml += "</ul>"
                    html.push(`<p>${strHtml}</p>`)
                }
                break;
            case 'custom':
            break;
            case 'isFinalizado':
                if(value){
                 html.push(`<img src="img/finalizado.webp" alt="" width="300px">`)
                }
                else{
                    html.push(`<img src="img/noCompletado.jpg" alt="" width="300px">`)
                }
                break;
            default:
                html.push(`<p><b>${key}:</b> ${value}</p>`)
                break;
        }
    })
    return html.join('')
  }

async function pedirDatos(data = null) {

    console.log(data)
    if(data!==null){
                console.log(data)
                $("#nombre").val(data.nombre)
            }
    const { value: formValues } = await Swal.fire({
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
            <div class="form-group">
                <label class="checkbox-inline" for="checkboxes-0">
                    <input type="checkbox" id="chkIsCustom" onChange="isCustomCheck(this);" value="SI">
                    Si es Custom
                </label>
            </div>
            <div class="form-group" id="divCustom" style="display: none;">
                <input id="custom" type="text" placeholder="Cual es el custom" class="form-control input-md">
            </div>
            `,
        preConfirm: () => {
            
            return {
                nombre: $("#nombre").val(),
                descripcion: $("#descripcion").val(),
                escala: $("#escala").val(),
                imagen: $("#imagen").val(),
                isCustom: $("#chkIsCustom:checked").val() == "SI" ? true : false,
                custom: $("#custom").val()
            }
        }
    })
    if (formValues) {
        return new Gundam(formValues.nombre, formValues.descripcion, formValues.escala, formValues.imagen, formValues.isCustom, formValues.custom.split(","))
    }
    return null;
}