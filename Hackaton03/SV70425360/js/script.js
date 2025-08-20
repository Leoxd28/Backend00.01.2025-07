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
        mensajeAlert("Insertaa un numero");
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
    let numero = Number(inputNumero.value);
    let sueldo=0;

    if (numero === "") {
        mensajeAlert("Inserte un número")
        return;
    }

   if (!isNaN(numero)) {
        if (Number(numero)>2000) {
            sueldo = parseInt(numero+(numero*0.05));
            
        }else{
            
            sueldo = parseInt(numero+(numero*0.1));
        }    
    }else{
        mensajeAlert("inserte un numero")
    }

    
    document.getElementById("nuevoSueldo").textContent = ("Sueldo final: ")+sueldo;
    inputNumero.value="";
    inputNumero.focus();
}

document.getElementById("BtnEjercicio09").addEventListener("click", ejercicio09);

function ejercicio10(){
    let inputNumero=document.getElementById("numero10");
    numero = inputNumero.value;

    if (numero==="") {
        mensajeAlert("inserta un numero")
        return;
    }

    if (!isNaN(numero)) {
        if(numero%2==0){
            mensajeAlert("Es un numero par")
           
        }else{
            mensajeAlert("Es impar")
            
        }
    }
    inputNumero.value="";
    
}
document.getElementById("BtnEjercicio10").addEventListener("click",ejercicio10);

function ejercicio11(){
    let inputNro1=document.getElementById("nro1");
    let inputNro2=document.getElementById("nro2");
    let inputNro3=document.getElementById("nro3");
    numero1=Number(inputNro1.value);
    numero2=Number(inputNro2.value);
    numero3=Number(inputNro3.value);

    let mayor = numero1;
    console.log(numero1,numero2,numero3)
     
    if (!isNaN(numero1,numero2,numero3)) {
        if(numero2 > mayor){
            mayor = numero2;
            if (numero3 > mayor) {
                mayor = numero3;
        }
        
        }
    }else{
        mensajeAlert("Inserta un numero");
    }
    document.getElementById("mayor").textContent=("Numero mayor: ")+mayor;
    inputNro1.value="";
    inputNro2.value="";
    inputNro3.value="";
    inputNro1.focus();
}
document.getElementById("BtnEjercicio11").addEventListener("click",ejercicio11);

function ejercicio12(){
    let inputNro1=document.getElementById("num1");
    let inputNro2=document.getElementById("num2");
    numero1=Number(inputNro1.value);
    numero2=Number(inputNro2.value);

    
    console.log(numero1,numero2)
     
    if (!isNaN(numero1,numero2)) {
        if(numero1 > numero2){
            mayor = numero1;
        }else if (numero2 > numero1){
             mayor = numero2;
        }else{
            mensajeAlert("Ambos numeros son iguales");
        }
    }else{
        mensajeAlert("Inserta un numero");
    }
    document.getElementById("mayorDeDos").textContent=("Numero mayor: ")+mayor;
    inputNro1.value="";
    inputNro2.value="";
    
    inputNro1.focus();
}
document.getElementById("BtnEjercicio12").addEventListener("click",ejercicio12);

function ejercicio13(){
    let inputLetra=document.getElementById("letra");
    palabra=inputLetra.value;
    
    if (isNaN(palabra)) {
        if(palabra=="a"||palabra=="e"||palabra=="i"||palabra=="o"||palabra=="u"){
            mensajeAlert("Es una vocal")
        }else{
            mensajeAlert("No es vocal")
        }
    }else{
        mensajeAlert("Inserta una letra");
    }
    document.getElementById("mayorDeDos").textContent=("Numero mayor: ")+mayor;
    inputLetra.value="";
    inputLetra.focus();
}
document.getElementById("BtnEjercicio13").addEventListener("click",ejercicio13);

function ejercicio14(){
    let inputNumero=document.getElementById("primo");
    primo=Number(inputNumero.value);
console.log(primo)
    if(primo<1 || primo>9){
        mensajeAlert("fuera del rango");
    }else if(primo==2||primo==3||primo==5||primo==7){
        mensajeAlert("numero primo")
    }else{
        mensajeAlert("no es primo")
    }
    inputNumero.value="";
    inputNumero.focus();
}
document.getElementById("BtnEjercicio14").addEventListener("click",ejercicio14);

function ejercicio15(){
    let inputCentimetros = document.getElementById("centimetros");
    let inputLibras = document.getElementById("libras");
    centimetros=Number(inputCentimetros.value);
    libras=Number(inputLibras.value);
console.log(centimetros,libras);
    let pulgadas=centimetros/2.54;
    let kilos=libras * 0.453592;

    document.getElementById("conversion1").textContent=(centimetros)+(" Centimetros a Pulgadas: ")+pulgadas;
    document.getElementById("conversion2").textContent=(libras)+(" Libras a Kilogramos: ")+kilos;
    inputCentimetros.value="";
    inputLibras.value="";
    inputCentimetros.focus();

}
document.getElementById("BtnEjercicio15").addEventListener("click",ejercicio15);

function ejercicio16(){
    let inputNumero = document.getElementById("numeroDia");
    numero=Number(inputNumero.value);
    switch (numero) {
        case 1:
            mensajeAlert("Lunes");
            break;
        case 2:
            mensajeAlert("Martes");
            break;    
        case 3:
            mensajeAlert("Miercoles");
            break;
        case 4:
            mensajeAlert("Jueves");
            break;
        case 5:
            mensajeAlert("Viernes");
            break;
        case 6:
            mensajeAlert("Sabado");
            break;
        case 7:
            mensajeAlert("Domingo");
            break;
        default:
            mensajeAlert("Inserta un numero valido")
            break;
    }
inputNumero.value="";
inputNumero.focus();
}
document.getElementById("BtnEjercicio16").addEventListener("click",ejercicio16);

function ejercicio17(){
    let inputHora = document.getElementById("hora");
    let inputMinutos=document.getElementById("minutos");
    let inputSegundos=document.getElementById("segundos");
    hora=Number(inputHora.value);
    minuto=Number(inputMinutos.value);
    segundo=Number(inputSegundos.value);
console.log(hora,minuto,segundo)
    segundo = segundo+1;
    console.log(hora,minuto,segundo)
    if (segundo==60) {
        segundo=0;
        minuto=minuto+1;
    }if(minuto==60){
        minuto=0;
        hora=hora+1;
    }if(hora==24){
        hora=0;
    }
    inputHora.value="";
    inputMinutos.value="";
    inputSegundos.value="";
    inputHora.focus();
    document.getElementById("calculo").textContent=("Hora mas un segundo: ")+hora+(":")+minuto+(":")+segundo;
}
document.getElementById("BtnEjercicio17").addEventListener("click",ejercicio17);
function ejercicio18(){
    let inputCantidad = document.getElementById("CDS");
    cantidad = Number(inputCantidad.value);

    if(cantidad<=9){
        precio=10
    }else if(cantidad<=99){
        precio=8;
    }else if(cantidad<=499){
        precio=7;
    }else{
        precio=6;
    }
    total = cantidad * precio;
    ganancia = total * 0.0825
    document.getElementById("precioCD").textContent=("Ganancia del vendedor: ")+ganancia;
}
document.getElementById("BtnEjercicio18").addEventListener("click",ejercicio18);

function ejercicio19(){
    let inputNumero = document.getElementById("diasTrabajados");
    let numero = Number(inputNumero.value);
    const radios = document.getElementsByName("empleados");
    let seleccionado;
    let pago =0;

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
                case '1':
                    pago=56;
                    break;
                case '2':
                    pago=64;
                    break;
                case '3':
                    pago=80;
                    break;
                case '4':
                    pago=48;
                    break;
                default:
                    
                    break;
        }
        console.log(numero,seleccionado,pago)
    }
    
    else{
        mensajeAlert("Inserte un número")
    }
     total = pago * numero;
     console.log(total)
    document.getElementById("sueldoEmpleado").textContent = ("Sueldo semanal: ")+total;
    
}
document.getElementById("BtnEjercicio19").addEventListener("click",ejercicio19);

function ejercicio20(){
    let inputNumero1=document.getElementById("N1");
    let inputNumero2=document.getElementById("N2");
    let inputNumero3=document.getElementById("N3");
    let inputNumero4=document.getElementById("N4");
    let numero1 = Number(inputNumero1.value);
    let numero2 = Number(inputNumero2.value);
    let numero3 = Number(inputNumero3.value);
    let numero4 = Number(inputNumero4.value);

    pares=0;
    if (numero1%2==0) {
            pares = pares +1;}
    if (numero2%2==0) {
            pares = pares +1;}
    if (numero3%2==0) {
            pares = pares +1;}
    if (numero4%2==0) {
            pares = pares +1;}
    document.getElementById("operacion1").textContent=("Numeros pares: ")+pares;
    mayor = numero1;
    if (numero2>mayor) {
        mayor = numero2;}
    if (numero3>mayor) {
        mayor = numero3;}
    if (numero4>mayor) {
        mayor = numero4;
    }
    document.getElementById("operacion2").textContent=("Numero mayor: ")+mayor;
    if (numero3%2==0) {
        cuadrado = numero2^2;
        document.getElementById("operacion3").textContent=("El tercero es par, el cuadrado del segundo número es: ")+ cuadrado;
    }
    if (numero1<numero4) {
        media = (numero1+numero2+numero3+numero4)/4;
        document.getElementById("operacion4").textContent=("El primero es menor que el cuarto, la media de los 4 números es: ")+media;
    }
    if (numero2>numero3&&numero3>=50&&numero3<=700) {
        suma = numero1+numero2+numero3+numero4;
        document.getElementById("operacion5").textContent=("El segundo es mayor que el tercero y el tercero está entre 50 y 700, La suma de los 4 números es:")+suma;
    }

}
document.getElementById("BtnEjercicio20").addEventListener("click",ejercicio20);

function ejercicio21(){
    let inputFactorial = document.getElementById("number");
    numero = Number(inputFactorial.value);

    factorial=1;
    for (let i = 1; i <= numero; i++) {
        factorial=factorial*i;
    }
    document.getElementById("factorial").textContent=("El factorial es: ")+factorial;
}
document.getElementById("BtnEjercicio21").addEventListener("click",ejercicio21);