function ejercicio01(){
    //1. Hacer un algoritmo en JavaScript que lea un número por el teclado y determinar si tiene tres dígitos.
    console.log("Mensajes que salen en la consola");
    // alert("Mensajes que salen como alertas");
    let numero = parseInt( prompt("Escribe un numero"));
    if(!isNaN(numero)){
        if(numero>99 && numero<1000){
            alert("Si tiene 3 Digitos")
        }else{
            alert("No tiene 3 digitos")
        }
    }
    else{
        alert("El valor ingresado no es un numero")
    }
}

function ejercicio02(){
    //2. Hacer un algoritmo en JavaScript que lea un número entero por el teclado y determinar si es negativo.
}