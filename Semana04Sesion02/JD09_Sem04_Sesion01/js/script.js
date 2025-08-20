console.log("Inicio de la aplicacion");
let arrCliente = [];
document.getElementById("crearPedido").addEventListener("click", recibirPedido2)

function recibirPedido() {
    console.log("Hizo Click");
    let nombre = prompt("Dime tu nombre");
    let objCliente = {
        nombre
    }

    let producto = prompt(`Escoja el Producto:
        1 ----> Cafe
        2 ----> Postre`);
    switch (producto) {
        case "1":
            let tipoCafe = parseInt(prompt(`Dime tu tipo de cafe: 1=Americano, 2=Expreso, 3=Latte`));
            console.log(tipoCafe)
            switch (tipoCafe) {
                case 1:
                    objCliente.cafe = { tipo: "Americano" }
                    objCliente = preguntarAzucar(objCliente);
                    objCliente = preguntarLeche(objCliente);
                    break;
                case 2:
                    objCliente.cafe = { tipo: "Expreso" }
                    objCliente = preguntarAzucar(objCliente);
                    break;
                case 3:
                    objCliente.cafe = { tipo: "Latte" }
                    objCliente = preguntarAzucar(objCliente);
                    objCliente = preguntarLeche(objCliente);
                    break;
                default:
                    break;
            }

            break;
        case "2":
            let tipoPostre = parseInt(prompt("Dime tu postre: 1=Torta de Chocolate, 2=Criossant, 3=Triple"))
            switch (tipoPostre) {
                case 1:
                    objCliente.postre = { tipo: "Torta de Chocolate" }
                    break;
                case 2:
                    objCliente.postre = { tipo: "Criossant" }
                    break;
                case 3:
                    objCliente.postre = { tipo: "Triple" }
                    break;
                default:
                    break;
            }
            break;
        default:
            alert("Opcion No Valida")
            break;
    }
    arrCliente.push(objCliente)
    console.log(arrCliente)
    let html = JSON2HTMLList(arrCliente);
    console.log(html)
    document.getElementById("comandas").appendChild(html)
}

function preguntarAzucar(objCliente) {
    let respuesta = prompt("Quieres Azucar 1:SI, 2:NO")
    if (respuesta === "1") {
        let tipoAzucar = prompt("1:Azucar Morena, 2=Azucar Blanca, 3:Stevia")
        switch (tipoAzucar) {
            case "1":
                objCliente.cafe.azucar = true;
                objCliente.cafe.tipoazucar = "Azucar Morena"
                break;
            case "2":
                objCliente.cafe.azucar = true;
                objCliente.cafe.tipoazucar = "Azucar Blanca"
                break;
            case "3":
                objCliente.cafe.azucar = true;
                objCliente.cafe.tipoazucar = "Stevia"
                break;

            default:
                break;
        }
    }
    return objCliente;
}
function preguntarLeche(objCliente) {
    let respuesta = prompt("Que tipo de leche quieres: 0:sin leche, 1:Normal, 2:Leche de Soya o 3:Leche de Almendras")

    switch (respuesta) {
        case "1":
            objCliente.cafe.leche = true;
            objCliente.cafe.tipoleche = "Normal"
            break;
        case "2":
            objCliente.cafe.leche = true;
            objCliente.cafe.tipoleche = "Leche de Soya"
            break;
        case "3":
            objCliente.cafe.leche = true;
            objCliente.cafe.tipoleche = "Leche de Almendras"
            break;
        default:
            break;
    }

    return objCliente;
}

function recibirPedido2() {
    let cliente = prompt("Dime tu Nombre");
    let objCliente = {
        nombre: cliente
    }
    objCliente = addProducto(objCliente);
    objCliente = addExtra("Leche",objCliente);
    objCliente = addExtra("Azucar", objCliente);
    objCliente = addExtra("Toppins", objCliente);


    arrCliente.push(objCliente)
    console.log(arrCliente)
    let html = JSON2HTMLList(arrCliente);
    console.log(html)
    document.getElementById("comandas").innerHTML = "";
    document.getElementById("comandas").appendChild(html) ;
}

let arrProductos = [
    {
        id: "cafe",
        opciones: [
            "Americano", "Expreso", "Latte", "Mocca"
        ]
    },
    {
        id: "postres",
        opciones: [
            "Torta de Chocolate", "Croissant", "Triple"
        ]
    }
]

let arrExtras = [
    {
        id: "Leche",
        opciones: [
            "Normal", "Leche de Almendras", "Leche de Soya"
        ]
    },
    {
        id: "Azucar",
        opciones: [
            "Azucar Morena", "Azucar Blanca", "Stevia"
        ]
    },
    {
        id: "Toppins",
        opciones: [
            "Crema", "Chocolate", "Vainilla"
        ]
    }
]

function addProducto(objCliente) {
    let strListaProductos = `escoge tu producto \n`;
    for (let index = 0; index < arrProductos.length; index++) {
        const element = arrProductos[index].id;
        strListaProductos += `${index} = ${element} \n`;
    }
    console.log(strListaProductos)
    let opcion = prompt(strListaProductos);
    console.log(opcion)
    strListaProductos = "";
    let tipoProducto;
    let strProducto;
    for (let index = 0; index < arrProductos.length; index++) {
        if (index == parseInt(opcion)) {
            strProducto = arrProductos[index].id;
            tipoProducto = arrProductos[index].opciones;
            break;
        }

    }
    console.log(tipoProducto)
    for (let index = 0; index < tipoProducto.length; index++) {
        const element = tipoProducto[index];
        strListaProductos += `${index} = ${element} \n`
    }
    console.log(strListaProductos)
    opcion = prompt(strListaProductos);
    console.log(opcion)
    for (let index = 0; index < tipoProducto.length; index++) {
        if (index == opcion) {
            const element = tipoProducto[index];
            objCliente[strProducto] = element;
            break;
        }

    }
    console.log(objCliente);
    return objCliente;
}

function addExtra(extra, objCliente){
    let respuesta = prompt(`Deseas agregar ${extra} SI=1 NO=2`)
    if(respuesta == "1"){
        let lista = findNameById(arrExtras, extra);
        let strOpciones = `Escohe tu opcion \n`;
        let indice = 0;
        lista.forEach(element => {
            indice ++;
            strOpciones += `${indice} = ${element} \n`
        });
        opcion = prompt(strOpciones);
        for (let index = 0; index < lista.length; index++) {
           if(index == parseInt(opcion)-1){
            objCliente[extra] = lista[index]
           }
            
        }
    }
    return objCliente;
}

function findNameById(list, id){
    return list.find((obj)=> obj.id === id).opciones;
}
//  function noFlecha(a, b){
//     return a+b;
// }

//  let fnanonimo = function(a,b){
//     return a+b
// }

//  let fbflecha =(a,b)=>{return a+b}