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
//x. function ejercicioXX() {  }
