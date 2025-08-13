console.log("Inicio de la aplicacion");
let arrCliente = [];
document.getElementById("crearPedido").addEventListener("click", () => {
    console.log("Hizo Click");
    let nombre = prompt("Dime tu nombre");
    let objCliente = { nombre };

    let producto = prompt(`Escoja el Producto:\n1 ----> Cafe\n2 ----> Postre`);
    if (producto === "1") {
        let tipoCafe = parseInt(prompt(`Dime tu tipo de cafe: 1=Americano, 2=Expreso, 3=Latte`));
        let tiposCafe = ["Americano", "Expreso", "Latte"];
        if (tipoCafe >= 1 && tipoCafe <= 3) {
            objCliente.cafe = { tipo: tiposCafe[tipoCafe - 1] };
            objCliente = preguntarAzucar(objCliente);
            if (tipoCafe !== 2) objCliente = preguntarLeche(objCliente);
        }
    } else if (producto === "2") {
        let tipoPostre = parseInt(prompt("Dime tu postre: 1=Torta de Chocolate, 2=Criossant, 3=Triple"));
        let tiposPostre = ["Torta de Chocolate", "Criossant", "Triple"];
        if (tipoPostre >= 1 && tipoPostre <= 3) {
            objCliente.postre = { tipo: tiposPostre[tipoPostre - 1] };
        }
    } else {
        alert("Opcion No Valida");
        return;
    }

    arrCliente.push(objCliente);
    let html = JSON2HTMLList(arrCliente);
    document.getElementById("comandas").appendChild(html);
});

function preguntarAzucar(objCliente) {
    if (prompt("Quieres Azucar 1:SI, 2:NO") === "1") {
        let tipoAzucar = prompt("1:Azucar Morena, 2=Azucar Blanca, 3:Stevia");
        let tiposAzucar = ["Azucar Morena", "Azucar Blanca", "Stevia"];
        if (["1", "2", "3"].includes(tipoAzucar)) {
            objCliente.cafe.azucar = true;
            objCliente.cafe.tipoazucar = tiposAzucar[parseInt(tipoAzucar) - 1];
        }
    }
    return objCliente;
}

function preguntarLeche(objCliente) {
    let respuesta = prompt("Que tipo de leche quieres: 0:sin leche, 1:Normal, 2:Leche de Soya o 3:Leche de Almendras");
    let tiposLeche = ["Normal", "Leche de Soya", "Leche de Almendras"];
    if (["1", "2", "3"].includes(respuesta)) {
        objCliente.cafe.leche = true;
        objCliente.cafe.tipoleche = tiposLeche[parseInt(respuesta) - 1];
    }
    return objCliente;
}