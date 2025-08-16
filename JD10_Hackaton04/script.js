//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------

//1. Crea una función que retorne la suma de dos números.
function ejercicioP1() {
    let numero1 = Number(prompt("Ingrese primer número:"));
    let numero2 = Number(prompt("Ingrese segundo número:"));

    function sumaDeDosNumeros(a, b) {
        return a + b
    }


    if (isNaN(numero1) || isNaN(numero2)) {
        alert('El numero ingresado no es válido.')
    } else {
        alert(`La suma de los numeros: ${numero1} + ${numero2} = ${sumaDeDosNumeros(numero1, numero2)}`)
    }
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------

//2. Crea una función que retorne la potencia de un número dado, esta función deberá recibir la potencia y el número a potenciar.
function ejercicioP2() {
    let numero = Number(prompt("Ingrese el número a potenciar:"));
    let potencia = Number(prompt("Ingrese la potencia:"));



    if (isNaN(numero) || isNaN(potencia)) {
        alert('El numero ingresado no es válido.')
    } else {
        alert(`El numero ${numero} elevado a la potencia ${potencia} es igual a: ${potenciaNumero(numero, potencia)}`)
    }

    function potenciaNumero(numero, potencia) {
        let acumulado = 1
        for (let i = 0; i < potencia; i++) {
            acumulado = acumulado * numero
        }

        return acumulado;
    }

}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------

//3. Crea una función que tome números y devuelva la suma de sus cubos.
// sumOfCubes(1, 5, 9) ➞ 855

function ejercicioP3() {
    let numerosEnCaracteres = prompt("Ingrese números con la estructura (a, b, c):");

    const arrNum = numerosEnCaracteres.split(',').map(Number);

    if (arrNum.some(isNaN)) {
        alert('El numero ingresado no es válido.')
    } else {
        alert(`La suma de los siguientes numeros: ${arrNum} es: ${sumaDeCubos(...arrNum)}`)
    }

    function sumaDeCubos(...nums) {
        let suma = 0;

        for (let i = 0; i < nums.length; i++) {
            suma += nums[i] ** 3;
        }

        return suma;
    }
}







//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------

//4. Escribe una función que tome la base y la altura de un triángulo y devuelva su área.
// triArea(3, 2) ➞ 3


function ejercicioP4() {
    let baseTriangulo = Number(prompt("Ingrese la base del triángulo"));
    let alturaTriangulo = Number(prompt("Ingrese la altura del triángulo"));


    if ( isNaN(baseTriangulo) || isNaN(alturaTriangulo)) {
        alert('Valores ingresados no son válidos.')
    } else {
        alert(`El area de un triangulo con base ${baseTriangulo} y altura ${alturaTriangulo} es: ${triArea(baseTriangulo,alturaTriangulo)}`)
    }

    function triArea(baseTriangulo,alturaTriangulo ) {
        
        return (baseTriangulo * alturaTriangulo)/2;
    }
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------

//5.5. Crea una función llamada calculator que recibe 3 parámetros, 
// dos números y una operación matemática 
// (+,-,/,x,%), y si la operación no es correcta que envié un mensaje 
// “El parámetro no es reconocido” calculator(2,"+", 2) ➞ 4


function ejercicioP5() {
    let numero1 = Number(prompt("Ingrese el primero número"));
    let numero2 = Number(prompt("Ingrese el segundo número"));
    let operador = prompt("Ingrese el operador");

    if ( isNaN(numero1) || isNaN(numero2)) {
        alert('El nmero ingresado es incorrecto.')
    } else {
        alert(`El ejercicio es: ${numero1} ${operador} ${numero2} = ${calculator(numero1, numero2, operador)}`)
    }

    function calculator(numero1,numero2,operador )
    {
        switch (operador) {
            case "+":
                return numero1 + numero2;
            case "-":
                return numero1 - numero2;
            case "x":
                return numero1 * numero2;
            case "*":
                return numero1 * numero2;
            case "/":
                return numero2 !==0 ? numero1/numero2 : "No se puede dividir entre 0" ;
            case "%":
                return numero1 % numero2;
        }
    }
}

















