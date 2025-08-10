//1. Hacer un algoritmo en JavaScript que lea un número por el teclado y determinar si tiene tres dígitos.
//console.log("Mensajes que salen en la consola");
//alert("Mensajes que salen como alertas");

function ejercicio01() {

    let numero = parseInt(prompt("Ingrese un número entero:"));
    if (!isNaN(numero)) {
        if (numero >= 100 && numero <= 999) {
            alert("El número " + numero + " tiene tres dígitos.")
        } else {
            alert("El número " + numero + " no tiene tres dígitos.")
        }
    }
    else {
        alert("El valor ingresado no es un número válido.")
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
// 3.	Hacer un algoritmo en JavaScript que lea un número 
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

//4.	Hacer un algoritmo en JavaScript que lea 
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
//5.	Hacer un algoritmo en JavaScript para una tienda de 
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
//x. 7.	Hacer un algoritmo en JavaScript para una tienda de helado 
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
//x9. Hacer un algoritmo en JavaScript para determinar 
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
if (esPrimo){
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

    if (!isNaN(centimetros) && centimetros >=0 && !isNaN(libras) && libras >=0) {
        let pulgadas = centimetros /2.54;
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
//x. function ejercicio1X() {  }

