/*function ejercicio01() {
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
}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
function ejercicio03() { 
}



 //-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
 
*/

const inputEjercicio1 = document.getElementById("inputEjercicio1");
const btnEjercicio1 = document.getElementById("btnEjercicio1");

btnEjercicio1.addEventListener("click", function() {

    // con length
    // if(inputEjercicio1.value.length === 3 ) {
    //     alert("El numero tiene 3 digitos")
    // } else {
    //     alert("El numero no tiene 3 digitos")
    // }
    
    let numero = parseInt(inputEjercicio1.value);
    
    if(!isNaN(numero)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        if(Math.abs(numero) >= 100 && Math.abs(numero) <= 999) {
            alert("El numero tiene 3 digitos.")
        } else {
            alert("El numero no tiene 3 digitos.")
        }
    }

})

const inputEjercicio2 = document.getElementById("inputEjercicio2");
const btnEjercicio2 = document.getElementById("btnEjercicio2");

btnEjercicio2.addEventListener("click", function() {

    // con length
    // if(inputEjercicio1.value.length === 3 ) {
    //     alert("El numero tiene 3 digitos")
    // } else {
    //     alert("El numero no tiene 3 digitos")
    // }
    
    let numero = parseInt(inputEjercicio2.value);
    
    if(!isNaN(numero)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        if(Math.abs(numero) >= 100 && Math.abs(numero) <= 999) {
            alert("El numero tiene 3 digitos.")
        } else {
            alert("El numero no tiene 3 digitos.")
        }
    }

})