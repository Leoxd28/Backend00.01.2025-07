//#region Ejercicio01
//Utilizando función arrow, crear una función que reciba como parámetros un nombre, apellido y edad y los retorne en un string concatenado “Hola mi nombre es sebastián yabiku y mi edad 33”
const parametrosConcatenados = (nombre, apellido, edad) => (`Hola mi nombre es ${nombre} ${apellido} y mi edad ${edad}`);
console.log(parametrosConcatenados("Alexander", "Córdova", 23));
//#endregion
//#region Ejercicio02
//Cree una función que tome números y devuelva la suma de sus cubos. sumOfCubes(1, 5, 9) ➞ 855
// Since 1^3 + 5^3 + 9^3 = 1 + 125 + 729 = 855
const sumaCubos = (...numeros) => {
    let suma = 0;
    for (let index = 0; index < numeros.length; index++) {
        suma += Math.pow(numeros[index], 3);
    }
    return suma;
}
console.log(sumaCubos(1, 5, 9));
//#endregion
//#region Ejercicio03
//Crear una funcion que me retorne el tipo de valor entregado, invocar la función para los distintos tipos de js
const tipoDeDato = (valor) => typeof (valor);
console.log(tipoDeDato(3));
//#endregion
//#region Ejercicio04
//Crear una función que reciba n cantidad de argumentos y los sume ( utilizar parametros rest)
const sumatoria = (...numbers) => {
    return numbers.reduce((acumulador, actual) => acumulador + actual, 0);
}
console.log(sumatoria(1, 2, 5, 22, 77));
//#endregion
//#region Ejercicio05
//Crear una función que reciba un array de valores y filtre los valores que no son string
let arrayValores = ["Aleander", 23, true, "Córdova"]
const filtrarString = (valores) => {
    return valores.filter(valor => typeof valor === "string");
}
console.log(filtrarString(arrayValores));
//#endregion
//#region Ejercicio06
//Cree una función que tome una matriz de números y devuelva los números mínimos y máximos, en ese orden.
//minMax([1, 2, 3, 4, 5]) ➞ [1, 5]
const minMax = (valores) => {
    const min = Math.min(...valores);
    const max = Math.max(...valores);
    return [min, max];
}
console.log(minMax([1, 2, 3, 4, 5]));
//#endregion
//#region Ejercicio07
//Escriba una función que tome una matriz de 10 enteros (entre 0 y 9) y devuelva una cadena en forma de un número de teléfono.
//formatPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) ➞ "(123) 456-7890"
const formatPhoneNumber = (valores) => {
    if (valores.length === 10) {
        const cadena = valores.join('');
        return (`(${cadena.slice(0, 3)}) ${cadena.slice(3, 6)}-${cadena.slice(6)}`);

    } else {
        console.log("La matriz debe contener solo 10 números");
    }

}
console.log(formatPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]))
//#endregion
//#region Ejercicio08
//Cree una función que tome una matriz de matrices con números. Devuelve una nueva matriz (única) con el mayor número de cada uno.
//findLargestNums([[4, 2, 7, 1], [20, 70, 40, 90], [1, 2, 0]]) ➞ [7, 90, 2]
const findLargestNums = (valores) => {
    return valores.map(matrizUnica => Math.max(...matrizUnica));
}
console.log(findLargestNums([[4, 2, 7, 1], [20, 70, 40, 90], [1, 2, 0]]));
//#endregion Ejercicio09
//Dada una palabra, escriba una función que devuelva el primer índice y el último índice de un carácter.
//charIndex("hello", "l") ➞ [2, 3]
// The first "l" has index 2, the last "l" has index 3.
//charIndex("circumlocution", "c") ➞ [0, 8]
// The first "c" has index 0, the last "c" has index 8.
const charIndex = (palabra, caracter) => {
    let primerIndice = palabra.indexOf(caracter);
    let ultimoIndice = palabra.lastIndexOf(caracter);
    if (primerIndice === -1) {
        return [-1,-1];
    }
    return [primerIndice, ultimoIndice];
}
console.log(charIndex("hello", "l"));
console.log(charIndex("circumlocution", "c"));
//#region 
//#region Ejercicio10
//Escriba una función que convierta un objeto en una matriz, donde cada elemento representa un par clave-valor.
//toArray({ a: 1, b: 2 }) ➞ [["a", 1], ["b", 2]]
const toArray = (objeto) => {
    return Object.entries(objeto);
}
console.log(toArray({a:1,b:2}));
//#endregion
//#region Ejercicio11
//Cree la función que toma una matriz con objetos y devuelve la suma de los presupuestos de las personas.
//getBudgets([
//  { name: "John", age: 21, budget: 23000 },
//  { name: "Steve",  age: 32, budget: 40000 },
//  { name: "Martin",  age: 16, budget: 2700 }
//]) ➞ 65700
const getBudgets = (matriz) => {
    let total = 0;
    for (let index = 0; index < matriz.length; index++) {
        total += matriz[index].budget;
    }
    return total;
}
console.log(getBudgets([
  { name: "John", age: 21, budget: 23000 },
  { name: "Steve",  age: 32, budget: 40000 },
  { name: "Martin",  age: 16, budget: 2700 }
]));
//#endregion
//#region Ejercicio12
//Cree una función que tome una matriz de estudiantes y devuelva una matriz de nombres de estudiantes.
//getStudentNames([
//  { name: "Steve" },
//  { name: "Mike" },
//  { name: "John" }
//]) ➞ ["Becky", "John", "Steve"]
const getStudentNames = (matriz) => {
    return matriz.map(estudiantes => estudiantes.name);
}
console.log(getStudentNames([
  { name: "Steve" },
  { name: "Mike" },
  { name: "John" }
]));
//#endregion
//#region Ejercicio13
//Escriba una función que convierta un objeto en una matriz de claves y valores.
//objectToArray({
//  likes: 2,
//  dislikes: 3,
//  followers: 10
//}) ➞ [["likes", 2], ["dislikes", 3], ["followers", 10]]
const objectToArray = (objeto) => {
    return Object.entries(objeto);
}
console.log(objectToArray({
  likes: 2,
  dislikes: 3,
  followers: 10
}));
//#endregion
//#region Ejercicio14
//Cree una función donde, dado el número n, devuelva la suma de todos los números cuadrados  incluyendo n.
//squaresSum(3) ➞ 14
// 1² + 2² + 3² =
// 1 + 4 + 9 =
// 14
const squaresSum = (numero) => {
    let sumaCuadrados = 0;
    for (let index = 1; index <= numero; index++) {
        sumaCuadrados += Math.pow(index, 2);
    }
    return sumaCuadrados;
}
console.log(squaresSum(3));
//#endregion
//#region Ejercicio15
//Cree una función para multiplicar todos los valores en una matriz por la cantidad de valores en la matriz dada
//multiplyByLength([2, 3, 1, 0]) ➞ [8, 12, 4, 0]
const multiplyByLength = (matriz) => {
    let tamañoMatriz = matriz.length;
    return matriz.map(num => num * tamañoMatriz);
}
console.log(multiplyByLength([2,3,1,0]));
//#endregion
//#region Ejercicio16
//Cree una función que tome un número como argumento y devuelva una matriz de números contando desde este número a cero.
//countdown(5) ➞ [5, 4, 3, 2, 1, 0]
const countdown = (numero) => {
    let nuevaMatriz = [];
    for (let index = numero; index >= 0; index--) {
        nuevaMatriz.push(index);
    }
    return nuevaMatriz;
}
console.log(countdown(5));
//#endregion
//#region Ejercicio17
//Cree una función que tome una matriz y devuelva la diferencia entre los números más grandes y más pequeños.
//diffMaxMin([10, 4, 1, 4, -10, -50, 32, 21]) ➞ 82
// Smallest number is -50, biggest is 32.
const diffMaxMin = (matriz) => {
    let numMax = Math.max(...matriz);
    let numMin = Math.min(...matriz);
    return numMax - numMin;
}
console.log(diffMaxMin([10, 4, 1, 4, -10, -50, 32, 21]));
//#endregion
//#region Ejercicio18
//Cree una función que filtre las cadenas de una matriz y devuelva una nueva matriz que solo contenga enteros.
//filterList([1, 2, 3, "x", "y", 10]) ➞ [1, 2, 3, 10]
const filterList = (matriz) => {
    return matriz.filter(enteros => Number.isInteger(enteros));
}
console.log(filterList([1, 2, 3, "x", "y", 10]));
//#endregion
//#region Ejercicio19
//Cree una función que tome dos argumentos (elemento, tiempos). El primer argumento (elemento) es el elemento que necesita repetirse, mientras que el segundo argumento (veces) es la cantidad de veces que se debe repetir el elemento. Devuelve el resultado en una matriz.
//repeat(13, 5) ➞ [13, 13, 13, 13, 13]
const repeat = (elemento, tiempos) => {
    return Array(tiempos).fill(elemento);
}
console.log(repeat(13,5));
//#endregion
//#region Ejercicio20
//Escriba una función, .vreplace () que extienda el prototipo de cadena reemplazando todas las vocales en una cadena con una vocal especificada.
//"apples and bananas".vreplace("u") ➞ "upplus und bununus"
String.prototype.vreplace = function(vocal) {
    return this.replace(/[aeiou]/gi, vocal);
}
console.log("apples and bananas".vreplace("u"));
//#endregion
//#region Ejercicio21
//Te dan una cadena de palabras. Debe encontrar la palabra "Nemo" y devolver una cadena como esta: "¡Encontré a Nemo en [el orden de la palabra que encuentra nemo]!".
//findNemo("I am finding Nemo !") ➞ "I found Nemo at 4!"
const findNemo = (cadena) => {
    let palabras = cadena.split(" ");
    let index = palabras.indexOf("Nemo");
    if (index !== -1) {
        return `I found Nemo at ${index + 1}`;
    }
}
console.log(findNemo("I am finding Nemo !"));
//#endregion
//#region Ejercicio22
//Cree una función que capitalice la última letra de cada palabra.
//capLast("hello") ➞ "hellO"
const capLast = (texto) => {
    return texto.split(" ").map(palabras => {
        if (palabras === 0) return "";
        let ultimaLetra = palabras[palabras.length - 1].toUpperCase();
        return palabras.slice(0, -1) + ultimaLetra;
    }).join(" ");
}
console.log(capLast("hello"));
//#endregion