

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
        if (valor.trim() === "true" || valor.trim() === "false") {
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
    let entrada = prompt("Ingrese los números separados por coma (ejemplo: 1,2,3,4,5...n):")

    const numeros = entrada.split(',').map(Number);

    if (numeros.some(isNaN)) {
        alert("Alguno de los valores ingresados no es válido.");
        return;
    }
    const sumar = (...nums) => nums.reduce((total, num) => total + num, 0);
    alert(`La suma es: ${sumar(...numeros)}`);
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
// 6. Cree una función que tome una matriz de números 
// y devuelva los números mínimos y máximos, en ese orden.
// minMax([1, 2, 3, 4, 5]) ➞ [1, 5]


function ejercicio06() {
    let entrada = prompt("Ingrese números separados por coma (ejemplo: 1,2,3,4,5):")
    const arrNum = entrada.split(',').map(Number);
    if (arrNum.some(isNaN)) {
        alert("Alguno de los valores ingresados no es válido.")
    } else {
        const minMax = numeros => [Math.min(...numeros), Math.max(...numeros)];
        alert(`El minimo y máximo son: ${minMax(arrNum)}`);
    }
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 7.Escriba una función que tome una matriz de 10 enteros (entre 0 y 9) y devuelva una cadena en forma de un número de teléfono.
// formatPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) ➞ "(123) 456-7890"

function ejercicio07() {
    let entrada = prompt("Ingrese 10 números entre 0 y 9 separados por coma (Ejemplo: 1,2,3,4,5,6,7,8,9,0):")
    const arrNum = entrada.split(',').map(Number);

    if (arrNum.leght !== 10 || arrNum.some(num => isNaN(num) || num < 0 || num > 9)) {
        alert("Debe ingresar exactamente 10 números enteros entre 0 y 9.");

    } else {
        alert(formatPhoneNumber(arrNum));
    }
    const formatPhoneNumber = numeros =>
        `(${numeros.slice(0, 3).join('')}) ${numeros.slice(3, 6).join('')}-${numeros.slice(6).join('')}`;
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 8.Cree una función que tome una matriz de matrices con números. Devuelve una nueva matriz (única) 
// con el mayor número de cada uno.
//  findLargestNums([[4, 2, 7, 1], [20, 70, 40, 90], [1, 2, 0]]) ➞ [7, 90, 2]



function ejercicio08() {
    let entrada = prompt("Ingrese matrices separadas por punto y coma, y los números por coma (ejemplo: 4,2,7,1;20,70,40,90;1,2,0):")
    const matriz = entrada.split(';').map(fila => fila.split(',').map(Number));

    if (matriz.some(fila => fila.some(isNaN))) {
        alert("Alguno de los valores ingresados no es válido.");
    } else { alert(`El mayor número de cada matriz es: ${findLargestNums(matriz)}`) }

    const findLargestNums = arr => arr.map(fila => Math.mac(...fila));

}




//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 9. Dada una palabra, escriba una función que devuelva el primer índice y el último índice de un carácter.

// charIndex("hello", "l") ➞ [2, 3]
// The first "l" has index 2, the last "l" has index 3.

// charIndex("circumlocution", "c") ➞ [0, 8]
// The first "c" has index 0, the last "c" has index 8.



function ejercicio09() {
    let palabra = prompt("Ingrese una palabra:");
    let caracter = prompt("Ingrese el carácter a buscar:");

    const charIndex = (str, char) => {
        let primero = str.indexOf(char);
        let ultimo = str.lastIndexOf(char);
        return primero === -1 ? [-1, -1] : [primero, ultimo];
    };

    alert(`Los índices del carácter "${caracter}" en "${palabra}" son: ${charIndex(palabra, caracter)}`);

}

//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//  10. Escriba una función que convierta un objeto en una matriz, 
// donde cada elemento representa un par clave-valor.
//  toArray({ a: 1, b: 2 }) ➞ [["a", 1], ["b", 2]]



function ejercicio10() {
    let entrada = prompt('Ingrese un objeto en formato clave:valor separado por comas (ejemplo: a:1,b:2):');
    const obj = {};
    entrada.split(',').forEach(par => {
        let [clave, valor] = par.split(':');
        obj[clave.trim()] = isNaN(Number(valor)) ? valor.trim() : Number(valor);
    });
    const toArray = objeto => Object.entries(objeto);
    alert(JSON.stringify(toArray(obj)));
}

//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//11. Cree la función que toma una matriz con objetos y devuelve la suma de los presupuestos de las personas.

/* getBudgets([
{ name: "John", age: 21, budget: 23000 },
{ name: "Steve",  age: 32, budget: 40000 },
{ name: "Martin",  age: 16, budget: 2700 }
]) ➞ 65700  */

function ejercicio11() {
    let entrada = prompt("Ingrese personas en formato nombre:edad:presupuesto separados por coma (ejemplo: John:21:23000,Steve:32:40000,Martin:16:2700):");
    const personas = entrada.split(',').map(par => {
        let [name, age, budget] = par.split(':');
        return { name: name.trim(), age: Number(age), budget: Number(budget) };
    });

    const getBudgets = arr => arr.reduce((total, persona) => total + persona.budget, 0);
    alert(`La suma de los presupuestos es: ${getBudgets(personas)}`);

}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 12. Cree una función que tome una matriz de estudiantes y devuelva una matriz de nombres de estudiantes.
/* getStudentNames([
{ name: "Steve" },
{ name: "Mike" },
{ name: "John" }
]) ➞ ["Becky", "John", "Steve"]  */



function ejercicio12() {
    let entrada = prompt('Ingrese estudiantes en formato { name: "Becky" }, { name: "John" }, { name: "Steve" }:');
    // Extrae los nombres usando una expresión regular
    const estudiantes = Array.from(entrada.matchAll(/name\s*:\s*"([^"]+)"/g), m => ({ name: m[1] }));

    const getStudentNames = arr => arr.map(est => est.name);

    alert(`Los nombres de los estudiantes son: ${JSON.stringify(getStudentNames(estudiantes))}`);
}







//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 13. Escriba una función que convierta un objeto en una matriz de claves y valores.
/* objectToArray({
likes: 2,
dislikes: 3,
followers: 10
}) ➞ [["likes", 2], ["dislikes", 3], ["followers", 10]]   */



function ejercicio13() {
    let entrada = prompt('Ingrese un objeto en formato clave:valor separado por comas (ejemplo: likes:2,dislikes:3,followers:10):');
    const obj = {};
    entrada.split(',').forEach(par => {
        let [clave, valor] = par.split(':');
        obj[clave.trim()] = isNaN(Number(valor)) ? valor.trim() : Number(valor);
    });
    const objectToArray = objeto => Object.entries(objeto);
    alert(JSON.stringify(objectToArray(obj)));
}




//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 14)	Cree una función donde, dado el número n, devuelva la suma de todos los números cuadrados  incluyendo n.
// squaresSum(3) ➞ 14
// 1² + 2² + 3² =
// 1 + 4 + 9 =
// 14

function ejercicio14() {
    let n = Number(prompt("Ingrese el número n:"));

    if (isNaN(n) || n < 1) {
        alert("El valor ingresado no es válido.");
        return;
    }

    const squaresSum = num => {
        let suma = 0;
        for (let i = 1; i <= num; i++) {
            suma += i ** 2;
        }
        return suma;
    };
    alert(`La suma de los cuadrados desde 1 hasta ${n} es: ${squaresSum(n)}`);
}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 15. Cree una función para multiplicar todos los valores en una matriz por la cantidad de valores en la matriz dada
//  multiplyByLength([2, 3, 1, 0]) ➞ [8, 12, 4, 0]

function ejercicio15() {
    let entrada = prompt("Ingrese los números separados por coma (ejemplo: 2,3,1,0):");
    const arrNum = entrada.split(',').map(Number);

    if (arrNum.some(isNaN)) {
        alert("lguno de los valores ingresados no es válido.");
        return;
    }
    const multiplyByLength = arr => arr.map(num => num * arr.length);
    alert(`El resultado es: ${multiplyByLength(arrNum)}`)

}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//16. Cree una función que tome un número como argumento y devuelva una matriz de números contando desde este número a cero.
// countdown(5) ➞ [5, 4, 3, 2, 1, 0]

function ejercicio16() {
    let n = Number(prompt("Ingrese el número inicial para el conteo regresivo: "));

    if (isNaN(n) || n < 0) {
        alert("El valor ingresado no es válido.");
        return;
    }

    const countdown = num => {
        let arr = [];
        for (let i = num; i >= 0; i--) {
            arr.push(i);
        }
        return arr;
    };
    alert(`El conteo regresivo es: ${countdown(n)}`);

}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 17.	Cree una función que tome una matriz 
// y devuelva la diferencia entre los números más grandes
//  y más pequeños.
// diffMaxMin([10, 4, 1, 4, -10, -50, 32, 21]) ➞ 82
// Smallest number is -50, biggest is 32.

function ejercicio17() {
    let entrada = prompt("Ingrese los números separados por coma (ejemplo: 10,4,1,4,-10,-50,32,21):");
    const arrNum = entrada.split(',').map(Number);
    if (arrNum.some(isNaN)) {
        alert("Alguno de los valores ingresados no es válido.");
        return;
    }

    const diffMaxMin = arr => Math.max(...arr) - Math.min(...arr);
    alert(`La diferencia entre el mayor y el menor es: ${diffMaxMin(arrNum)}`);
}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 18. Cree una función que filtre las cadenas de una matriz y devuelva una nueva matriz que solo contenga enteros.
//  filterList([1, 2, 3, "x", "y", 10]) ➞ [1, 2, 3, 10]

function ejercicio18() {

    let entrada = prompt("Ingrese valores separados por coma (ejemplo: 1,2,3,x,y,10):");
    const arr = entrada.split(',').map(valor => {
        let num = Number(valor.trim());
        return isNaN(num) ? valor.trim() : num;
    });
    const filterList = lista => lista.filter(item => typeof item === "number" && Number.isInteger(item));
    alert(`La nueva matriz solo con enteros es: [${filterList(arr)}]`);
}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 19)	Cree una función que tome dos argumentos (elemento, tiempos). El primer argumento (elemento) es el elemento que necesita repetirse, mientras que el segundo argumento (veces) es la cantidad de veces que se debe repetir el elemento. Devuelve el resultado en una matriz.
//  repeat(13, 5) ➞ [13, 13, 13, 13, 13]

function ejercicio19() {
    let elemento = prompt("Ingrese el elemento a repetir:");
    let veces = Number(prompt("Ingrese la cantidad de veces que se debe repetir:"));
    if (isNaN(veces) || veces < 1) {
        alert("La cantidad de veces no es válida.");
        return;
    } const repeat = (el, n) => Array(n).fill(el);

    alert(`El resultado es: [${repeat(elemento, veces)}]`);

}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 20. Escriba una función, .vreplace () que extienda el prototipo de cadena reemplazando todas las vocales 
// en una cadena con una vocal especificada.
//  "apples and bananas".vreplace("u") ➞ "upplus und bununus"

String.prototype.vreplace = function(vocal) {
    return this.replace(/[aeiou]/gi, vocal);
};

function ejercicio20() {
    let texto = prompt("Ingrese una cadena:");
    let nuevaVocal = prompt("Ingrese la vocal para reemplazar:");
    alert(texto.vreplace(nuevaVocal));

}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 21. Te dan una cadena de palabras. Debe encontrar la palabra "Nemo" y devolver una cadena como 
// esta: "¡Encontré a Nemo en [el orden de la palabra que encuentra nemo]!".
//findNemo("I am finding Nemo !") ➞ "I found Nemo at 4!"


function ejercicio21() { 
let frase =  prompt ("Ingrese una cadena de palabras:");
const palabras = frase.split(" ");
const indice =  palabras.findIndex(palabra => palabra.replace(/[^a-zA-Z]/g, "") === "Nemo");
if (indice !== -1) {
    alert (`Enconte "Nemo" en el orden ${indice + 1}!`);
    
} else {
    alert ("Nemo no fue encontrado.");

}

}





//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 22. Cree una función que capitalice la última letra de cada palabra.
// capLast("hello") ➞ "hellO"

function ejercicio22() { 
    let frase = prompt ("Ingrese una cadena de palabras:");
    const capLast = str => str.split (' ').map(palabra => palabra.length > 0 ? palabra.slice(0,-1) + palabra.slice(-1).toUpperCase() : "").join(' ');
    alert(capLast(frase));
}

