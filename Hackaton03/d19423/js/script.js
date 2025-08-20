function mensajeAlert(message){
    const modal = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");
    alertMessage.textContent = message;
    modal.style.display = "flex";

    document.getElementById("closeAlert").addEventListener("click", function(){
        modal.style.display = "none";
    });
}
function ejercicio01(){

    let inputNumero = document.getElementById("numero");
    let numero =inputNumero.value;

        if(numero===""){
            mensajeAlert("Inserte un numero");
            inputNumero.focus();
            return;
        }
    
        if(!isNaN(numero)){
            if(numero>99 && numero<1000){
            mensajeAlert("Si tiene 3 Digitos")
            }else{
            mensajeAlert("No tiene 3 digitos")
            }
        }
        else{
        mensajeAlert("El valor ingresado no es un numero")
        }
    inputNumero.value="";
    inputNumero.focus();
    }
   
document.getElementById("BtnEjercicio01").addEventListener("click", ejercicio01);


function ejercicio02(){
    let inputNumero = document.getElementById("numero2");
    let numero = inputNumero.value;

    if(numero===""){
        mensajeAlert("Inserte un número")
            inputNumero.focus();
            return;
        
    }

    if(!isNaN(numero)){
        if (numero<0) {
            mensajeAlert("Es un número negativo")
        }
        else{
            mensajeAlert("Es un número positivo")
        }
    }
    inputNumero.value="";
    inputNumero.focus();   
}
document.getElementById("BtnEjercicio02").addEventListener("click", ejercicio02);