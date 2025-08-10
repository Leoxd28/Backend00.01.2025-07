/*Ejercicio1*/
const inputEjercicio1 = document.getElementById("inputEjercicio1");
const btnEjercicio1 = document.getElementById("btnEjercicio1");
btnEjercicio1.addEventListener("click", function(){
    let numero = Number(inputEjercicio1.value);
    if(isNaN(numero)) {
        alert("Por favor, ingresa un número válido.");
    } else{
        if(Math.abs(numero) >= 100 && Math.abs(numero) <= 999){
            alert("El número es de 3 dígitos");
        } else{
            alert("El número NO es de 3 dígitos");
        }
    }
})
/*Ejercicio2*/
const inputEjercicio2 = document.getElementById("inputEjercicio2");
const btnEjercicio2 = document.getElementById("btnEjercicio2");
btnEjercicio2.addEventListener("click", function(){
    let numero = Number(inputEjercicio2.value);
        if(isNaN(numero)) {
            alert("el número ingresado es incorrecto");
        }else{
            if(numero > 0){
                alert("El número es positivo");
            } else if(numero < 0){
                alert("El número es negativo");
            } else {
                alert("El número es cero");
            }
        }
})
/*Ejercicio3*/
const inputEjercicio3 = document.getElementById("inputEjercicio3");
const btnEjercicio3 = document.getElementById("btnEjercicio3");
btnEjercicio3.addEventListener("click", function(){
    let numero = Number(inputEjercicio3.value);
        if(isNaN(numero)) {
            alert("el número ingresado es incorrecto");
        }else{
            if(numero % 10 === 4 || numero % -10 === -4){
                alert("El número termina en 4");
            } else {
                alert("El número NO termina en 4");
            }
        }
})
/*Ejercicio4*/
document.getElementById('btnEjercicio4').addEventListener('click', function () {
            const num1 = Number(document.getElementById('inputEjercicio4_1').value);
            const num2 = Number(document.getElementById('inputEjercicio4_2').value);
            const num3 = Number(document.getElementById('inputEjercicio4_3').value);
            const resultado = document.getElementById('resultadoEjercicio4');
            if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
                resultado.textContent = "Debe ingresar números válidos.";
            } else {
                const numeros = [num1, num2, num3];
                numeros.sort((a, b) => a - b);
                resultado.textContent = "Números ordenados de menor a mayor: " + numeros.join(", ");
            }
});
/*Ejercicio5*/
function mostrarResultado5(mensaje) {
    document.getElementById('resultadoEjercicio5').innerHTML = mensaje;
}
document.getElementById('btnEjercicio5').addEventListener('click', function () {
    const inputEjercicio5 = document.getElementById('inputEjercicio5');
    let cantidadZapatos = Number(inputEjercicio5.value);
    if (isNaN(cantidadZapatos) || cantidadZapatos < 0) {
        mostrarResultado5("Debe ingresar una cantidad válida.");
    } else {
        let precioPorZapato = 80;
        let totalCompra = cantidadZapatos * precioPorZapato;
        let descuento = 0;
        if (cantidadZapatos > 30) {
            descuento = 0.40;
        } else if (cantidadZapatos > 20) {
            descuento = 0.20;
        } else if (cantidadZapatos > 10) {
            descuento = 0.10;
        }
        let montoDescuento = totalCompra * descuento;
        let totalConDescuento = totalCompra - montoDescuento;
        let mensaje = "Total sin descuento: $" + totalCompra.toFixed(2);
        mensaje += "<br>Descuento aplicado: " + (descuento * 100) + "%";
        mensaje += "<br>Monto de descuento: $" + montoDescuento.toFixed(2);
        mensaje += "<br>Total a pagar: $" + totalConDescuento.toFixed(2);
        mostrarResultado5(mensaje);
    }
});
/*Ejercicio6*/
document.getElementById('btnEjercicio6').addEventListener('click', function() {
    const input = document.getElementById('inputEjercicio6');
    const resultado = document.getElementById('resultadoEjercicio6');
    const horasTrabajadas = Number(input.value);
    const sueldoNormal = 20;
    const sueldoExtra = 25;
    if (isNaN(horasTrabajadas) || horasTrabajadas < 0) {
        resultado.textContent = "Debe ingresar una cantidad válida.";
    } else {
        let sueldoSemanal = 0;
        if (horasTrabajadas <= 40) {
            sueldoSemanal = horasTrabajadas * sueldoNormal;
        } else {
            let horasExtras = horasTrabajadas - 40;
            sueldoSemanal = (40 * sueldoNormal) + (horasExtras * sueldoExtra);
        }
        resultado.innerHTML = 
            "Horas trabajadas: " + horasTrabajadas + "<br>" +
            "Sueldo por hora normal: $" + sueldoNormal + "<br>" +
            "Sueldo por hora extra: $" + sueldoExtra + "<br>" +
            "Sueldo semanal: $" + sueldoSemanal.toFixed(2);
    }
});
/*Ejercicio7*/
function mostrarResultado7(mensaje) {
        document.getElementById('resultadoEjercicio7').textContent = mensaje;
}
document.getElementById('btnEjercicio7').addEventListener('click', function () {
        const inputEjercicio7 = document.getElementById('inputEjercicio7');
        const inputEjercicio7_2 = document.getElementById('inputEjercicio7_2');
        let tipoMembresia = inputEjercicio7.value.trim().toUpperCase();
        let totalCompra = Number(inputEjercicio7_2.value);
        if (isNaN(totalCompra) || totalCompra < 0) {
            mostrarResultado7("Debe ingresar un total de compra válido.");
        } else {
            let descuento = 0;
            if (tipoMembresia === "A") {
                descuento = 0.10;
            } else if (tipoMembresia === "B") {
                descuento = 0.15;
            } else if (tipoMembresia === "C") {
                descuento = 0.20;
            } else {
                mostrarResultado7("Tipo de membresía no válido. Use A, B o C.");
                return;
            }
            let totalConDescuento = totalCompra * (1 - descuento);
            mostrarResultado7("Total a pagar después del descuento: $" + totalConDescuento.toFixed(2));
        }
});
/*Ejercicio8*/
function mostrarResultado8(mensaje) {
            document.getElementById('resultadoEjercicio8').textContent = mensaje;
}
document.getElementById('btnEjercicio8').addEventListener('click', function () {
            const nota1 = Number(document.getElementById('inputEjercicio8_1').value);
            const nota2 = Number(document.getElementById('inputEjercicio8_2').value);
            const nota3 = Number(document.getElementById('inputEjercicio8_3').value);
            if (
                isNaN(nota1) || isNaN(nota2) || isNaN(nota3) ||
                nota1 < 0 || nota1 > 100 ||
                nota2 < 0 || nota2 > 100 ||
                nota3 < 0 || nota3 > 100
            ) {
                mostrarResultado8("Debe ingresar notas válidas entre 0 y 100.");
            } else {
                const promedio = (nota1 + nota2 + nota3) / 3;
                if (promedio >= 60) {
                    mostrarResultado8("Aprobado con promedio: " + promedio.toFixed(2));
                } else {
                    mostrarResultado8("Reprobado con promedio: " + promedio.toFixed(2));
                }
            }
});
/*Ejercicio9*/
function mostrarResultado9(mensaje) {
        document.getElementById('resultadoEjercicio9').textContent = mensaje;
}
document.getElementById('btnEjercicio9').addEventListener('click', function () {
        const inputEjercicio9 = document.getElementById('inputEjercicio9');
        let salarioActual = Number(inputEjercicio9.value);
        if (isNaN(salarioActual) || salarioActual < 0) {
            mostrarResultado9("Debe ingresar un salario válido.");
        } else {
            let aumento = 0;
            if (salarioActual >= 2000) {
                aumento = 0.05;
            } else {
                aumento = 0.10;
            }
            let nuevoSalario = salarioActual * (1 + aumento);
            mostrarResultado9("Nuevo salario después del aumento: $" + nuevoSalario.toFixed(2));
        }
});
/*Ejercicio10*/
function mostrarResultado10(mensaje) {
        document.getElementById('resultadoEjercicio10').textContent = mensaje;
}
document.getElementById('btnEjercicio10').addEventListener('click', function () {
        const input = document.getElementById('inputEjercicio10');
        let numero = Number(input.value);
        if (isNaN(numero)) {
            mostrarResultado10("Debe ingresar un número válido.");
        } else {
            if (numero % 2 === 0) {
                mostrarResultado10("El número es par.");
            } else {
                mostrarResultado10("El número es impar.");
            }
        }
});
/*Ejercicio11*/
function mostrarResultado11(mensaje) {
        document.getElementById('resultadoEjercicio11').textContent = mensaje;
}
document.getElementById('btnEjercicio11').addEventListener('click', function () {
        const num1 = Number(document.getElementById('inputEjercicio11_1').value);
        const num2 = Number(document.getElementById('inputEjercicio11_2').value);
        const num3 = Number(document.getElementById('inputEjercicio11_3').value);
        if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
            mostrarResultado11("Debe ingresar números válidos.");
        } else {
            let mayor = num1;
            if (num2 > mayor) {
                mayor = num2;
            }
            if (num3 > mayor) {
                mayor = num3;
            }
            mostrarResultado11("El número mayor es: " + mayor);
        }
});
/*Ejercicio12*/
function mostrarResultado12(mensaje) {
        document.getElementById('resultadoEjercicio12').textContent = mensaje;
}
document.getElementById('btnEjercicio12').addEventListener('click', function () {
        const input1 = document.getElementById('inputEjercicio12_1');
        const input2 = document.getElementById('inputEjercicio12_2');
        let num1 = Number(input1.value);
        let num2 = Number(input2.value);
        if (isNaN(num1) || isNaN(num2)) {
            mostrarResultado12("Debe ingresar números válidos.");
        } else {
            if (num1 > num2) {
                mostrarResultado12("El número mayor es: " + num1);
            } else if (num2 > num1) {
                mostrarResultado12("El número mayor es: " + num2);
            } else {
                mostrarResultado12("Los números son iguales.");
            }
        }
});
/*Ejercicio13*/
function mostrarResultado13(mensaje) {
            document.getElementById('resultadoEjercicio13').textContent = mensaje;
}
document.getElementById('btnEjercicio13').addEventListener('click', function () {
            const letra = document.getElementById('inputEjercicio13').value.trim().toLowerCase();
            if (letra.length !== 1 || !/[a-z]/.test(letra)) {
                mostrarResultado13("Debe ingresar una sola letra.");
            } else {
                if (["a", "e", "i", "o", "u"].includes(letra)) {
                    mostrarResultado13("La letra es una vocal.");
                } else {
                    mostrarResultado13("La letra NO es una vocal.");
                }
            }
});
/*Ejercicio14*/
function mostrarResultado14(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio14");
    resultado.textContent = mensaje;
}
document.getElementById("btnEjercicio14").addEventListener("click", function () {
    const input = document.getElementById("inputEjercicio14");
    const numero = Number(input.value);

    if (isNaN(numero)) {
        mostrarResultado14("Debe ingresar un número válido.");
    } else {
        if (numero > 0) {
            mostrarResultado14("El número es positivo.");
        } else if (numero < 0) {
            mostrarResultado14("El número es negativo.");
        } else {
            mostrarResultado14("El número es cero.");
        }
    }
});
/*Ejercicio15*/
function mostrarResultado15(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio15");
    resultado.textContent = mensaje;
}
document.getElementById("btnEjercicio15").addEventListener("click", function () {
    const inputCm = document.getElementById("inputCm");
    const inputLb = document.getElementById("inputLb");

    const centimetros = Number(inputCm.value);
    const libras = Number(inputLb.value);

    if (isNaN(centimetros) || isNaN(libras)) {
        mostrarResultado15("Debe ingresar valores numéricos válidos.");
    } else {
        const pulgadas = centimetros / 2.54;
        const kilogramos = libras * 0.453592;

        const mensaje = `Centímetros a pulgadas: ${pulgadas.toFixed(2)}\nLibras a kilogramos: ${kilogramos.toFixed(2)}`;
        mostrarResultado15(mensaje);
    }
});
/*Ejercicio16*/
function mostrarResultado16(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio16");
    resultado.textContent = mensaje;
}
document.getElementById("btnEjercicio16").addEventListener("click", function () {
    const inputDia = document.getElementById("inputDia");
    const numeroDia = Number(inputDia.value);

    if (isNaN(numeroDia) || numeroDia < 1 || numeroDia > 7) {
        mostrarResultado16("Ingrese un número entre 1 y 7.");
    } else {
        const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        mostrarResultado16(`El día correspondiente es: ${dias[numeroDia - 1]}`);
    }
});
/*Ejercicio17*/
function mostrarResultado17(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio17");
    resultado.textContent = mensaje;
}
document.getElementById("btnEjercicio17").addEventListener("click", function () {
    const inputHora = document.getElementById("inputHora");
    const horaTexto = inputHora.value;
    const partes = horaTexto.split(":");

    if (partes.length !== 3) {
        mostrarResultado17("Formato inválido. Use HH:MM:SS.");
    } else {
        let horas = Number(partes[0]);
        let minutos = Number(partes[1]);
        let segundos = Number(partes[2]);

        if (isNaN(horas) || isNaN(minutos) || isNaN(segundos)) {
            mostrarResultado17("Ingrese valores numéricos válidos.");
        } else {
            segundos++;
            if (segundos === 60) {
                segundos = 0;
                minutos++;
                if (minutos === 60) {
                    minutos = 0;
                    horas = (horas + 1) % 24;
                }
            }

            const nuevaHora = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
            mostrarResultado17(`Hora dentro de un segundo: ${nuevaHora}`);
        }
    }
});
/*Ejercicio18*/
function mostrarResultado18(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio18");
    resultado.textContent = mensaje;
}
document.getElementById("btnEjercicio18").addEventListener("click", function () {
    const inputCDs = document.getElementById("inputCDs");
    const cantidad = Number(inputCDs.value);
    let precioUnitario;

    if (isNaN(cantidad) || cantidad <= 0) {
        mostrarResultado18("Ingrese una cantidad válida mayor a cero.");
    } else {
        if (cantidad <= 9) {
            precioUnitario = 10;
        } else if (cantidad <= 99) {
            precioUnitario = 8;
        } else if (cantidad <= 499) {
            precioUnitario = 7;
        } else {
            precioUnitario = 6;
        }

        const totalVenta = cantidad * precioUnitario;
        const ganancia = totalVenta * 0.0825;

        const mensaje = `Total a pagar: $${totalVenta.toFixed(2)}\nGanancia del vendedor: $${ganancia.toFixed(2)}`;
        mostrarResultado18(mensaje);
    }
});
/*Ejercicio19*/
function mostrarResultado19(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio19");
    resultado.textContent = mensaje;
}
document.getElementById("btnEjercicio19").addEventListener("click", function () {
    const inputID = document.getElementById("inputID");
    const inputDias = document.getElementById("inputDias");

    const idEmpleado = Number(inputID.value);
    const diasTrabajados = Number(inputDias.value);

    const salarios = {
        1: 56, // Cajero
        2: 64, // Servidor
        3: 80, // Preparador de mezclas
        4: 48  // Mantenimiento
    };

    if (!salarios[idEmpleado] || isNaN(diasTrabajados) || diasTrabajados < 1 || diasTrabajados > 6) {
        mostrarResultado19("Datos inválidos. ID entre 1-4 y días entre 1-6.");
    } else {
        const pago = salarios[idEmpleado] * diasTrabajados;
        mostrarResultado19(`Pago semanal: $${pago.toFixed(2)}`);
    }
});
/*Ejercicio20*/
function mostrarResultado20(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio20");
    resultado.textContent = mensaje;
}
document.getElementById("btnEjercicio20").addEventListener("click", function () {
    const n1 = Number(document.getElementById("inputN1").value);
    const n2 = Number(document.getElementById("inputN2").value);
    const n3 = Number(document.getElementById("inputN3").value);
    const n4 = Number(document.getElementById("inputN4").value);

    if ([n1, n2, n3, n4].some(n => isNaN(n) || n <= 0)) {
        mostrarResultado20("Todos los valores deben ser enteros positivos.");
    } else {
        let resultado = "";

        const pares = [n1, n2, n3, n4].filter(n => n % 2 === 0).length;
        resultado += `Cantidad de números pares: ${pares}\n`;

        const mayor = Math.max(n1, n2, n3, n4);
        resultado += `Mayor número: ${mayor}\n`;

        if (n3 % 2 === 0) {
            resultado += `Cuadrado del segundo número: ${n2 ** 2}\n`;
        }

        if (n1 < n4) {
            const media = (n1 + n2 + n3 + n4) / 4;
            resultado += `Media de los 4 números: ${media.toFixed(2)}\n`;
        }

        if (n2 > n3 && n3 >= 50 && n3 <= 700) {
            const suma = n1 + n2 + n3 + n4;
            resultado += `Suma de los 4 números: ${suma}\n`;
        }

        mostrarResultado20(resultado);
    }
});
/*Ejercicio21*/
function mostrarResultado21(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio21");
    resultado.textContent = mensaje;
}
document.getElementById("btnEjercicio21").addEventListener("click", function () {
    const inputFactorial = document.getElementById("inputFactorial");
    const numero = Number(inputFactorial.value);

    if (isNaN(numero) || numero < 0 || !Number.isInteger(numero)) {
        mostrarResultado21("Ingrese un número entero no negativo.");
    } else {
        let factorial = 1;
        for (let i = 2; i <= numero; i++) {
            factorial *= i;
        }
        mostrarResultado21(`El factorial de ${numero} es: ${factorial}`);
    }
});
/*Ejercicio22*/
function mostrarResultado22(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio22");
    resultado.textContent = mensaje;
}
document.getElementById("btnEjercicio22").addEventListener("click", function () {
    const inputSuma = document.getElementById("inputSuma");
    const n = Number(inputSuma.value);

    if (isNaN(n) || n < 1 || !Number.isInteger(n)) {
        mostrarResultado22("Ingrese un número entero positivo.");
    } else {
        const suma = (n * (n + 1)) / 2;
        mostrarResultado22(`La suma de los ${n} primeros números es: ${suma}`);
    }
});
/*Ejercicio23*/
function mostrarResultado23(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio23");
    resultado.textContent = mensaje;
}
document.getElementById("btnEjercicio23").addEventListener("click", function () {
    const inputImpares = document.getElementById("inputImpares");
    const n = Number(inputImpares.value);

    if (isNaN(n) || n < 1 || !Number.isInteger(n)) {
        mostrarResultado23("Ingrese un número entero positivo.");
    } else {
        let suma = 0;
        for (let i = 1; i <= n; i += 2) {
            suma += i;
        }
        mostrarResultado23(`La suma de los números impares ≤ ${n} es: ${suma}`);
    }
});
/*Ejercicio24*/
function mostrarResultado24(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio24");
    resultado.textContent = mensaje;
}
document.getElementById("btnEjercicio24").addEventListener("click", function () {
    let suma = 0;
    for (let i = 2; i <= 1000; i += 2) {
        suma += i;
    }
    mostrarResultado24(`La suma de los números pares hasta 1000 es: ${suma}`);
});
/*Ejercicio25*/
function factorialRecursivo(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorialRecursivo(n - 1);
}
function mostrarResultado25(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio25");
    resultado.textContent = mensaje;
}
document.getElementById("btnEjercicio25").addEventListener("click", function () {
    const inputFactorialRecursivo = document.getElementById("inputFactorialRecursivo");
    const numero = Number(inputFactorialRecursivo.value);

    if (isNaN(numero) || numero < 0 || !Number.isInteger(numero)) {
        mostrarResultado25("Ingrese un número entero no negativo.");
    } else {
        const resultado = factorialRecursivo(numero);
        mostrarResultado25(`El factorial de ${numero} es: ${resultado}`);
    }
});
/*Ejercicio26*/
function mostrarResultado26(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio26");
    resultado.textContent = mensaje;
}
document.getElementById("btnEjercicio26").addEventListener("click", function () {
    const inputDividendo = document.getElementById("inputDividendo");
    const inputDivisor = document.getElementById("inputDivisor");

    let dividendo = Number(inputDividendo.value);
    const divisor = Number(inputDivisor.value);

    if (
        isNaN(dividendo) || isNaN(divisor) ||
        !Number.isInteger(dividendo) || !Number.isInteger(divisor) ||
        divisor <= 0 || dividendo < 0
    ) {
        mostrarResultado26("Ingrese números enteros válidos. El divisor debe ser mayor que cero.");
    } else {
        let cociente = 0;
        while (dividendo >= divisor) {
            dividendo -= divisor;
            cociente++;
        }
        mostrarResultado26(`Cociente: ${cociente}, Resto: ${dividendo}`);
    }
});
/*Ejercicio27*/
let suma = 0;
let contador = 0;
function mostrarResultado27(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio27");
    resultado.textContent = mensaje;
}
function agregarNumero(n) {
    if (n < 0) {
        if (contador === 0) {
            mostrarResultado27("No se ingresaron números positivos.");
        } else {
            const media = suma / contador;
            mostrarResultado27(`Media: ${media.toFixed(2)} (basado en ${contador} valores)`);
        }
    } else {
        suma += n;
        contador++;
        mostrarResultado27(`Número agregado: ${n}`);
    }
}
document.getElementById("btnEjercicio27").addEventListener("click", function () {
    const inputMedia = document.getElementById("inputMedia");
    const numero = Number(inputMedia.value);

    if (isNaN(numero)) {
        mostrarResultado27("Ingrese un número válido.");
    } else {
        agregarNumero(numero);
        inputMedia.value = "";
        inputMedia.focus();
    }
});
/*Ejercicio28*/
function mostrarResultado28(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio28");
    resultado.textContent = mensaje;
}
document.getElementById("btnEjercicio28").addEventListener("click", function () {
    let suma = 0;
    let i = 1;

    do {
        suma += i;
        i++;
    } while (i <= 100);

    mostrarResultado28(`La suma de los primeros 100 números es: ${suma}`);
});
/*Ejercicio29*/
function mostrarResultado29(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio29");
    resultado.textContent = mensaje;
}
document.getElementById("btnEjercicio29").addEventListener("click", function () {
    let suma = 0;
    let i = 1;

    while (i <= 100) {
        suma += i;
        i++;
    }

    mostrarResultado29(`La suma de los primeros 100 números es: ${suma}`);
});
/*Ejercicio30*/
function mostrarResultado30(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio30");
    resultado.textContent = mensaje;
}
document.getElementById("btnEjercicio30").addEventListener("click", function () {
    let suma = 0;

    for (let i = 1; i <= 100; i++) {
        suma += i;
    }

    mostrarResultado30(`La suma de los primeros 100 números es: ${suma}`);
});
/*Ejercicio31*/
function mostrarResultado31(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio31");
    if (resultado) {
        resultado.innerText = mensaje;
    }
}
function crearInputs() {
    const container = document.getElementById("inputsEjercicio31");
    if (container) {
        for (let i = 0; i < 10; i++) {
            const input = document.createElement("input");
            input.type = "number";
            input.placeholder = `Número ${i + 1}`;
            input.className = "border border-gray-300 rounded px-3 py-2";
            input.id = `num${i}`;
            container.appendChild(input);
        }
    }
}
function obtenerNumeros() {
    const numeros = [];
    for (let i = 0; i < 10; i++) {
        const input = document.getElementById(`num${i}`);
        const valor = parseFloat(input.value);
        if (!isNaN(valor)) {
            numeros.push(valor);
        }
    }
    return numeros;
}
function calcularMedias(numeros) {
    let sumaPares = 0, sumaImpares = 0;
    let contadorPares = 0, contadorImpares = 0;

    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] % 2 === 0) {
            sumaPares += numeros[i];
            contadorPares++;
        } else {
            sumaImpares += numeros[i];
            contadorImpares++;
        }
    }

    const mediaPares = contadorPares ? (sumaPares / contadorPares) : 0;
    const mediaImpares = contadorImpares ? (sumaImpares / contadorImpares) : 0;

    mostrarResultado31(`Media de pares: ${mediaPares.toFixed(2)} | Media de impares: ${mediaImpares.toFixed(2)}`);
}
document.addEventListener("DOMContentLoaded", () => {
    crearInputs();

    const boton = document.getElementById("btnEjercicio31");
    if (boton) {
        boton.addEventListener("click", () => {
            const numeros = obtenerNumeros();
            if (numeros.length === 10) {
                calcularMedias(numeros);
            } else {
                mostrarResultado31("Por favor ingresa los 10 números correctamente.");
            }
        });
    }
});
/*Ejercicio32*/
function mostrarResultado32(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio32");
    if (resultado) {
        resultado.innerText = mensaje;
    }
}
function crearFormularioCiudades() {
    const container = document.getElementById("inputsEjercicio32");
    const provincias = ["Provincia A", "Provincia B", "Provincia C"];
    const ciudadesPorProvincia = [4, 4, 3]; // Total 11 ciudades

    let ciudadIndex = 0;

    for (let p = 0; p < provincias.length; p++) {
        const provincia = provincias[p];
        const cantidad = ciudadesPorProvincia[p];

        for (let c = 0; c < cantidad; c++) {
            const div = document.createElement("div");
            div.className = "flex flex-col gap-2";

            const label = document.createElement("label");
            label.innerText = `Ciudad ${ciudadIndex + 1} (${provincia})`;

            const inputNombre = document.createElement("input");
            inputNombre.type = "text";
            inputNombre.placeholder = "Nombre de la ciudad";
            inputNombre.id = `ciudadNombre${ciudadIndex}`;
            inputNombre.className = "border border-gray-300 rounded px-3 py-2";

            const inputPoblacion = document.createElement("input");
            inputPoblacion.type = "number";
            inputPoblacion.placeholder = "Población";
            inputPoblacion.id = `ciudadPoblacion${ciudadIndex}`;
            inputPoblacion.className = "border border-gray-300 rounded px-3 py-2";

            div.appendChild(label);
            div.appendChild(inputNombre);
            div.appendChild(inputPoblacion);
            container.appendChild(div);

            ciudadIndex++;
        }
    }
}
function obtenerDatosCiudades() {
    const ciudades = [];

    for (let i = 0; i < 11; i++) {
        const nombre = document.getElementById(`ciudadNombre${i}`).value.trim();
        const poblacion = parseInt(document.getElementById(`ciudadPoblacion${i}`).value);

        if (nombre && !isNaN(poblacion)) {
            ciudades.push({ nombre, poblacion });
        }
    }

    return ciudades;
}
function encontrarCiudadMayor(ciudades) {
    if (ciudades.length !== 11) {
        mostrarResultado32("Por favor completa los datos de las 11 ciudades.");
        return;
    }

    let ciudadMayor = ciudades[0];

    for (let i = 1; i < ciudades.length; i++) {
        if (ciudades[i].poblacion > ciudadMayor.poblacion) {
            ciudadMayor = ciudades[i];
        }
    }

    mostrarResultado32(`La ciudad con más población es ${ciudadMayor.nombre} con ${ciudadMayor.poblacion} habitantes.`);
}
document.addEventListener("DOMContentLoaded", () => {
    crearFormularioCiudades();

    const boton = document.getElementById("btnEjercicio32");
    if (boton) {
        boton.addEventListener("click", () => {
            const ciudades = obtenerDatosCiudades();
            encontrarCiudadMayor(ciudades);
        });
    }
});
/*Ejercicio33*/
function mostrarResultado33(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio33");
    if (resultado) {
        resultado.innerText = mensaje;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const btnContinuar = document.getElementById("btnContinuar33");
    const btnSalir = document.getElementById("btnSalir33");

    if (btnContinuar) {
        btnContinuar.addEventListener("click", () => {
            mostrarResultado33("¡Has decidido continuar con el programa!");
            // Aquí podrías llamar a otra función o mostrar el siguiente paso
        });
    }

    if (btnSalir) {
        btnSalir.addEventListener("click", () => {
            mostrarResultado33("Programa finalizado. ¡Hasta pronto!");
        });
    }
});
/*Ejercicio34*/
const btnEjercicio34 = document.getElementById("btnEjercicio34");
btnEjercicio34.addEventListener("click", function() {   
    let resultado = '';
    for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
            resultado += `${i} x ${j} = ${i * j}<br>`;
        }
        resultado += '<br>';
    }
    document.getElementById('resultadoEjercicio34').innerHTML = resultado;
    btnEjercicio34.clicked = btnEjercicio34.clicked || false;
    if (!btnEjercicio34.clicked) {
        document.getElementById('resultadoEjercicio34').innerHTML = resultado;
        btnEjercicio34.clicked = true;
    } else {
        document.getElementById('resultadoEjercicio34').innerHTML = '';
        btnEjercicio34.clicked = false;
    }
});
/*Ejercicio35*/
function mostrarNumeros35(numeros) {
    const contenedor = document.getElementById("numerosGenerados35");
    if (contenedor) {
        contenedor.innerText = `Números generados: ${numeros.join(", ")}`;
    }
}
function mostrarResultado35(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio35");
    if (resultado) {
        resultado.innerText = mensaje;
    }
}
function generarNumerosAleatorios(cantidad, min, max) {
    const numeros = [];
    for (let i = 0; i < cantidad; i++) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        numeros.push(num);
    }
    return numeros;
}
function calcularMayorYMenor(numeros) {
    let mayor = numeros[0];
    let menor = numeros[0];

    for (let i = 1; i < numeros.length; i++) {
        if (numeros[i] > mayor) mayor = numeros[i];
        if (numeros[i] < menor) menor = numeros[i];
    }

    return { mayor, menor };
}
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btnEjercicio35");
    if (boton) {
        boton.addEventListener("click", () => {
            const numeros = generarNumerosAleatorios(20, 0, 100);
            mostrarNumeros35(numeros);

            const { mayor, menor } = calcularMayorYMenor(numeros);
            mostrarResultado35(`Número mayor: ${mayor} | Número menor: ${menor}`);
        });
    }
});
/*Ejercicio36*/
function mostrarResultado36(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio36");
    if (resultado) {
        resultado.innerText = mensaje;
    }
}
function calcularFibonacci(n) {
    const serie = [];

    if (n >= 1) serie.push(0);
    if (n >= 2) serie.push(1);

    for (let i = 2; i < n; i++) {
        const siguiente = serie[i - 1] + serie[i - 2];
        serie.push(siguiente);
    }

    return serie;
}
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btnEjercicio36");
    const input = document.getElementById("inputFibonacci36");

    if (boton && input) {
        boton.addEventListener("click", () => {
            const cantidad = parseInt(input.value);

            if (isNaN(cantidad) || cantidad < 1 || cantidad > 100) {
                mostrarResultado36("Por favor ingresa un número válido entre 1 y 100.");
                return;
            }

            const serie = calcularFibonacci(cantidad);
            mostrarResultado36(`Serie de Fibonacci (${cantidad} términos): ${serie.join(", ")}`);
        });
    }
});
/*Ejercicio37*/
function mostrarNumeros37(a, b) {
    const contenedor = document.getElementById("numerosGenerados37");
    if (contenedor) {
        contenedor.innerText = `Números generados: A = ${a}, B = ${b}`;
    }
}
function mostrarPasosEnTabla(pasos) {
    const tabla = document.getElementById("tablaPasosEuclides37");
    if (tabla) {
        tabla.innerHTML = pasos.map((p, i) => `
            <tr>
                <td class="border px-3 py-2 text-center">${i + 1}</td>
                <td class="border px-3 py-2">${p}</td>
            </tr>
        `).join("");
    }
}
function mostrarResultado37(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio37");
    if (resultado) {
        resultado.innerText = mensaje;
    }
}
function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function calcularMCDConPasos(a, b) {
    const pasos = [];

    while (b !== 0) {
        const resto = a % b;
        pasos.push(`${a} ÷ ${b} = ${Math.floor(a / b)} con resto ${resto}`);
        a = b;
        b = resto;
    }

    return { mcd: a, pasos };
}
function ejecutarAlgoritmoEuclides() {
    const a = generarNumeroAleatorio(10, 100);
    const b = generarNumeroAleatorio(10, 100);

    mostrarNumeros37(a, b);

    const { mcd, pasos } = calcularMCDConPasos(a, b);
    mostrarPasosEnTabla(pasos);
    mostrarResultado37(`El M.C.D. es: ${mcd}`);
}
document.addEventListener("DOMContentLoaded", () => {
    const btnCalcular = document.getElementById("btnEjercicio37");
    const btnRepetir = document.getElementById("btnRepetir37");

    if (btnCalcular) {
        btnCalcular.addEventListener("click", ejecutarAlgoritmoEuclides);
    }

    if (btnRepetir) {
        btnRepetir.addEventListener("click", ejecutarAlgoritmoEuclides);
    }
});
/*Ejercicio38*/
function mostrarNumero38(numero) {
    const contenedor = document.getElementById("numeroGenerado38");
    if (contenedor) {
        contenedor.innerText = `Número generado: ${numero}`;
    }
}
function mostrarDetallesPerfecto(divisores, suma) {
    const contenedor = document.getElementById("detallesPerfecto38");
    if (contenedor) {
        contenedor.innerHTML = `
            <div>Divisores propios: ${divisores.join(", ")}</div>
            <div>Suma de divisores: ${suma}</div>
        `;
    }
}
function mostrarResultado38(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio38");
    if (resultado) {
        resultado.innerText = mensaje;
    }
}
function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function verificarNumeroPerfecto(n) {
    const divisores = [];

    for (let i = 1; i < n; i++) {
        if (n % i === 0) {
            divisores.push(i);
        }
    }

    const suma = divisores.reduce((acc, val) => acc + val, 0);
    const esPerfecto = suma === n;

    return { divisores, suma, esPerfecto };
}
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btnEjercicio38");

    if (boton) {
        boton.addEventListener("click", () => {
            const numero = generarNumeroAleatorio(1, 1000);
            mostrarNumero38(numero);

            const { divisores, suma, esPerfecto } = verificarNumeroPerfecto(numero);
            mostrarDetallesPerfecto(divisores, suma);

            const mensaje = esPerfecto
                ? `✅ El número ${numero} es un número perfecto.`
                : `❌ El número ${numero} no es un número perfecto.`;

            mostrarResultado38(mensaje);
        });
    }
});
/*Ejercicio39*/
function mostrarResultado39(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio39");
    if (resultado) {
        resultado.innerHTML = mensaje;
    }
}
function aproximarPiGregoryLeibniz(terminos) {
    let pi = 0;
    let signo = 1;

    for (let i = 0; i < terminos; i++) {
        const denominador = 2 * i + 1;
        pi += signo * (4 / denominador);
        signo *= -1;
    }

    return pi;
}
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btnEjercicio39");
    const input = document.getElementById("inputTerminos39");

    if (boton && input) {
        boton.addEventListener("click", () => {
            const n = parseInt(input.value);

            if (isNaN(n) || n < 1 || n > 100000) {
                mostrarResultado39("Por favor ingresa un número válido entre 1 y 100000.");
                return;
            }

            const piAprox = aproximarPiGregoryLeibniz(n);
            const piReal = Math.PI;
            const error = Math.abs(piReal - piAprox);

            mostrarResultado39(`
                <div>π aproximado con ${n} términos: <strong>${piAprox.toFixed(10)}</strong></div>
                <div>π real: <strong>${piReal.toFixed(10)}</strong></div>
                <div>Error absoluto: <strong>${error.toFixed(10)}</strong></div>
            `);
        });
    }
});
/*Ejercicio40*/
function mostrarResultado40(mensaje) {
    const resultado = document.getElementById("resultadoEjercicio40");
    if (resultado) {
        resultado.innerHTML = mensaje;
    }
}
function aproximarPiNilakantha(terminos) {
    let pi = 3;
    let signo = 1;
    let a = 2;

    for (let i = 0; i < terminos; i++) {
        const denominador = a * (a + 1) * (a + 2);
        pi += signo * (4 / denominador);
        signo *= -1;
        a += 2;
    }

    return pi;
}
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btnEjercicio40");
    const input = document.getElementById("inputTerminos40");

    if (boton && input) {
        boton.addEventListener("click", () => {
            const n = parseInt(input.value);

            if (isNaN(n) || n < 1 || n > 100000) {
                mostrarResultado40("Por favor ingresa un número válido entre 1 y 100000.");
                return;
            }

            const piAprox = aproximarPiNilakantha(n);
            const piReal = Math.PI;
            const error = Math.abs(piReal - piAprox);

            mostrarResultado40(`
                <div>π aproximado con ${n} términos: <strong>${piAprox.toFixed(10)}</strong></div>
                <div>π real: <strong>${piReal.toFixed(10)}</strong></div>
                <div>Error absoluto: <strong>${error.toFixed(10)}</strong></div>
            `);
        });
    }
});
