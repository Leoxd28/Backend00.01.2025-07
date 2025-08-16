//Empleando funciones tipo: Arrow function
//#region 1. Crea una función que retorne la suma de dos números.
const sumar = (numero1, numero2 = 0) => {
    return numero1 + numero2
}
let resultSuma = sumar(48, 55);
console.log(resultSuma)
//#endregion
//#region 2. Crea una función que retorne la potencia de un número dado, esta función deberá recibir la potencia y el número a potenciar.
const potencia = (base, exponente) => {
    return Math.pow(base, exponente)
}
let resultPotencia = potencia(2, 3);
console.log(resultPotencia);
//#endregion

//Empleando funciones tipo: Expresadas
//#region 3. Crea una función que tome números y devuelva la suma de sus cubos. sumOfCubes(1, 5, 9) ➞ 855
const sumOfCubes = function (...numeros) {
    let suma = 0;
    for (let index = 0; index < numeros.length; index++) {
        suma += Math.pow(numeros[index], 3)
    }
    return suma;
}
console.log(sumOfCubes(1, 5, 9))
//#endregion
//#region 4. Escribe una función que tome la base y la altura de un triángulo y devuelva su área. triArea(3, 2) ➞ 3
const areaTriangulo = (base, altura) => {
    return (base * altura) / 2;
}
let resultAreaTriangulo = areaTriangulo(5, 10);
console.log(resultAreaTriangulo);
//#endregion

//Empleando funciones tipo: Declaradas o Declarativas
//#region 5. Crea una función llamada calculator que recibe 3 parámetros, dos números y una operación matemática
//(+,-,/,x,%), y si la operación no es correcta que envié un mensaje “El parámetro no es reconocido” calculator(2,"+", 2) ➞ 4
function calculator(num1, num2, operacionMatematica) {
    switch (operacionMatematica) {
        case "+":
            console.log(num1 + " + " + num2 + " = " + (num1 + num2))
            break;
        case "-":
            console.log(num1 + " - " + num2 + " = " + (num1 - num2))
            break;
        case "/":
            console.log(num1 + " / " + num2 + " = " + (num1 / num2))
            break;
        case "*":
            console.log(num1 + " * " + num2 + " = " + (num1 * num2))
            break;
        case "%":
            console.log(num1 + " % " + num2 + " = " + (num1 % num2))
            break;

        default: console.log("El parámetro no es reconocido")
            break;
    }
}
let resultCalculator = calculator(4, 7, "*");
//#endregion