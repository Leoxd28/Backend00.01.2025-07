const inputEjercicio10 = document.getElementById("inputEjercicio10");
const inputEjercicio11 = document.getElementById("inputEjercicio11");



const btnEjercicio1 = document.getElementById("btnEjercicio1");

btnEjercicio1.addEventListener("click", 
    function() {
    let numero1 = Number(inputEjercicio10.value);
    let numero2 = Number(inputEjercicio11.value);
    
    if(isNaN(numero1) || isNaN(numero2)) {
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

btnEjercicio2.addEventListener("click", function() {
    let baseNum = Number(base.value);
    let exponenteNum = Number(exponente.value);
    
    if(isNaN(baseNum) || isNaN(exponenteNum)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        alert(`El numero: ${baseNum} a la potencia: ${exponenteNum} es igual a: ${potenciaDeUnNumero(baseNum, exponenteNum)}`)
    }

})

function potenciaDeUnNumero(base, exponente) {
    let acumulado = 1
    for(let i = 0; i < exponente; i++) {
        acumulado *= base;
    }

    return acumulado;

}

const inputEjercicio3 = document.getElementById("inputEjercicio3");

const btnEjercicio3 = document.getElementById("btnEjercicio3");

btnEjercicio3.addEventListener("click", function() {
    let numerosEnCaracteres = inputEjercicio3.value;

    const arrNum = numerosEnCaracteres.split(',').map(Number);

    if(arrNum.some(isNaN)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        alert(`La suma de los siguientes numeros: ${arrNum} es: ${sumaDeCubos(...arrNum)}`)
    }

})

function sumaDeCubos(...nums) {
    let suma = 0;

    for(let i = 0; i<nums.length; i++) {
        suma += nums[i] ** 3;
    }

    return suma
}


const baseTri = document.getElementById('baseTri');
const alturaTri = document.getElementById('alturaTri');
const btnEjercicio4 = document.getElementById("btnEjercicio4");

btnEjercicio4.addEventListener("click", function() {
    let baseTriNum = Number(baseTri.value);
    let alturaTriNum = Number(alturaTri.value);

    if(isNaN(baseTriNum) || isNaN(alturaTriNum)) {
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

btnEjercicio5.addEventListener("click", function() {
    let number1 = Number(num1.value);
    let number2 = Number(num2.value);
    let opera = operation.value;

    if(isNaN(number1) || isNaN(number2)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        alert(`El ejercicio es: ${number1} ${opera} ${number2} = ${calculator(number1, number2, opera)}`)
    }

})

function calculator(num1, num2, operation) {
    switch(operation) {
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

