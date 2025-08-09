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

function ejercicio03(){
    let inputNumero = document.getElementById("numero3");
    let numero = inputNumero.value;

    if(numero===""){
        mensajeAlert("Inserte un número")
            inputNumero.focus();
            return;
        
    }
    if(numero%10==4|| numero%10==-6){
        mensajeAlert("el numero termina en 4");
    }
    else{
        mensajeAlert("El numero no termina en cuatro")
    }
    inputNumero.value="";
    inputNumero.focus();   
    
}
document.getElementById("BtnEjercicio03").addEventListener("click",ejercicio03);

let arrayNumero =[]
function ejercicio04(){
    
    let inputNumero = document.getElementById("numero4");
    let numero = inputNumero.value;

        if(numero===""){
            mensajeAlert("Inserte un numero");
            inputNumero.focus();
            return;
        }
    
        if(!isNaN(numero)){
            arrayNumero.push(Number(numero));
            document.getElementById("insertado").textContent =("Números insertados: ")+ arrayNumero.join(", ");
        }
        else{
        mensajeAlert("El valor ingresado no es un numero")
        }
    inputNumero.value="";
    inputNumero.focus();
}
document.getElementById("BtnEjercicio04").addEventListener("click",ejercicio04);
document.getElementById("BtnEjercicio04Ordenar").addEventListener("click",function(){
arrayNumero.sort();
document.getElementById("ordenado").textContent = ("Números ordenados: ")+arrayNumero.join(", ")
})

precioZapato=80;

function ejercicio05(){
    let inputNumero = document.getElementById("numero5");
    numero = inputNumero.value;

    if (numero==="") {
        mensajeAlert("Inserte un número");
        inputNumero.focus();
        return;
    }
    if (!isNaN(numero)) {
        subTotal = numero * precioZapato;
        if (numero > 30) {
            descuento = 0.40;
        }
        else if (numero>20) {
            descuento = 0.20;
        }else if(numero >10 ){
            descuento = 0.10;
        }
        else{
            descuento=0;
        }
    }else{
        mensajeAlert("El valor ingresado no es un número")
    }
    total = subTotal - (subTotal*descuento);
    document.getElementById("precio").textContent =("Precio final: ")+ total;
    document.getElementById("descuento").textContent = ("Descuento: ")+descuento;
    inputNumero.value="";
    inputNumero.focus();
}
document.getElementById("BtnEjercicio05").addEventListener("click",ejercicio05);


function ejercicio06(){
    let inputNumero= document.getElementById("numero6");
    let numero = inputNumero.value;

    if (numero === "") {
        mensajeAlert("Inserte un número")
        return;
    }

    if (!isNaN(numero)) {
        if (numero<=40) {
            sueldo = numero*20;
            extras = 0;
        }else{
            extras = numero-40;
            sueldo = (40*20)+(extras*25);
        }
    }else{
        mensajeAlert("Inserte un número")
    }

    document.getElementById("extras").textContent = ("Horas extras: ")+extras;
    document.getElementById("sueldo").textContent = ("Sueldo final: ")+sueldo;
    inputNumero.value="";
    inputNumero.focus();
}
document.getElementById("BtnEjercicio06").addEventListener("click",ejercicio06);

function ejercicio07(){
    let inputNumero = document.getElementById("numero7");
    let numero = inputNumero.value;
    const radios = document.getElementsByName("tipo");
    let seleccionado;

    for (const radio of radios) {
        if(radio.checked){
            seleccionado = radio.value;
            break;
        }
    }
    if (numero ==="") {
        mensajeAlert("Inserte un número")
        return;
    }
    if (!isNaN(numero)) {
        switch (seleccionado) {
            case "A":
                descuento = 0.10;
                total = numero-(numero*descuento);
                break;
            case "B":
                descuento = 0.15;
                total = numero-(numero*descuento);
                break;
            case "C":
                descuento = 0.20;
                total = numero-(numero*descuento);
                break;
            default:
                break;
        }
    }else{
        mensajeAlert("Inserte un número")
    }
    document.getElementById("descuentoHelado").textContent = ("Descuento: ")+descuento;
    document.getElementById("precioHelado").textContent = ("Precio final: ")+ total;
}
document.getElementById("BtnEjercicio07").addEventListener("click",ejercicio07);

function ejercicio08(){
    let inputNota1 = document.getElementById("nota1");
    let inputNota2 = document.getElementById("nota2");
    let inputNota3 = document.getElementById("nota3");
    nota1=parseInt(inputNota1.value);
    nota2=parseInt(inputNota2.value);
    nota3=parseInt(inputNota3.value);

    if ((nota1,nota2,nota3)==="") {
        mensajeAlert("Inserta un numero");
        return;
    }
    if(!isNaN(nota1,nota2,nota3)){
        if (nota1>0 && nota2>0 && nota3>0) {
            promedio = (nota1+nota2+nota3)/3;
            if (promedio>=11) {
                document.getElementById("promedio").textContent=("Promedio ")+promedio;
                document.getElementById("estado").textContent =("Estado: ")+ ("aprobado");
            }else{
                document.getElementById("promedio").textContent = ("Promedio: ")+promedio;
                document.getElementById("estado").textContent = ("Estado: ")+ ("desaprobado")
            }
        }
        else{
            mensajeAlert("Inserta un número positivo")
        }
    }else{
        mensajeAlert("Inserta un número")
    }
    inputNota1.value="";
    inputNota2.value="";
    inputNota3.value="";
    inputNota1.focus();    
}
document.getElementById("BtnEjercicio08").addEventListener("click",ejercicio08);

function ejercicio09(){
    let inputNumero= document.getElementById("numero9");
    let numero = inputNumero.value;
    let sueldo=0;

    if (numero === "") {
        mensajeAlert("Inserte un número")
        return;
    }

    if (!isNaN(numero)) {
        if (numero>2000) {
            sueldo = parseInt(numero+(numero*0.05));
            
        }else{
            
            sueldo = parseInt(numero+(numero*0.1));
        }
    }else{
        mensajeAlert("Inserte un número")
    }

    
    document.getElementById("nuevoSueldo").textContent = ("Sueldo final: ")+sueldo;
    inputNumero.value="";
    inputNumero.focus();
}

document.getElementById("BtnEjercicio09").addEventListener("click", ejercicio09);
