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


    if (isNaN(baseTriangulo) || isNaN(alturaTriangulo)) {
        alert('Valores ingresados no son válidos.')
    } else {
        alert(`El area de un triangulo con base ${baseTriangulo} y altura ${alturaTriangulo} es: ${triArea(baseTriangulo, alturaTriangulo)}`)
    }

    function triArea(baseTriangulo, alturaTriangulo) {

        return (baseTriangulo * alturaTriangulo) / 2;
    }
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------

//5. Crea una función llamada calculator que recibe 3 parámetros, 
// dos números y una operación matemática 
// (+,-,/,x,%), y si la operación no es correcta que envié un mensaje 
// “El parámetro no es reconocido” calculator(2,"+", 2) ➞ 4


function ejercicioP5() {
    let numero1 = Number(prompt("Ingrese el primero número"));
    let numero2 = Number(prompt("Ingrese el segundo número"));
    let operador = prompt("Ingrese el operador");

    if (isNaN(numero1) || isNaN(numero2)) {
        alert('El nmero ingresado es incorrecto.')
    } else {
        alert(`El ejercicio es: ${numero1} ${operador} ${numero2} = ${calculator(numero1, numero2, operador)}`)
    }

    function calculator(numero1, numero2, operador) {
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
                return numero2 !== 0 ? numero1 / numero2 : "No se puede dividir entre 0";
            case "%":
                return numero1 % numero2;
        }
    }
}






//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//-- RETO 2: ESCRIBE LOS ALGORITMOS EN JAVASCRIPT
//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 1. Utilizando función arrow, crear una función que reciba como parámetros
//  un nombre, 
// apellido y edad y los retorne en un string concatenado 
// “Hola mi nombre es sebastián yabiku y mi edad 33”

function ejercicio01() {

    const nombre = prompt("Ingrese un nombre")
    const apellido = prompt("Ingrese un apellido")
    const edad = prompt("Ingrese su edad")

    const presentar = (nombre, apellido, edad) =>
        `Hola mi nombe es ${nombre} ${apellido} y mi edad es de ${edad} años`;

    alert(presentar(nombre, apellido, edad));
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 2)	Cree una función que tome números y devuelva la suma de sus cubos.
//sumOfCubes(1, 5, 9) ➞ 855
// Since 1^3 + 5^3 + 9^3 = 1 + 125 + 729 = 855




function ejercicio02() {

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
// 3. Crear una funcion que me retorne el tipo de valor
//  entregado, 
// invocar la función para los distintos tipos de js 




function ejercicio03() {

    let valor = prompt("Ingrese un valor:");

    const tipoDeValor = valor => {
        if (valor.trim()  === "true" || valor.trim() ==="false") {
            return "boolean";
        }
        if (valor.trim() === "null") {
            return "object";
        }

        if (valor.trim() === "undefined") {
            return "undefined";
        }
        if (valor.trim() !== "" && !isNaN(Number(valor))) { return "número" };

        return "string"
    };

    alert(`El tipo de valor ingresado es: ${tipoDeValor(valor)}`);

}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 4.Crear una función que reciba n cantidad de argumentos 
// y los sume ( utilizar parametros rest)


function ejercicio04() {
let entrada = prompt ("Ingrese los números separados por coma (ejemplo: 1,2,3,4,5...n):")

const numeros = entrada.split (',').map(Number);

if (numeros.some(isNaN)) {
    alert ("Alguno de los valores ingresados no es válido.");
    return; 
} 
const sumar = (...nums) => nums.reduce((total,num) => total + num, 0);
alert (`La suma es: ${sumar(...numeros)}`);
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 5.Crear una función que reciba un array de valores y 
// filtre los valores que no son string


function ejercicio05() {
    let entrada = prompt("Ingrese valores separados por coma (ejemplo: hola,123,true,adios):");
    const valores = entrada.split(',').map(valor => valor.trim());


    const soloStrings = valores.filter(valor => isNaN(Number(valor)) && valor !== "true" && valor !== "false");

    alert(`Los valores que son string son: ${soloStrings.join(', ')}`);
}











//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 1.


//  function ejercicio00() { }

