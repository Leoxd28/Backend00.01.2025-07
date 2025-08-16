const inputEjercicio10 = document.getElementById("inputEjercicio10");
const inputEjercicio11 = document.getElementById("inputEjercicio11");

const btnEjercicio1 = document.getElementById("btnEjercicio1");

btnEjercicio1.addEventListener("click", function () {
    let numero1 = Number(inputEjercicio10.value);
    let numero2 = Number(inputEjercicio11.value);

    if (isNaN(numero1) || isNaN(numero2)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        alert(`La suma de los numeros: ${numero1} + ${numero2} = ${sumaDeDosNumeros(numero1, numero2)}`)
    }

})

function sumaDeDosNumeros(a, b) {
    return a + b
}


const base = document.getElementById("base");
const exponente = document.getElementById("exponente");

const btnEjercicio2 = document.getElementById("btnEjercicio2");

btnEjercicio2.addEventListener("click", function () {
    let baseNum = Number(base.value);
    let exponenteNum = Number(exponente.value);

    if (isNaN(baseNum) || isNaN(exponenteNum)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        alert(`El numero: ${baseNum} a la potencia: ${exponenteNum} es igual a: ${potenciaDeUnNumero(baseNum, exponenteNum)}`)
    }

})

function potenciaDeUnNumero(base, exponente) {
    let acumulado = 1
    for (let i = 0; i < exponente; i++) {
        acumulado *= base;
    }

    return acumulado;

}

const inputEjercicio3 = document.getElementById("inputEjercicio3");

const btnEjercicio3 = document.getElementById("btnEjercicio3");

btnEjercicio3.addEventListener("click",
    
    function () {
    let numerosEnCaracteres = inputEjercicio3.value;

    const arrNum = numerosEnCaracteres.split(',').map(Number);

    if (arrNum.some(isNaN)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        alert(`La suma de los siguientes numeros: ${arrNum} es: ${sumaDeCubos(...arrNum)}`)
    }

}
)

function sumaDeCubos(...nums) {
    let suma = 0;

    for (let i = 0; i < nums.length; i++) {
        suma += nums[i] ** 3;
    }

    return suma
}


const baseTri = document.getElementById('baseTri');
const alturaTri = document.getElementById('alturaTri');
const btnEjercicio4 = document.getElementById("btnEjercicio4");

btnEjercicio4.addEventListener("click", function () {
    let baseTriNum = Number(baseTri.value);
    let alturaTriNum = Number(alturaTri.value);

    if (isNaN(baseTriNum) || isNaN(alturaTriNum)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        alert(`El area de un triangulo con base: ${baseTriNum} y altura: ${alturaTriNum} es: ${triArea(baseTriNum, alturaTriNum)}`)
    }

})

function triArea(base, altura) {
    return (base * altura) / 2;
}

const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const operation = document.getElementById('operation');
const btnEjercicio5 = document.getElementById("btnEjercicio5");

btnEjercicio5.addEventListener("click", 
    
    function () {
    let number1 = Number(num1.value);
    let number2 = Number(num2.value);
    let opera = operation.value;

    if (isNaN(number1) || isNaN(number2)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        alert(`El ejercicio es: ${number1} ${opera} ${number2} = ${calculator(number1, number2, opera)}`)
    }

}
)

function calculator(num1, num2, operation) {
    switch (operation) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "x":
        case "*":
            return num1 * num2;
        case "/":
            return num2 !== 0 ? num1 / num2 : "No se puede dividir entre 0";
        case "%":
            return num1 % num2;
        default:
            return "El parametro no es reconocido";
    }
}


const inputEjercicio14 = document.getElementById('inputEjercicio14');
const btnEjercicio14 = document.getElementById("btnEjercicio14");

btnEjercicio14.addEventListener("click", function () {
    let number1 = Number(inputEjercicio14.value);


    if (isNaN(number1)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        alert(`Para la suma de cuadrados del siguiente numero: ${number1} es: ${sumaDeCuadrados(number1)}`)
    }

})

function sumaDeCuadrados(numero) {
    let suma = 0;

    for (let i = 1; i <= numero; i++) {
        suma += i * i;
    }

    return suma;
}

const inputEjercicio15 = document.getElementById('inputEjercicio15');
const btnEjercicio15 = document.getElementById("btnEjercicio15");

btnEjercicio15.addEventListener("click", function () {

    let arrNum = (inputEjercicio15.value).split(',').map(Number);


    if (arrNum.some(isNaN)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        alert(`La matriz data es: [${arrNum}] es: [${multiplyByTotalElements(arrNum)}]`)
    }

})

function multiplyByTotalElements(array) {
    const totalDeElementos = array.length;
    const result = array.map(item => item * totalDeElementos);
    return result;
}

const inputEjercicio16 = document.getElementById('inputEjercicio16');
const btnEjercicio16 = document.getElementById("btnEjercicio16");

btnEjercicio16.addEventListener("click", function () {

    let numero = Number(inputEjercicio16.value);


    if (isNaN(numero)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        alert(`Para el numero: ${numero} su matriz a cero es: [${countToZero(numero)}]`)
    }

})

function countToZero(n) {
    const result = [];
    const step = n > 0 ? -1 : 1;

    for (let i = n; i !== 0; i += step) {
        result.push(i);
    }

    result.push(0);
    return result;
}

const inputEjercicio17 = document.getElementById('inputEjercicio17');
const btnEjercicio17 = document.getElementById("btnEjercicio17");

btnEjercicio17.addEventListener("click", function () {

    let arrNum = (inputEjercicio17.value).split(',').map(Number);


    if (arrNum.some(isNaN)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        const { max, min, result } = Smallest(arrNum);

        alert(`La diferencia entre el mayo:${max} y el menor:${min} es: ${result}`)
    }

})

function Smallest(array) {
    const max = Math.max(...array);
    const min = Math.min(...array);

    return { max, min, result: max - min }
}



const inputEjercicio18 = document.getElementById('inputEjercicio18');
const btnEjercicio18 = document.getElementById("btnEjercicio18");

btnEjercicio18.addEventListener("click", function () {

    let arrNum = (inputEjercicio18.value).split(',');


    if (false) {
        alert('El numero ingresado es incorrecto.')
    } else {

        alert(`Array proporcionado: [${arrNum}], array filtrado: [${filterList(arrNum)}]`);
    }

})

function filterList(array) {
    const arrNum = array.map(Number);
    return arrNum.filter(item => Number.isInteger(item));
}

const element = document.getElementById('element');
const qty = document.getElementById('qty');
const btnEjercicio19 = document.getElementById("btnEjercicio19");

btnEjercicio19.addEventListener("click", function () {

    let elemento = Number(element.value);
    let cantidad = Number(qty.value);

    if (isNaN(elemento) || isNaN(cantidad)) {
        alert('El numero ingresado es incorrecto.')
    } else {

        alert(`Elemento: [${elemento}], cantidad: ${cantidad}, result: [${repeat(elemento, cantidad)}]`);
    }

})

function repeat(elemento, times) {
    return Array(times).fill(elemento);
}

const inputEjercicio20 = document.getElementById('inputEjercicio20');
const btnEjercicio20 = document.getElementById("btnEjercicio20");

btnEjercicio20.addEventListener("click", function () {

    let str = inputEjercicio20.value;

    if (false) {
        alert('El numero ingresado es incorrecto.')
    } else {

        alert(`La palabra es: ${str}, reemplazado: ${str.vreplace("u")}`);
    }

})

String.prototype.vreplace = function(vocal) {
    return this.replace(/[aeiou]/gi, vocal)
}


const inputEjercicio21 = document.getElementById('inputEjercicio21');
const btnEjercicio21 = document.getElementById("btnEjercicio21");

btnEjercicio21.addEventListener("click", function () {

    let str = inputEjercicio21.value;

    if (false) {
        alert('El numero ingresado es incorrecto.')
    } else {

        alert(`La palabra es: ${str}, result: ${findNemo(str)}`);
    }

})

function findNemo(oracion) {
    const word = oracion.split(' ');
    const index = word.indexOf('Nemo') + 1;

    return `I found Nemo at ${index}`;
}

const inputEjercicio22 = document.getElementById('inputEjercicio22');
const btnEjercicio22 = document.getElementById("btnEjercicio22");

btnEjercicio22.addEventListener("click", function () {

    let str = inputEjercicio22.value;

    if (false) {
        alert('El numero ingresado es incorrecto.')
    } else {

        alert(`La palabra es: ${str}, result: ${capLast(str)}`);
    }

})

function capLast(str) {
    return str.split(' ').map(word => {
        return word.slice(0, -1) + word.slice(-1).toUpperCase();
    }).join(' ');
}