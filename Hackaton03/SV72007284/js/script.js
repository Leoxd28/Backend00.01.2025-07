function ejercicio01() {
    //1. Hacer un algoritmo en JavaScript que lea un número por el teclado y determinar si tiene tres dígitos.
    console.log("Mensajes que salen en la consola");
    // alert("Mensajes que salen como alertas");
    let numero = parseInt(prompt("Escribe un número"));
    if (!isNaN(numero)) {
        if (numero > 99 && numero < 1000) {
            alert("Si tiene 3 Digitos")
        } else {
            alert("No tiene 3 digitos")
        }
    } else {
        alert("El valor ingresado no es un número")
    }
}

function ejercicio02() {
    //2. Hacer un algoritmo en JavaScript que lea un número entero 
    // por el teclado y determinar si es negativo.
    let numero = parseInt(prompt("Escribe un número"));
    let numeroNegativo = -1;
    if (!isNaN(numero)) {
        if (numero > numeroNegativo) {
            alert("El número es positivo")
            console.log("POSITIVO")
        } else {
            alert("El número es negativo")
            console.log("NEGATIVO")
        }
    } else {
        alert("El valor ingresado no es un número")
    }
}

function ejercicio03() {
    //3. Hacer un algoritmo en JavaScript que lea un número y determinar si termina en 4.
    let numero = parseInt(prompt("Escribe un número"));
    let operacion = numero % 10;
    if (!isNaN(numero)) {
        if (operacion === 4) {
            alert("El número termina en 4")
            console.log(operacion)
        } else {
            alert("El número no termina en 4")
        }
    } else {
        alert("El valor ingresado no es un número")
    }
}

function ejercicio04() {
    //4. Hacer un algoritmo en JavaScript que lea tres números enteros y los muestre de 
    // menor a mayor.
    let n1 = parseInt(prompt("Escribe el primer número"));
    let n2 = parseInt(prompt("Escribe el segundo número"));
    let n3 = parseInt(prompt("Escribe el tercer número"));
    let numeros = [n1, n2, n3];
    if (!isNaN(n1) && !isNaN(n2) && !isNaN(n3)) {
        numeros.sort(function (a, b) {
            return a - b;
        })
        alert("Número ordenados de menor a mayor: " + numeros.join(", "))
        numeros.map(e => console.log(e))
    } else {
        alert("El valor ingresado no es un número")
    }
}

function ejercicio05() {
    //5. Hacer un algoritmo en JavaScript para una tienda de zapatos que tiene una promoción 
    // de descuento para vender al mayor, esta dependerá del número de zapatos que se compren. 
    // Si son más de diez, se les dará un 10% de descuento sobre el total de la compra; si el 
    // número de zapatos es mayor de veinte pero menor de treinta, se le otorga un 20% de 
    // descuento; y si son más treinta zapatos se otorgará un 40% de descuento. El precio de 
    // cada zapato es de $80.
    let cantidad = parseInt(prompt("Escribe el número de zapatos a llevar"));
    let precioUnitario = 80;
    if (!isNaN(cantidad)) {
        if (cantidad > 30) {
            descuento = 0.4;
        } else if (cantidad > 20) {
            descuento = 0.2;
        } else if (cantidad > 10) {
            descuento = 0.1;
        }

        let precioSinDescuento = cantidad * precioUnitario;

        let precioConDescuento = precioSinDescuento - (precioSinDescuento * descuento);

        alert("Cantidad de zapatos: " + cantidad +
            "\nDescuento: " + (descuento * 100) + "%" +
            "\nTotal a pagar: $" + precioConDescuento.toFixed(2))
        console.log((descuento * 100) + "%")
    }
    else {
        alert("El valor ingresado no es un número")
    }
}

function ejercicio06() {
    //6. Hacer un algoritmo en JavaScript para ayudar a un trabajador a saber cuál será 
    // su sueldo semanal, se sabe que si trabaja 40 horas o menos, se le pagará $20 por hora, 
    // pero si trabaja más de 40 horas entonces las horas extras se le pagarán a $25 por hora.
    let horasTrabajadas = parseInt(prompt("Escribe las horas trabajadas"));
    let sueldoXHora = 20;
    let horasExtra = 0;
    let sueldoXHorasExtra = 25;
    if (!isNaN(horasTrabajadas)) {
        if (horasTrabajadas > 40) {
            horasExtra = horasTrabajadas - 40;
        } else {
            horasExtra = 0;
        }
        let sueldoSemanalSinHorasExtra = (horasTrabajadas - horasExtra) * sueldoXHora;
        let sueldoSemanalConHorasExtra = sueldoSemanalSinHorasExtra + (horasExtra * sueldoXHorasExtra);
        alert("Horas trabajadas: " + horasTrabajadas +
            "\nHoras extra: $" + (horasExtra * sueldoXHorasExtra) +
            "\nSueldo semanal: $" + sueldoSemanalConHorasExtra.toFixed(2))
    } else {
        alert("El valor ingresado no es un número")
    }
}

function ejercicio07() {
    //7. Hacer un algoritmo en JavaScript para una tienda de helado que da un descuento por 
    // compra a sus clientes con membresía dependiendo de su tipo, sólo existen tres tipos de 
    // membresía, tipo A, tipo B y tipo C. Los descuentos son los siguientes:
    //Tipo A 10% de descuento
    //Tipo B 15% de descuento
    //Tipo C 20% de descuento
    let membresia = prompt("Escribe tu membresia" +
        "\n1.- Tipo A" +
        "\n2.- Tipo B" +
        "\n3.- Tipo C").toUpperCase();
    let totalCompra = parseFloat(prompt("Precio total de la compra"));
    let descuento = 0;
    if (membresia === "C") {
        descuento = 0.2;
    } else if (membresia === "B") {
        descuento = 0.15;
    } else if (membresia === "A") {
        descuento = 0.1;
    } else {
        alert("Error al digitar la membresia, intentalo de nuevo")
    }
    let totalConDescuento = totalCompra - (totalCompra * descuento);
    alert("Tipo de membresia: " + membresia +
        "\nTotal a pagar: $" + totalConDescuento.toFixed(2));
}

function ejercicio08() {
    //8. Hacer un algoritmo en JavaScript para calcular el promedio de tres notas y 
    // determinar si el estudiante aprobó o no.
    let nota1 = parseFloat(prompt("Escribe la primera nota"));
    let nota2 = parseFloat(prompt("Escribe la segunda nota"));
    let nota3 = parseFloat(prompt("Escribe la tercera nota"));
    let promedio = (nota1 + nota2 + nota3) / 3;
    let estado = promedio >= 12 ? "APROBADO" : "DESAPROBADO";
    alert("Promedio del estudiante: " + promedio.toFixed(2) +
        "\nEstado: " + estado)
}

function ejercicio09() {

}

function ejercicio10() {

}

function ejercicio11() {

}

function ejercicio12() {

}

function ejercicio13() {

}

function ejercicio14() {

}

function ejercicio15() {

}

function ejercicio16() {

}

function ejercicio17() {

}

function ejercicio18() {

}

function ejercicio19() {

}

function ejercicio20() {

}

function ejercicio21() {

}

function ejercicio22() {

}

function ejercicio23() {

}

function ejercicio24() {

}

function ejercicio25() {

}

function ejercicio26() {

}

function ejercicio27() {

}

function ejercicio28() {

}

function ejercicio29() {

}

function ejercicio30() {

}

function ejercicio31() {

}

function ejercicio32() {

}

function ejercicio33() {

}

function ejercicio34() {

}

function ejercicio35() {

}

function ejercicio36() {

}

function ejercicio37() {

}

function ejercicio38() {

}

function ejercicio39() {

}

function ejercicio40() {

}