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

btnEjercicio3.addEventListener("click", function () {
    let numerosEnCaracteres = inputEjercicio3.value;

    const arrNum = numerosEnCaracteres.split(',').map(Number);

    if (arrNum.some(isNaN)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        alert(`La suma de los siguientes numeros: ${arrNum} es: ${sumaDeCubos(...arrNum)}`)
    }

})

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

btnEjercicio5.addEventListener("click", function () {
    let number1 = Number(num1.value);
    let number2 = Number(num2.value);
    let opera = operation.value;

    if (isNaN(number1) || isNaN(number2)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        alert(`El ejercicio es: ${number1} ${opera} ${number2} = ${calculator(number1, number2, opera)}`)
    }

})

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

/* Cards ejercicio 01-2 */
const presentarPersona = (nombre, apellido, edad) =>
  `Hola mi nombre es ${nombre} ${apellido} y mi edad ${edad}`;
document.getElementById("btnPresentacionPersona").addEventListener("click", () => {
  const nombre = document.getElementById("inputNombrePersona").value.trim();
  const apellido = document.getElementById("inputApellidoPersona").value.trim();
  const edad = document.getElementById("inputEdadPersona").value.trim();

  const resultado = document.getElementById("resultadoPresentacionPersona");

  if (nombre && apellido && edad) {
    resultado.textContent = presentarPersona(nombre, apellido, edad);
  } else {
    resultado.textContent = "Por favor complete todos los campos.";
  }
});
/* Cards ejercicio 02-2 */
const sumOfCubes = (...nums) => nums.reduce((acc, n) => acc + n ** 3, 0);
document.getElementById("btnSumOfCubes").addEventListener("click", () => {
  const input = document.getElementById("inputSumOfCubes").value.trim();
  const resultado = document.getElementById("resultadoSumOfCubes");

  if (!input) {
    resultado.textContent = "Por favor ingrese al menos un número.";
    return;
  }

  const numeros = input
    .split(",")
    .map(n => parseFloat(n.trim()))
    .filter(n => !isNaN(n));

  if (numeros.length === 0) {
    resultado.textContent = "Entrada inválida. Use números separados por coma.";
    return;
  }

  const suma = sumOfCubes(...numeros);
  resultado.textContent = `sumOfCubes(${numeros.join(", ")}) ➞ ${suma}`;
});
/* Cards ejercicio 03-2 */
const getType = value => {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
};
document.getElementById("btnTipoDeValor").addEventListener("click", () => {
  const input = document.getElementById("inputTipoDeValor").value.trim();
  const resultado = document.getElementById("resultadoTipoDeValor");

  let valorEvaluado;

  try {
    valorEvaluado = eval(input);
  } catch (e) {
    resultado.textContent = "Entrada inválida. Intente con un valor válido de JavaScript.";
    return;
  }

  const tipo = getType(valorEvaluado);
  resultado.textContent = `getType(${input}) ➞ ${tipo}`;
});
/* Cards ejercicio 04-2 */
const sumaNumeros = (...args) => args.reduce((acc, n) => acc + n, 0);
document.getElementById("btnSumaRest").addEventListener("click", () => {
  const input = document.getElementById("inputSumaRest").value.trim();
  const resultado = document.getElementById("resultadoSumaRest");

  if (!input) {
    resultado.textContent = "Por favor ingrese al menos un número.";
    return;
  }

  const numeros = input
    .split(",")
    .map(n => parseFloat(n.trim()))
    .filter(n => !isNaN(n));

  if (numeros.length === 0) {
    resultado.textContent = "Entrada inválida. Use números separados por coma.";
    return;
  }

  const suma = sumaNumeros(...numeros);
  resultado.textContent = `sumaNumeros(${numeros.join(", ")}) ➞ ${suma}`;
});
/* Cards ejercicio 05-2 */
const filtrarStrings = (arr) => arr.filter(item => typeof item === "string");
document.getElementById("btnFiltrarStrings").addEventListener("click", () => {
  const input = document.getElementById("inputFiltrarStrings").value.trim();
  const resultado = document.getElementById("resultadoFiltrarStrings");

  if (!input) {
    resultado.textContent = "Por favor ingrese al menos un valor.";
    return;
  }

  try {
    // Convertimos la entrada en un array usando eval de forma controlada
    const valores = eval(`[${input}]`);
    const filtrados = filtrarStrings(valores);
    resultado.textContent = `filtrarStrings([${valores.join(", ")}]) ➞ [${filtrados.join(", ")}]`;
  } catch (error) {
    resultado.textContent = "Entrada inválida. Asegúrate de usar comillas para strings y separar por comas.";
  }
});
/* Cards ejercicio 06-2 */
const minMax = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  return [min, max];
};
document.getElementById("btnMinMax").addEventListener("click", () => {
  const input = document.getElementById("inputMinMax").value.trim();
  const resultado = document.getElementById("resultadoMinMax");

  if (!input) {
    resultado.textContent = "Por favor ingrese al menos un número.";
    return;
  }

  const numeros = input
    .split(",")
    .map(n => parseFloat(n.trim()))
    .filter(n => !isNaN(n));

  if (numeros.length === 0) {
    resultado.textContent = "Entrada inválida. Use números separados por coma.";
    return;
  }

  const [min, max] = minMax(numeros);
  resultado.textContent = `minMax([${numeros.join(", ")}]) ➞ [${min}, ${max}]`;
});
/* Cards ejercicio 07-2 */
const formatearTelefono = (numeros) => {
  if (!Array.isArray(numeros) || numeros.length !== 10 || !numeros.every(n => Number.isInteger(n) && n >= 0 && n <= 9)) {
    return "Entrada inválida. Debe ser una matriz de 10 enteros entre 0 y 9.";
  }

  const area = numeros.slice(0, 3).join("");
  const central = numeros.slice(3, 6).join("");
  const line = numeros.slice(6).join("");

  return `(${area}) ${central}-${line}`;
};
document.getElementById("btnFormatoTelefono").addEventListener("click", () => {
  const input = document.getElementById("inputFormatoTelefono").value.trim();
  const resultado = document.getElementById("resultadoFormatoTelefono");

  try {
    const numeros = eval(`[${input}]`);
    const formato = formatearTelefono(numeros);
    resultado.textContent = `formatearTelefono([${numeros.join(", ")}]) ➞ "${formato}"`;
  } catch (error) {
    resultado.textContent = "Entrada inválida. Use 10 números separados por coma.";
  }
});
/* Cards ejercicio 08-2 */
const maximosUnicos = (matriz) => {
  if (!Array.isArray(matriz) || !matriz.every(sub => Array.isArray(sub) && sub.every(n => typeof n === "number"))) {
    return "Entrada inválida. Debe ser una matriz de matrices con números.";
  }

  const maximos = matriz.map(sub => Math.max(...sub));
  const unicos = [...new Set(maximos)];
  return unicos;
};
document.getElementById("btnMaximosUnicos").addEventListener("click", () => {
  const input = document.getElementById("inputMaximosUnicos").value.trim();
  const resultado = document.getElementById("resultadoMaximosUnicos");

  try {
    const matriz = eval(`[${input}]`);
    const salida = maximosUnicos(matriz);
    resultado.textContent = Array.isArray(salida)
      ? `maximosUnicos(${JSON.stringify(matriz)}) ➞ [${salida.join(", ")}]`
      : salida;
  } catch (error) {
    resultado.textContent = "Entrada inválida. Use submatrices separadas por coma.";
  }
});
/* Cards ejercicio 09-2 */
const buscarIndices = (palabra, caracter) => {
  if (typeof palabra !== "string" || typeof caracter !== "string" || caracter.length !== 1) {
    return "Entrada inválida. Debe ser una palabra y un solo carácter.";
  }

  const primero = palabra.indexOf(caracter);
  const ultimo = palabra.lastIndexOf(caracter);

  return primero === -1 ? `El carácter "${caracter}" no se encuentra en "${palabra}".` : [primero, ultimo];
};
document.getElementById("btnBuscarIndices").addEventListener("click", () => {
  const palabra = document.getElementById("inputPalabra").value.trim();
  const caracter = document.getElementById("inputCaracter").value.trim();
  const resultado = document.getElementById("resultadoIndicesCaracter");

  const salida = buscarIndices(palabra, caracter);
  resultado.textContent = Array.isArray(salida)
    ? `buscarIndices("${palabra}", "${caracter}") ➞ [${salida.join(", ")}]`
    : salida;
});
/* Cards ejercicio 10-2 */
const convertirObjeto = (obj) => {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
    return "Entrada inválida. Debe ser un objeto simple.";
  }
  return Object.entries(obj);
};
document.getElementById("btnObjetoAMatriz").addEventListener("click", () => {
  const input = document.getElementById("inputObjetoAMatriz").value.trim();
  const resultado = document.getElementById("resultadoObjetoAMatriz");

  try {
    const objeto = eval(`(${input})`);
    const matriz = convertirObjeto(objeto);
    resultado.textContent = Array.isArray(matriz)
      ? `convertirObjeto(${JSON.stringify(objeto)}) ➞ ${JSON.stringify(matriz)}`
      : matriz;
  } catch (error) {
    resultado.textContent = "Entrada inválida. Use un objeto válido como {clave: valor}.";
  }
});
/* Cards ejercicio 11-2 */
const sumaPresupuestos = (personas) => {
  if (!Array.isArray(personas)) return "Entrada inválida. Debe ser una matriz de objetos.";
  
  return personas.reduce((total, persona) => {
    const presupuesto = typeof persona.presupuesto === "number" ? persona.presupuesto : 0;
    return total + presupuesto;
  }, 0);
};
document.getElementById("btnSumaPresupuestos").addEventListener("click", () => {
  const input = document.getElementById("inputSumaPresupuestos").value.trim();
  const resultado = document.getElementById("resultadoSumaPresupuestos");

  try {
    const personas = eval(`(${input})`);
    const suma = sumaPresupuestos(personas);
    resultado.textContent = `Total presupuestos ➞ ${suma}`;
  } catch (error) {
    resultado.textContent = "Entrada inválida. Use una matriz válida de objetos.";
  }
});
/* Cards ejercicio 12-2 */
const extraerNombres = (estudiantes) => {
  if (!Array.isArray(estudiantes)) return "Entrada inválida. Debe ser una matriz de objetos.";
  
  return estudiantes.map(est => est.nombre ?? "(sin nombre)");
};
document.getElementById("btnNombresEstudiantes").addEventListener("click", () => {
  const input = document.getElementById("inputNombresEstudiantes").value.trim();
  const resultado = document.getElementById("resultadoNombresEstudiantes");

  try {
    const estudiantes = eval(`(${input})`);
    const nombres = extraerNombres(estudiantes);
    resultado.textContent = `Nombres ➞ ${JSON.stringify(nombres)}`;
  } catch (error) {
    resultado.textContent = "Entrada inválida. Use una matriz válida de objetos con campo 'nombre'.";
  }
});
/* Cards ejercicio 13-2 */
// Función que convierte un objeto en una matriz de pares clave-valor
const convertirObjetoAMatriz = (obj) => {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
    return "❌ Entrada inválida. Debe ser un objeto simple.";
  }
  return Object.entries(obj);
};

// Controlador del botón
document.getElementById("objetoAMatrizBtn").addEventListener("click", () => {
  const input = document.getElementById("objetoAMatrizInput").value.trim();
  const resultado = document.getElementById("objetoAMatrizResultado");

  try {
    const objeto = eval(`(${input})`);
    const matriz = convertirObjetoAMatriz(objeto);
    resultado.textContent = Array.isArray(matriz)
      ? `✅ Resultado: ${JSON.stringify(matriz)}`
      : matriz;
  } catch (error) {
    resultado.textContent = "❌ Error de sintaxis. Usa un objeto válido como {clave: valor}.";
  }
});

