console.log("Inicio de la aplicacion");

document.getElementById("crearPedido").addEventListener("click",()=>{
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
            switch(tipoCafe){
                case 1:
                    objCliente.cafe = {tipo: "Americano"}
                    objCliente = preguntarAzucar(objCliente);
                    objCliente = preguntarLeche(objCliente);
                    break;
                case 2:
                    objCliente.cafe = {tipo: "Expreso"}
                    objCliente = preguntarAzucar(objCliente);
                    break;
                case 3:
                    objCliente.cafe = {tipo: "Latte"}
                    objCliente = preguntarAzucar(objCliente);
                    objCliente = preguntarLeche(objCliente);
                    break;
                default:
                    break;
            }

            break;
        case "2":

            break;
        default:
            alert("Opcion No Valida")
            break;
    }
    console.log(objCliente)
})


function preguntarAzucar(objCliente){
    let respuesta = prompt("Quieres Azucar 1:SI, 2:NO")
    if(respuesta==="1"){
        let tipoAzucar = prompt("1:Azucar Morena, 2=Azucar Blanca, 3:Stevia")
        switch (tipoAzucar) {
            case "1":
                objCliente.cafe.azucar=true;
                objCliente.cafe.tipoazucar = "Azucar Morena"
                break;
        case "2":
                objCliente.cafe.azucar=true;
                objCliente.cafe.tipoazucar = "Azucar Blanca"
                break;
        case "3":
                objCliente.cafe.azucar=true;
                objCliente.cafe.tipoazucar = "Stevia"
                break;
        
            default:
                break;
        }
    }
    return objCliente;
}
function preguntarLeche(objCliente){
    let respuesta = prompt("Que tipo de leche quieres: 0:sin leche, 1:Normal, 2:Leche de Soya o 3:Leche de Almendras")
    
        switch (respuesta) {
            case "1":
                objCliente.cafe.leche=true;
                objCliente.cafe.tipoleche = "Normal"
                break;
        case "2":
                objCliente.cafe.leche=true;
                objCliente.cafe.tipoleche = "Leche de Soya"
                break;
        case "3":
                objCliente.cafe.leche=true;
                objCliente.cafe.tipoleche = "Leche de Almendras"
                break;
            default:
                break;
        }
    
    return objCliente;
}
//  function noFlecha(a, b){
//     return a+b;
// }

//  let fnanonimo = function(a,b){
//     return a+b
// }

//  let fbflecha =(a,b)=>{return a+b}