function ejercicio01() {
    //1. Hacer un algoritmo en JavaScript que lea un número por el teclado y determinar si tiene tres dígitos.
    //console.log("Mensajes que salen en la consola");
    //alert("Mensajes que salen como alertas");
    let numero = parseInt(prompt("Ingrese un número entero:"));
    if (!isNaN(numero)) {
        if (numero >= 100 && numero <= 999) {
            alert("El número " + numero + " tiene tres dígitos.")
        } else {
            alert("El número " + numero + " no tiene tres dígitos.")
        }
    }
    else {
        alert("El valor ingresado no es un número válido.")
    }
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------

function ejercicio02() {
    //2. Hacer un algoritmo en JavaScript que lea un número entero por el teclado y determinar si es negativo.

    let numero = parseInt(prompt("Ingrese un número entero:"));
    if (!isNaN(numero)) {
        if (numero < 0) {
            alert("El número " + numero + " es Negativo.")
        } else {
            if (numero > 0) { alert("El número " + numero + " es Positivo.") } else { alert("El número " + numero + " es Neutro.") }

        }
    }
    else {
        alert("El valor ingresado no es un número válido.")
    }
}

//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 3.	Hacer un algoritmo en JavaScript que lea un número 
// y determinar si termina en 4.

function ejercicio03() {

    let numero = parseInt(prompt("Ingrese un número entero:"));

    if (!isNaN(numero)) {
        if (Math.abs(numero % 10) === 4) {
            alert("El número " + numero + " SÍ termina en 4.")
        }
        else {
            alert("El número " + numero + " NO termina en 4.")
        }


    }
    else {
        alert("El valor ingresado no es un número válido")
    }

}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------

//4.	Hacer un algoritmo en JavaScript que lea 
// tres números enteros y los muestre de menor a mayor.
function ejercicio04() {
    let num1 = parseInt (prompt("Ingrese el primer número entero: "));
    let num2 = parseInt (prompt("Ingrese el segundo número entero:"));
    let num3 = parseInt (prompt("Ingrese el tecer número entero:"));

if (!isNaN(num1) && !isNaN(num2) && !isNaN(num3)){
let arrayNumeros = [num1,num2,num3];
arrayNumeros.sort(function(a, b){return a - b});
alert("Los número ordenados de menor a mayor son: " + arrayNumeros.join(", "));
} 
else {
    alert("Alguno de los valores ingresados no es un número válido")
}

}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------

function ejercicio05() 

{

}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------

function ejercicio06() 

{
    
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------

function ejercicio07() 

{
    
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------

function ejercicio08() 

{
    
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------

function ejercicio05() 

{
    
}