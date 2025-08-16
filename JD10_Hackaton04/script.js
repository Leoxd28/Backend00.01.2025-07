//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------

//1. Crea una función que retorne la suma de dos números.
function ejercicioP1() {
    let numero1 = Number(prompt("Ingrese primer número:"));
    let numero2 = Number(prompt("Ingrese segundo número:"));

        function sumaDeDosNumeros(a, b) {
    return a + b
}


    if(isNaN(numero1) || isNaN(numero2)) {
        alert('El numero ingresado no es válido.')
    } else {
        alert(`La suma de los numeros: ${numero1} + ${numero2} = ${sumaDeDosNumeros(numero1, numero2)}`)
    }




}




//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//2. Hacer un algoritmo en JavaScript que lea un número entero por el teclado y determinar si es negativo.

function ejercicio02() {

    let numero = parseInt(prompt("Ingrese un número entero:"));
    if (!isNaN(numero)) {
        if (numero < 0) {
            alert("El número " + numero + " es Negativo.")
        } else {
            if (numero > 0) { alert("El número " + numero + " es Positivo.") } else { alert("El número " + numero + " es Neutro.") }

        }
    }
    else {
        alert("El valor ingresado no es un número válido.")
    }
}

//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 3. Hacer un algoritmo en JavaScript que lea un número 
// y determinar si termina en 4.

function ejercicio03() {

    let numero = parseInt(prompt("Ingrese un número entero:"));

    if (!isNaN(numero)) {
        if (Math.abs(numero % 10) === 4) {
            alert("El número " + numero + " SÍ termina en 4.")
        }
        else {
            alert("El número " + numero + " NO termina en 4.")
        }


    }
    else {
        alert("El valor ingresado no es un número válido")
    }

}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------

//4. Hacer un algoritmo en JavaScript que lea 
// tres números enteros y los muestre de menor a mayor.
function ejercicio04() {
    let num1 = parseInt(prompt("Ingrese el primer número entero: "));
    let num2 = parseInt(prompt("Ingrese el segundo número entero:"));
    let num3 = parseInt(prompt("Ingrese el tecer número entero:"));

    if (!isNaN(num1) && !isNaN(num2) && !isNaN(num3)) {
        let arrayNumeros = [num1, num2, num3];
        arrayNumeros.sort(function (a, b) { return a - b });
        alert("Los número ordenados de menor a mayor son: " + arrayNumeros.join(", "));
    }
    else {
        alert("Alguno de los valores ingresados no es un número válido")
    }

}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//5. Hacer un algoritmo en JavaScript para una tienda de 
// zapatos que tiene una promoción de descuento para vender 
// al mayor, esta dependerá del número de zapatos que se 
// compren. Si son más de diez, se les dará un 10% de 
// descuento sobre el total de la compra; si el número de 
// zapatos es mayor de veinte pero menor de treinta, 
// se le otorga un 20% de descuento; y si son más treinta 
// zapatos se otorgará un 40% de descuento. 
// El precio de cada zapato es de $80.

function ejercicio05() {

    const precioZapato = 80;
    let cantidadZapatos = parseInt(prompt("Ingresar la cantidad de zapatos a comprar: "));

    if (!isNaN(cantidadZapatos) && cantidadZapatos > 0) {

        let totalCompra = cantidadZapatos * precioZapato;
        let descuento = 0;

        if (cantidadZapatos > 30) { descuento = 0.40; }
        else
            if (cantidadZapatos > 20 && cantidadZapatos <= 30) { descuento = 0.20; }
            else
                if (cantidadZapatos > 10 && cantidadZapatos <= 20) { descuento = 0.10; }
                else { descuento = 0; }


        let montoDescuento = totalCompra * descuento;
        let totalPagarDescontado = totalCompra - montoDescuento;

        alert(
            "Cantidad de zapatos comprados: " + cantidadZapatos +
            "\nImporte Descuento: $ " + montoDescuento +
            "\nTotal a pagar: $ " + totalPagarDescontado

        );


    } else {
        alert("El valor ingresado no es una cantidad válida de zapatos.");
    }

}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//6. Hacer un algoritmo en JavaScript para ayudar a un trabajador 
// a saber cuál será su sueldo semanal, se sabe que si 
// trabaja 40 horas o menos, se le pagará $20 por hora, 
// pero si trabaja más de 40 horas entonces las horas extras 
// se le pagarán a $25 por hora.

function ejercicio06() {
    let horasTrabajadas = parseInt(prompt("Ingrese la cantidad de horas trabajadas en la semana: "))

    if (!isNaN(horasTrabajadas) && horasTrabajadas >= 0) {

        let sueldoFinal = 0;
        if (horasTrabajadas <= 40) {
            sueldoFinal = horasTrabajadas * 20
        } else {
            let horasNormales = 40;
            let horasExtras = horasTrabajadas - horasNormales;
            sueldoFinal = horasTrabajadas * 20 + horasExtras * 25;
        }

        alert("El sueldo semanal es: $ " + sueldoFinal)


    }
    else {
        alert("La cantidad de horas ingresadas no es valida")
    }

}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//7. Hacer un algoritmo en JavaScript para una tienda de helado 
// que da un descuento por compra a sus clientes con membresía 
// dependiendo de su tipo, sólo existen tres tipos de membresía, 
// tipo A, tipo B y tipo C. Los descuentos son los siguientes:
//Tipo A 10% de descuento 
// Tipo B 15% de descuento 
// Tipo C 20% de descuento

function ejercicio07() {
    let montoCompra = parseInt(prompt("Ingrese el monto de compra: "))
    let tipoMembresia = prompt("Ingrese el tipo de membresia: A, B o C").toUpperCase();

    let descuento = 0;

    if (!isNaN(montoCompra) && montoCompra > 0) {
        if (tipoMembresia === "A") { descuento = 0.10 }
        else {
            if (tipoMembresia === "B") { descuento = 0.15 }
            else {
                if (tipoMembresia === "C") { descuento = 0.2 }
                else {
                    alert("El tipo de membresía ingresado no es válido.")
                    return;
                }
            }
        }
        let montoDescuento = montoCompra * descuento;
        let totalPagarDescontado = montoCompra - montoDescuento;

        alert(
            "Tipo de membresia: " + tipoMembresia +
            "\nPorcentaje Descuento: " + (descuento * 100) + "%" +
            "\nImporte Descuento: $ " + montoDescuento +
            "\nTotal a Pagar: $ " + totalPagarDescontado
        )


    }


    else {
        alert("El monto ingresado no es válido.");
    }

}




//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
// 8.Hacer un algoritmo en JavaScript para calcular el promedio 
// de tres notas y determinar si el estudiante aprobó o no.
function ejercicio08() {
    let nota1 = parseFloat(prompt("Ingrese la primera nota (debe estar entre 0 y 20): "));
    let nota2 = parseFloat(prompt("Ingrese la segunda nota (debe estar entre 0 y 20): "));
    let nota3 = parseFloat(prompt("Ingrese la tercera nota (debe estar entre 0 y 20): "));
    if (!isNaN(nota1) && nota1 >= 0 && nota1 <= 20 &&
        !isNaN(nota2) && nota2 >= 0 && nota2 <= 20 &&
        !isNaN(nota3) && nota3 >= 0 && nota3 <= 20) {
        let promedio = (nota1 + nota2 + nota3) / 3;
        let resultado = promedio >= 13 ? "Aprobado" : "Desaprobado";
        alert("Promedio: " + promedio.toFixed(2) +
            "\nResultado: " + resultado);

    }
    else {
        alert("Alguna nota no tiene valor valido. Ingresar valores entre 0 y 20")
    }
}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//9. Hacer un algoritmo en JavaScript para determinar 
// el aumento de un trabajador, se debe tomar en cuenta 
// que si ganaba más de $2000 tendrá un aumento del 5%, 
// si generaba menos de $2000 su aumento será de un 10%.

function ejercicio09() {
    let sueldo = parseFloat(prompt("Ingrese su sueldo: "));

    if (!isNaN(sueldo) && sueldo > 0) {
        let porcAumento = sueldo > 2000 ? 0.05 : 0.10;
        let montoAumento = sueldo * porcAumento;
        let sueldoConAumento = sueldo + montoAumento;

        alert("Sueldo Original: $ " + sueldo +
            "\nPorcentaje de Aumento: " + (porcAumento * 100) + "%" +
            "\nMonto de Aumento: $ " + montoAumento +
            "\nSueldo con Aumento: $ " + sueldoConAumento);

    }

    else {
        alert("El sueldo ingresado no es válido.");
    }
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//10.Hacer un algoritmo en JavaScript que diga si un 
// número es par o impar.

function ejercicio10() {
    let numero = parseInt(prompt("Ingrese un número: "));

    if (!isNaN(numero)) {
        if (numero % 2 === 0) {
            alert("El numero " + numero + " es PAR.")
        } else {
            alert("El numero " + numero + " es IMPAR.")
        }

    } else {
        alert("El número ingresado no es válido.");
    }

}

//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//11.Hacer un algoritmo en JavaScript que lea tres números
//  y diga cuál es el mayor. 
function ejercicio11() {
    let num1 = parseFloat(prompt("Ingrese el primero número: "));
    let num2 = parseFloat(prompt("Ingrese el segundo número: "));
    let num3 = parseFloat(prompt("Ingrese el tercer número: "));

    if (!isNaN(num1) && !isNaN(num2) && !isNaN(num3)) {
        let mayor = Math.max(num1, num2, num3)
        alert("El número mayor es: " + mayor);
    } else {
        alert("Alguno de los valores ingresados no es válido.")
    }
}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//12. Hacer un algoritmo en JavaScript que lea dos números y diga
//  cuál es el mayor. 

function ejercicio12() {
    let num1 = parseFloat(prompt("Ingrese el primer número: "));
    let num2 = parseFloat(prompt("Ingrese el segundo número: "));

    if (!isNaN(num1) && !isNaN(num2)) {
        if (num1 > num2) {
            alert("El número mayor es: " + num1);
        } else if (num2 > num1) {
            alert("El número mayor es: " + num2);
        } else {
            alert("Los números son iguales: ");
        }


    } else {
        alert("Alguno de los valores ingresados no es válido.");
    }
}

//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//13. Hacer un algoritmo en JavaScript que lea una letra 
// y diga si es una vocal.

function ejercicio13() {
    let letra = prompt("Ingrese una letra: ").toLowerCase();

    if (letra.length === 1 && letra.match(/[a-z]/)) {
        if ("aeiou".includes(letra)) {
            alert("La letra '" + letra + "' es una VOCAL.");
        } else {
            alert("La letra '" + letra + "' es una CONSONANTE.");
        }

    }



    else {
        alert("Letra ingresada no es válida.");
    }
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------

//14.Hacer un algoritmo en JavaScript que lea un entero positivo
//  del 1 al 10 y determine si es un número primo.

function ejercicio14() {
    let numero = parseInt(prompt("Ingrese un número entero positivo del 1 al 10: "));

    if (!isNaN(numero) && numero >= 1 && numero <= 10) {
        let esPrimo = true;
        if (numero === 1) {
            esPrimo = false;
        } else {
            for (let i = 2; i <= Math.sqrt(numero); i++) {
                if (numero % i === 0) {
                    esPrimo = false;
                    break;
                }
            }
        }
        if (esPrimo) {
            alert("El número " + numero + " SÍ es PRIMO.");
        } else {
            alert("El número " + numero + " NO es PRIMO.");
        }
    } else {
        alert("El valor ingresado no es válido.");
    }

}




//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//15. Hacer un algoritmo en JavaScript que convierta 
// centímetros a pulgadas y libras a kilogramos.
function ejercicio15() {
    let centimetros = parseFloat(prompt("Ingrese la cantidad en centimetros: "));
    let libras = parseFloat(prompt("Ingrese la cantidad en Libras: "));

    if (!isNaN(centimetros) && centimetros >= 0 && !isNaN(libras) && libras >= 0) {
        let pulgadas = centimetros / 2.54;
        let kilogramos = libras * 0.453592;

        alert(
            centimetros + " cm equivalente a " + pulgadas.toFixed(2) + " pulgadas.\n" +
            libras + " libras equivalente a " + kilogramos.toFixed(2) + " kilogramos."
        )

    } else {
        alert("Alguno de los valores ingresados no es válido.");
    }

}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//16. Hacer un algoritmo en JavaScript que lea un número 
// y según ese número, indique el día que corresponde.

function ejercicio16() {
    let numero = parseInt(prompt("Ingrese un número del 1 al 7"));
    let dia = ""
    if (!isNaN(numero) && numero >= 1 && numero <= 7) {
        switch (numero) {
            case 1:
                dia = "Lunes";
                break;
            case 2:
                dia = "Martes";
                break
            case 3:
                dia = "Miércoles";
                break;
            case 4:
                dia = "Jueves";
                break;
            case 5:
                dia = "Viernes";
                break;
            case 6:
                dia = "Sábado";
                break;
            case 7:
                dia = "Domingo";
                break;
        }
        alert("El día correspondiente es: " + dia);

    } else {
        alert("El número ingresado no es válido. Debe estar entre 1 y 7.");

    }

}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//17. Hacer un algoritmo en JavaScript donde se ingrese 
// una hora y nos calcule la hora dentro de un segundo.

function ejercicio17() {
    let horaStr = prompt("Ingrese la hora en formato HH:MM:SS (ejemplo 14:23:45):");
    let partes = horaStr.split(":");

    if (partes.length === 3) {
        let horas = parseInt(partes[0]);
        let minutos = parseInt(partes[1]);
        let segundos = parseInt(partes[2]);

        if (!isNaN(horas) && horas >= 0 && horas < 24 &&
            !isNaN(minutos) && minutos >= 0 && minutos < 60 &&
            !isNaN(segundos) && segundos >= 0 && segundos < 60
        ) {
            segundos += 1;
            if (segundos === 60) {
                segundos = 0;
                minutos += 1;
                if (minutos === 60) {
                    minutos = 0;
                    horas += 1;
                    if (horas === 24) {
                        horas = 0;

                    }
                }
            }

            let = nuevaHora =
                (horas < 10 ? "0" : "") + horas + ":" +
                (minutos < 10 ? "0" : "") + minutos + ":" +
                (segundos < 10 ? "0" : "") + segundos;
            alert("La hora dentro de un segundo es: " + nuevaHora);
        } else {
            alert("La hora ingresada no es válida.");
        }


    } else {
        alert("El formato de hora ingresado no es válido. Debe ser HH:MM:SS.");

    }

}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//18.	Hacer un algoritmo en JavaScript para una empresa 
// se encarga de la venta y distribución de CD vírgenes. 
// Los clientes pueden adquirir los artículos 
// (supongamos un único producto de una única marca) 
// por cantidad. Los precios son:
// $10. Si se compran unidades separadas hasta 9.
// $8. Si se compran entre 10 unidades hasta 99.
// $7. Entre 100 y 499 unidades.
// $6. Para mas de 500 unidades.


function ejercicio18() {
    let cantidad = parseInt(prompt("Ingrese la cantidad de CD a comprar:"));
    let precioUnitario = 0;

    if (!isNaN(cantidad) && cantidad > 0) {

        if (cantidad <= 9) { precioUnitario = 10; }
        else if (cantidad >= 10 && cantidad <= 99) { precioUnitario = 8; }
        else if (cantidad >= 100 && cantidad <= 499) { precioUnitario = 7; }
        else if (cantidad >= 500) {
            precioUnitario = 6;
        }
        let totalVenta = cantidad * precioUnitario;
        let gananciaVendedor = totalVenta * 0.0825;
        alert(
            "Cantidad de CDs: " + cantidad +
            "\nPrecio unitario: $ " + precioUnitario +
            "\nTotal Venta Cliente: $ " + totalVenta +
            "\nGanancia del vendedor: $ " + gananciaVendedor
        );



    } else {
        alert("La cantidad ingresada no es válida.");
    }



}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//19. Hacer un algoritmo en JavaScript para una heladería
//  se tienen 4 tipos de empleados ordenados de la siguiente
//  forma con su número identificador y salario diario 
// correspondiente:
//Cajero (56$/día).
//Servidor (64$/día).
//Preparador de mezclas (80$/día).
//Mantenimiento (48$/día).
//El dueño de la tienda desea tener un programa donde sólo 
// ingrese dos números enteros que representen al número 
// identificador del empleado y la cantidad de días que 
// trabajó en la semana (6 días máximos). 
// Y el programa le mostrará por pantalla la cantidad de 
// dinero que el dueño le debe pagar al empleado que ingresó

function ejercicio19() {
    let idEmpleado = parseInt(prompt("Ingrese el número identificador del empleado:\n1 - Cajero\n2 - Servidor\n3 - Preparador de mezclas\n4 - Mantenimiento"));
    let diasTrabajados = parseInt(prompt("Ingrese la cantidad de días trabajados (máximo 6):"));

    let salarioDiario = 0;
    switch (idEmpleado) {
        case 1:
            salarioDiario = 56;
            break;
        case 2:
            salarioDiario = 64;
            break;
        case 3:
            salarioDiario = 80;
            break;
        case 4:
            salarioDiario = 48;
            break;
        default:
            alert("Identificador de empleado no válido.");
            return;
    }

    if (!isNaN(diasTrabajados) && diasTrabajados > 0 && diasTrabajados <= 6) {
        let totalPagar = salarioDiario * diasTrabajados;
        alert(
            "Empleado #" + idEmpleado +
            "\nDías trabajados: " + diasTrabajados +
            "\nSalario diario: $ " + salarioDiario +
            "\nTotal a pagar: $ " + totalPagar

        );

    }
    else {
        alert("La cantidad de días trabajados no es válida (debe ser entre 1 y 6).");
    }

}




//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//20. Hacer un algoritmo en JavaScript que que lea 4 números
//enteros positivos y verifique y realice las siguientes operaciones:
//¿Cuántos números son Pares?
//¿Cuál es el mayor de todos?
//Si el tercero es par, calcular el cuadrado del segundo.
//Si el primero es menor que el cuarto, calcular la media de los 4 números.
//Si el segundo es mayor que el tercero, verificar si el tercero esta comprendido entre los valores 50 y 700. Si cumple se cumple la segunda condición, calcular la suma de los 4 números.


function ejercicio20() {
    let n1 = parseInt(prompt("Ingrese el primer número entero positivo:"));
    let n2 = parseInt(prompt("Ingrese el segundo número entero positivo:"));
    let n3 = parseInt(prompt("Ingrese el tercer número entero positivo:"));
    let n4 = parseInt(prompt("Ingrese el cuarto número entero positivo:"));
    if (
        !isNaN(n1) && n1 > 0 &&
        !isNaN(n2) && n2 > 0 &&
        !isNaN(n3) && n3 > 0 &&
        !isNaN(n4) && n4 > 0
    ) {

        let pares = [n1, n2, n3, n4].filter(num => num % 2 === 0).length;

        let mayor = Math.max(n1, n2, n3, n4);

        let cuadradoSegundo = null;
        if (n3 % 2 === 0) {
            cuadradoSegundo = n2 * n2;
        }


        let media = null;
        if (n1 < n4) {
            media = (n1 + n2 + n3 + n4) / 4;
        }


        let suma = null;
        if (n2 > n3 && n3 >= 50 && n3 <= 700) {
            suma = n1 + n2 + n3 + n4;
        }

        let mensaje =
            "Cantidad de números pares: " + pares +
            "\nMayor de todos: " + mayor;

        if (cuadradoSegundo !== null) {
            mensaje += "\nEl cuadrado del segundo número (porque el tercero es par): " + cuadradoSegundo;
        }
        if (media !== null) {
            mensaje += "\nLa media de los 4 números (porque el primero es menor que el cuarto): " + media;
        }
        if (suma !== null) {
            mensaje += "\nLa suma de los 4 números (porque el segundo es mayor que el tercero y el tercero está entre 50 y 700): " + suma;
        }

        alert(mensaje);
    } else {
        alert("Todos los valores deben ser enteros positivos.");
    }
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//21. Hacer un algoritmo en JavaScript que permita calcular el 
// factorial de un número.

function ejercicio21() {
    let numero = parseInt(prompt("Ingrese un número entero positivo para calcular su factorial:"));
    if (!isNaN(numero) && numero >= 0) {
        let factorial = 1;
        for (let i = 2; i <= numero; i++) {
            factorial *= i;
        }
        alert("El factorial de " + numero + " es: " + factorial);

    }
    else {
        alert("Debe ingresar un número entero positivo.")
    }

}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//22. Hacer un algoritmo en JavaScript para calcular la 
// suma de los n primeros números.

function ejercicio22() {
    let n = parseInt(prompt("Ingrese el valor de n (número entero positivo):"));

    if (!isNaN(n) && n > 0) {
        let suma = n * (n + 1) / 2;
        alert("La suma de los " + n + " primeros números es: " + suma);
    } else {
        alert("Debe ingresar un número entero positivo.");
    }
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//23. Hacer un algoritmo en JavaScript para calcular 
// la suma de los números impares menores o iguales a n.
function ejercicio23() {
    let n = parseInt(prompt("Ingrese el valor de n (número entero positivo):"));
    if (!isNaN(n) && n > 0) {
        let suma = 0;
        for (let i = 1; i <= n; i += 2) {
            suma += i;
        }
        alert("La suma de los números impares menores o iguales a " + n + " es: " + suma);
    } else {
        alert("Debe ingresar un número entero positivo.");
    }
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//24. Hacer un algoritmo en JavaScript para realizar 
// la suma de todos los números pares hasta el 1000. 

function ejercicio24() {
    let suma = 0;
    for (let i = 2; i <= 1000; i += 2) {
        suma += i;
    }
    alert("La suma de todos los números pares hasta el 1000 es: " + suma);

}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//25. Hacer un algoritmo en JavaScript para calcular el factorial
//  de un número de una forma distinta.
// Factorial usando función recursiva


function ejercicio25() {
    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        return n * factorial(n - 1);
    }
    let numero = parseInt(prompt("Ingrese un número entero positivo para calcular su factorial:"));
    if (!isNaN(numero) && numero >= 0) {
        let resultado = factorial(numero);
        alert("El factorial de " + numero + " es: " + resultado);
    } else {
        alert("Debe ingresar un número entero positivo.");
    }
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//26. Hacer un algoritmo en JavaScript para calcular el resto
//  y cociente por medio de restas sucesivas.

function ejercicio26() {
    let dividendo = parseInt(prompt("Ingrese el dividendo (entero positivo):"));
    let divisor = parseInt(prompt("Ingrese el divisor (entero positivo, distinto de cero):"));

    if (
        !isNaN(dividendo) && dividendo >= 0 &&
        !isNaN(divisor) && divisor > 0
    ) {
        let cociente = 0;
        let resto = dividendo;
        while (resto >= divisor) {
            resto -= divisor;
            cociente++;
        }

        alert(
            "Cociente: " + cociente +
            "\nResto: " + resto
        )

    }
    else (
        alert("Debe ingresar valores válidos (dividendo >= 0, divisor > 0).")
    )

}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//27. Hacer un algoritmo en JavaScript para determinar la 
// media de una lista indefinida de números positivos, 
// se debe acabar el programa al ingresar un número negativo.

function ejercicio27() {
    let suma = 0;
    let contador = 0;

    while (true) {
        let numero = parseFloat(prompt("Ingrese un número positivo (negativo para terminar):"));
        if (isNaN(numero)) {
            alert("Debe ingresar un número válido.");
            continue;
        }

        if (numero < 0) break;
        suma += numero;
        contador++;
    }

    if (contador > 0) {
        let media = suma / contador;
        alert("La media de los números ingresados es: " + media);

    } else {
        alert("No se ingresaron números positivos.");
    }

}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//28. Hacer un algoritmo en JavaScript para calcular la suma 
// de los primeros cien números con un ciclo repetir. 

function ejercicio28() {
    let suma = 0;
    let i = 1;
    do {
        suma += i;
        i++;
    } while (i <= 100);
    alert("La suma de los primeros cien números es: " + suma);
}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//29. Hacer un algoritmo en JavaScript para calcular la
// suma de los primeros cien números con un ciclo mientras.

function ejercicio29() {
    let suma = 0;
    let i = 1;

    while (i <= 100) {
        suma += i;
        i++;
    }
    alert("La suma de los primeros cien números es: " + suma);
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//30. Hacer un algoritmo en JavaScript para calcular 
// la suma de los primeros cien números con un ciclo para.


function ejercicio30() {
    let suma = 0;
    for (let i = 1; i <= 100; i++) {
        suma = suma + i;
    }
    alert("La suma de los primeros cien números es: " + suma);
}




//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//31. Hacer un algoritmo en JavaScript parar calcular la media de los 
// números pares e impares, sólo se ingresará diez números.

function ejercicio31() {
    let sumaPares = 0;
    let sumaImpares = 0;
    let contadorPares = 0;
    let contadorImpares = 0;

    for (let i = 1; i <= 10; i++) {
        let numero = parseInt(prompt("Ingrese el número " + i + ":"));

        if (!isNaN(numero)) {
            if (numero % 2 === 0) {
                sumaPares += numero;
                contadorPares++;
            } else {
                sumaImpares += numero;
                contadorImpares++;
            }
        } else {
            alert("El valor ingresado no es un número válido.");
        }
    }

    let mediaPares = contadorPares > 0 ? (sumaPares / contadorPares) : 0;
    let mediaImpares = contadorImpares > 0 ? (sumaImpares / contadorImpares) : 0;

    alert(
        "Cantidad de pares: " + contadorPares +
        "\nCantidad de impares: " + contadorImpares +
        "\nMedia de los números pares: " + mediaPares +
        "\nMedia de los números impares: " + mediaImpares
    );
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//32. Se quiere saber cuál es la ciudad con la población de 
// más personas, son tres provincias y once ciudades,
// hacer un algoritmo en JavaScript que nos permita saber eso.

function ejercicio32() {

    let ciudades = [];
    let poblaciones = [];

    for (let i = 1; i <= 5; i++) {

        let nombreCiudad = prompt("Ingrese el nombre de la ciudad " + i + ":");
        let poblacion = parseInt(prompt("Ingrese la población de " + nombreCiudad + ":"));

        if (nombreCiudad && !isNaN(poblacion) && poblacion >= 0) {
            ciudades.push(nombreCiudad);
            poblaciones.push(poblacion);
        } else {
            alert("Los datos ingresados no son válidos.");
            i--;
        }
    }

    let maxPoblacion = Math.max(...poblaciones);
    let indiceMax = poblaciones.indexOf(maxPoblacion);
    let ciudadMax = ciudades[indiceMax];

    alert(
        "La ciudad con mayor población es: " + ciudadMax +
        "\nPoblación: " + maxPoblacion
    );

}

//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//33. Hacer un algoritmo en JavaScript que permita al usuario 
// continuar con el programa. 

function ejercicio33() {
    let continuar = true;
    while (continuar) {
        let opcion = prompt("¿Desea continuar con el programa? (Si marque S y  No marque N)").toUpperCase();
        if (opcion === "S") {
            alert("El programa continúa...");
        } else
            if (opcion === "N") {
                alert("Programa Finalizado.");
                continuar = false;
            }
            else {
                alert("Opción no válida. Ingrese 'S' para continuar o 'N' para salir.");
            }


    }

}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//34. Hacer un algoritmo en JavaScript que imprima la 
// tabla de multiplicar de los números del uno al nueve. 

function ejercicio34() {
    for (let multiplicando = 1; multiplicando <= 9; multiplicando++) {
        let resultado = `Tabla del ${multiplicando}:\n`;
        for (let multiplicador = 1; multiplicador <= 12; multiplicador++) {
            let producto = multiplicando * multiplicador;
            resultado += `${multiplicando} x ${multiplicador} = ${producto}\n`;
        }
        alert(resultado);
    }
}

//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//35. Hacer un algoritmo en JavaScript que nos permita 
// saber cuál es el número mayor y menor, se debe ingresar 
// sólo veinte números.

function ejercicio35() {
    let mayor = null;
    let menor = null;

    for (let i = 1; i <= 20; i++) {
        let numero = parseFloat(prompt("Ingrese el número " + i + ":"));
        if (!isNaN(numero)) {
            if (mayor === null || numero > mayor) {
                mayor = numero;
            }
            if (menor === null || numero < menor) {
                menor = numero;
            }
        }
        else {
            alert("El valor ingresado no es Válido.");
            if (mayor === null || 0 > mayor) mayor = 0;
            if (menor === null || 0 < menor) menor = 0;
        }
    }

    alert(
        "El número mayor ingresado es: " + mayor +
        "\nEl número menor ingresado es: " + menor
    );
}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//36. Hacer un algoritmo en JavaScript para calcular 
// la serie de Fibonacci.

function ejercicio36() {
    let n = parseInt(prompt("Ingrese la cantidad de términos de la serie Fibonacci (entero positivo):"));
    if (!isNaN(n) && n > 0) {
        let fibo = [];
        let a = 0, b = 1;
        for (let i = 0; i < n; i++) {
            fibo.push(a);
            let temp = a + b;
            a = b;
            b = temp;
        }
        alert("Serie de Fibonacci (" + n + " términos):\n" + fibo.join(", "));
    } else {
        alert("Debe ingresar un número entero positivo.")
    }

}

//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//37. Hacer un algoritmo en JavaScript para conseguir el M.C.D 
// de un número por medio del algoritmo de Euclides.

function ejercicio37() {  
    let a = parseInt(prompt("Ingrese el primer número entero positivo:"));
    let b = parseInt(prompt("Ingrese el segundo número entero positivo:"));

    if (!isNaN (a) && a > 0 && !isNaN (b) && b > 0 ) {
        while (b !==0) {
            let temp = b ;
            b = a % b ;
            a = temp;
            }
        alert ("El M.C.D. de los dos números es: "+ a);

    } else {
        alert("Debe ingresar dos números enteros positivos.");
    } 


}

//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//38. Hacer un algoritmo en JavaScript que nos permita saber 
// si un número es un número perfecto. 

function ejercicio38() {
    let numero = parseInt (prompt("Ingrese un número entero positivo:"));
    if (!isNaN (numero) && numero > 0){
        let sumaDivisores = 0;

        for (let i=1; i<numero; i++) {
            if (numero % i === 0) {
                sumaDivisores += i;
            }
        }

        if (sumaDivisores === numero) {
            alert ("El número " + numero + " SÍ es un número PERFECTO.")
        } else {
            alert ("El número " + numero + " NO es un número PERFECTO."); 
        }


    } else {
        alert("El valor ingresado no es válido.");
    }

}



//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//39. Hacer un algoritmo en JavaScript que cumpla con la aproximación del número pi con la serie de Gregory-Leibniz. La formula que se debe aplicar es:
//Pi = (4/1) - (4/3) + (4/5) - (4/7) + (4/9) - (4/11) + (4/13) - (4/15) ...

function ejercicio39() {  
let n= parseInt(prompt("Ingrese la cantidad de términos para aproximar pi (entero positivo):"));

if (!isNaN(n) && n > 0)
    {
        let pi = 0;
        for (let i=0 ; i<n; i++) {
            let denominador = 2*i + 1;
            let termino = 4/denominador;
            if (i % 2 === 0){
                pi += termino;
            } else {
                pi -= termino;
            }
        }
        alert("Aproximación de pi con " + n + " términos:\n" + pi)
    } else {
        alert ("Debe ingresar un número entero positivo.")
    }
}


//-->------------------------------------------------------------------------------------
//-->------------------------------------------------------------------------------------
//40. Hacer un algoritmo en JavaScript que cumpla con la aproximación del número pi con la serie de Nilakantha. 
// La formula que se debe aplicar es:
// Pi = = 3 + 4/(234) - 4/(456) + 4/(678) - 4/(8910) + 4/(101112) - 4/(121314) ...

function ejercicio40() {  
let n = parseInt(prompt("Ingrese la cantidad de términos para aproximar pi con la serie de Nilakantha (entero positivo):"))

if (!isNaN (n) && n>0) {
    let pi =3;
    let signo = 1;
    let a=2;

    for (let i=1; i<=n; i++) {
        let termino = 4/(a*(a+1)*(a+2));
        pi += signo * termino ;
        signo *= -1;
        a +=2;

    }

    alert ("Aproximación de pi con " + n + " términos (Nilakantha):\n" + pi) 
} else {
    alert ("Debe ingresar un número entero positivo.")
}

}gi