function ejercicio01() {
    //1. Hacer un algoritmo en JavaScript que lea un número por el teclado y determinar si tiene tres dígitos.

    let numero = parseInt(prompt("Escribe un numero"));
    if (!isNaN(numero)) {
        if (numero > 99 && numero < 1000) {
            alert("Si tiene 3 Digitos")
        } else {
            alert("No tiene 3 digitos")
        }
    }
    else {
        alert("El valor ingresado no es un numero")
    }
}



function ejercicio02() {
    //2. Hacer un algoritmo en JavaScript que lea un número entero por el teclado y determinar si 
    // es negativo.

    let numero = parseInt(prompt("Ingresa un número entero:"));
    if (numero < 0) {
        alert("es negativo");
    } else {
        alert("no es negativo");
    }

}



function ejercicio03() {
    //3. Hacer un algoritmo en JavaScript que lea un número y determinar si termina en 4.

    let numero = parseInt(prompt("ingrese numero"));
    if (Math.abs(numero) % 10 === 4) {
        alert("termina en 4");
    } else {
        alert("no termina en 4");
    }
}



function ejercicio04() {
    //Hacer un algoritmo en JavaScript que lea tres números enteros y los muestre de menor a mayor.

    let numero1 = parseInt(prompt("ingrese primer numero"));
    let numero2 = parseInt(prompt("ingrese segundo numero"));
    let numero3 = parseInt(prompt("ingrese tercer numero"));
    let numeros = [numero1, numero2, numero3];
    numeros.sort((a, b) => a - b);

    alert("orden de menor a mayor: " + numeros.join(", "));
}



function ejercicio05() {
    //5. Hacer un algoritmo en JavaScript para una tienda de zapatos que tiene una promoción de
    //  descuento para vender al mayor, esta dependerá del número de zapatos que se compren. Si 
    // son más de diez, se les dará un 10% de descuento sobre el total de la compra; si el número
    //  de zapatos es mayor de veinte pero menor de treinta, se le otorga un 20% de descuento; y 
    // si son más treinta zapatos se otorgará un 40% de descuento. El precio de cada zapato es de $80.

    let cantidad = parseInt(prompt("ingresar cantidad de zapatos que comprara"));
    let precioUnitario = 80;
    let total = cantidad * precioUnitario;
    let descuento = 0;


    if (cantidad > 30) {
        descuento = 0.40;
    } else if (cantidad > 20 && cantidad <= 30) {
        descuento = 0.20;
    } else if (cantidad >= 10) {
        descuento = 0.10;
    }

    let montoDescuento = total * descuento;
    let totalPagar = total - montoDescuento;


    alert("Total S/." + total +
        "\nDescuento: S/." + montoDescuento +
        "\ntotal a pagar S/." + totalPagar);

}



function ejercicio06() {
    //Hacer un algoritmo en JavaScript para ayudar a un trabajador a saber cuál será su sueldo 
    // semanal, se sabe que si trabaja 40 horas o menos, se le pagará $20 por hora, pero si 
    // trabaja más de 40 horas entonces las horas extras se le pagarán a $25 por hora.

    let horasTrabajadas = parseInt(prompt("ingresar cantidad de horas trabajadas"));
    let pagoHoraNormal = 20;
    let pagoHoraExtra = 25;
    let sueldo = 0;

    if (horasTrabajadas <= 40) {
        sueldo = horasTrabajadas * pagoHoraNormal;
    } else {
        let horasExtras = horasTrabajadas - 40;
        sueldo = (40 * pagoHoraNormal) + (horasExtras * pagoHoraExtra);
    }

    alert("su sueldo sera" + sueldo);

}




function ejercicio07() {
    //Hacer un algoritmo en JavaScript para una tienda de helado que da un descuento 
    // por compra a sus clientes con membresía dependiendo de su tipo, sólo existen 
    // tres tipos de membresía, tipo A, tipo B y tipo C. Los descuentos son los siguientes:
    //Tipo A 10% de descuento
    //Tipo B 15% de descuento
    //Tipo C 20% de descuento
    let tipo = prompt("ingrese tipo de membresia, A, B o C").toUpperCase();
    let totalCompra = parseFloat(prompt("ingrese el total de la compra"));
    let descuento = 0;

    if (tipo === "A") {
        descuento = 0.10;
    } else if (tipo === "B") {
        descuento = 0.15;
    } else if (tipo === "C") {
        descuento = 0.20;
    } else {
        alert("tipo de membresia invalido");
    }

    if (descuento > 0) {
        let montoDescuento = totalCompra * descuento;
        let totalPagar = totalCompra - montoDescuento;

        alert("Tipo de membresía: " + tipo +
            "\nDescuento: S/." + montoDescuento.toFixed(2) +
            "\nTotal a pagar: S/." + totalPagar.toFixed(2));
    }

}




function ejercicio08() {
    //8. Hacer un algoritmo en JavaScript para calcular el promedio de tres notas
    //  y determinar si el estudiante aprobó o no.
    let nota1 = parseFloat(prompt("ingrese primera nota"));
    let nota2 = parseFloat(prompt("ingrese segunda nota"));
    let nota3 = parseFloat(prompt("ingrese tercera nota"));

    let promedio = (nota1 + nota2 + nota3) / 3;

    if (promedio >= 12) {
        alert("promedio: " + promedio.toFixed(2) + "  aprobado");
    } else {
        alert("promedio: " + promedio.toFixed(2) + "  desaprobado");
    }

}




function ejercicio09() {
    //9. Hacer un algoritmo en JavaScript para determinar el aumento de un trabajador, 
    // se debe tomar en cuenta que si ganaba más de $2000 tendrá un aumento del 5%, 
    // si generaba menos de $2000 su aumento será de un 10%.

    let sueldo = parseFloat(prompt("ingresar monto de sueldo"));
    let aumento = 0;

    if (sueldo > 2000) {
        aumento = sueldo * 0.05;
    } else {
        aumento = sueldo * 0.10;
    }

    let nuevoSueldo = sueldo + aumento;

    alert("Sueldo anterior: S/." + sueldo.toFixed(2) +
        "\nAumento: S/." + aumento.toFixed(2) +
        "\nNuevo sueldo: S/." + nuevoSueldo.toFixed(2));

}




function ejercicio010() {
    //10. Hacer un algoritmo en JavaScript que diga si un número es par o impar.
    let numero = parseInt(prompt("ingrese numero"));

    if (numero % 2 === 0) {
        alert("es par");
    } else {
        alert("es impar");
    }

}


function ejercicio11() {
    //11. Hacer un algoritmo en JavaScript que lea tres números y diga cuál es el mayor.
    let num1 = parseFloat(prompt("Ingresa el primer número:"));
    let num2 = parseFloat(prompt("Ingresa el segundo número:"));
    let num3 = parseFloat(prompt("Ingresa el tercer número:"));

    let mayor = num1;

    if (num2 > mayor) {
        mayor = num2;
    }
    if (num3 > mayor) {
        mayor = num3;
    }

    alert("el número mayor es " + mayor);

}


function ejercicio12() {
    //12. Hacer un algoritmo en JavaScript que lea dos números y diga cuál es el mayor.
    let num1 = parseFloat(prompt("ingresar primer numero:"));
    let num2 = parseFloat(prompt("ingresar segundo numero:"));

    if (num1 > num2) {
        alert("el numero mayor es: " + num1);
    } else if (num2 > num1) {
        alert("el nuemro mayor es: " + num2);
    } else {
        alert("ambos numeros son iguales");
    }

}


function ejercicio13() {
    //13. Hacer un algoritmo en JavaScript que lea una letra y diga si es una vocal.
    let letra = prompt("ingrese una letra").toLowerCase();

    if (letra === "a" || letra === "e" || letra === "i" || letra === "o" || letra === "u") {
        alert("es vocal");
    } else {
        alert("no es una vocal");
    }

}


function ejercicio14() {
    //14. Hacer un algoritmo en JavaScript que lea un entero positivo del 1 al diez 
    // y al 9 y determine si es un número primo.
    let numero = parseInt(prompt("ingresar un numero del 1 al 10"));

    if (numero < 1 || numero > 10) {
        alert("numero incorrecto");
    } else {
        let esPrimo = true;

        if (numero <= 1) {
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
            alert("es primo");
        } else {
            alert("no es primo");
        }
    }

}


function ejercicio15() {
    //15. Hacer un algoritmo en JavaScript que convierta centímetros a pulgadas 
    // y libras a kilogramos.
    let cm = parseFloat(prompt("ingrese cantidad en centrimetros"));
    let pulgadas = cm / 2.54;

    let libras = parseFloat(prompt("ingrese cantidad en libras"));
    let kilogramos = libras * 0.453592;

    alert(cm + " cm = " + pulgadas.toFixed(2) + " pulgadas" +
        "\n" + libras + " lb = " + kilogramos.toFixed(2) + " kg");

}



function ejercicio16() {
    //16. Hacer un algoritmo en JavaScript que lea un número y según ese número, 
    // indique el día que corresponde.
    let numero = parseInt(prompt("ingrese un numero del 1 al 7:"));
    let dia = "";

    switch (numero) {
        case 1:
            dia = "lunes";
            break;
        case 2:
            dia = "martes";
            break;
        case 3:
            dia = "miercoles";
            break;
        case 4:
            dia = "jueves";
            break;
        case 5:
            dia = "viernes";
            break;
        case 6:
            dia = "sabado";
            break;
        case 7:
            dia = "domingo";
            break;
        default:
            dia = "numero invalido";
    }

    alert(dia);

}


function ejercicio17() {
    //17. Hacer un algoritmo en JavaScript donde se ingrese una hora y nos calcule 
    // la hora dentro de un segundo.
    let horas = parseInt(prompt("ingrese hora"));
    let minutos = parseInt(prompt("ingrese minutos"));
    let segundos = parseInt(prompt("Ingresa los segundos (0-59):"));

    // Sumamos 1 segundo
    segundos++;

    if (segundos === 60) {
        segundos = 0;
        minutos++;
        if (minutos === 60) {
            minutos = 0;
            horas++;
            if (horas === 24) {
                horas = 0;
            }
        }
    }

    alert(`La hora dentro de un segundo será: ${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`);

}



function ejercicio18() {
    //18. Hacer un algoritmo en JavaScript para una empresa se encarga de la venta y 
    // distribución de CD vírgenes. Los clientes pueden adquirir los artículos 
    // (supongamos un único producto de una única marca) por cantidad. Los precios 
    // son:
    //$10. Si se compran unidades separadas hasta 9.
    //$8. Si se compran entre 10 unidades hasta 99.
    //$7. Entre 100 y 499 unidades.
    //$6. Para mas de 500 unidades.
    //La ganancia para el vendedor es de 8,25 % de la venta. Realizar un algoritmo 
    // en JavaScript que dado un número de CDs a vender calcule el precio total 
    // para el cliente y la ganancia para el vendedor.
    let cantidad = parseInt(prompt("ingresar cantidad de CDS"));
    let precioUnitario;

    if (cantidad <= 9) {
        precioUnitario = 10;
    } else if (cantidad <= 99) {
        precioUnitario = 8;
    } else if (cantidad <= 499) {
        precioUnitario = 7;
    } else {
        precioUnitario = 6;
    }

    let precioTotal = cantidad * precioUnitario;
    let ganancia = precioTotal * 0.0825;

    alert(`precio total para el cliente: $ ${precioTotal.toFixed(2)}
    \nganancia para el vendedor: $ ${ganancia.toFixed(2)}`);

}



function ejercicio19() {
    //19. Hacer un algoritmo en JavaScript para una heladería se tienen 4 tipos de 
    // empleados ordenados de la siguiente forma con su número identificador y 
    // salario diario correspondiente:
    //Cajero (56$/día).
    //Servidor (64$/día).
    //Preparador de mezclas (80$/día).
    //Mantenimiento (48$/día).
    //El dueño de la tienda desea tener un programa donde sólo ingrese dos números 
    //enteros que representen al número identificador del empleado y la cantidad 
    //de días que trabajó en la semana (6 días máximos). Y el programa le mostrará
    //por pantalla la cantidad de dinero que el dueño le debe pagar al empleado 
    //que ingresó
    let idEmpleado = parseInt(prompt("ingrese el número identificador del empleado (1-Cajero, 2-Servidor, 3-Preparador, 4-Mantenimiento)"));
    let diasTrabajados = parseInt(prompt("ingresar  cantidad de días trabajados"));

    if (diasTrabajados < 0 || diasTrabajados > 6) {
        alert("nuemro de dias invalido (1-6)");
    } else {
        let salarioDiario;

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
                alert("nuemro de identificador invalido");
                salarioDiario = null;
        }

        if (salarioDiario !== null) {
            let pagoTotal = salarioDiario * diasTrabajados;
            alert(`pago total al empleado: S/. ${pagoTotal}`);
        }
    }

}



function ejercicio20() {
    //Hacer un algoritmo en JavaScript que que lea 4 números enteros positivos y 
    // verifique y realice las siguientes operaciones:

    //¿Cuántos números son Pares?

    //¿Cuál es el mayor de todos?

    //Si el tercero es par, calcular el cuadrado del segundo.

    //Si el primero es menor que el cuarto, calcular la media de los 4 números.

    //Si el segundo es mayor que el tercero, verificar si el tercero esta comprendido 
    // entre los valores 50 y 700. Si cumple se cumple la segunda condición, calcular 
    // la suma de los 4 números.
    // Leer 4 números enteros positivos
    let num1 = parseInt(prompt("ingresar primer numero:"));
    let num2 = parseInt(prompt("ingresar segundo numero:"));
    let num3 = parseInt(prompt("ingresar tercer numero:"));
    let num4 = parseInt(prompt("ingresar cuarto numero:"));

    // Validación
    if (num1 <= 0 || num2 <= 0 || num3 <= 0 || num4 <= 0) {
        alert("ingrese un numero entero");
    } else {
        let pares = 0;
        if (num1 % 2 === 0) pares++;
        if (num2 % 2 === 0) pares++;
        if (num3 % 2 === 0) pares++;
        if (num4 % 2 === 0) pares++;
        alert(`cantidad de numeros pares ${pares}`);

        let mayor = Math.max(num1, num2, num3, num4);
        alert(`el mayor numero es ${mayor}`);

        if (num3 % 2 === 0) {
            let cuadrado = num2 ** 2;
            alert(`el tercero es par. cuadrado del segundo ${cuadrado}`);
        }

        if (num1 < num4) {
            let media = (num1 + num2 + num3 + num4) / 4;
            alert(`el primero es menor que el cuarto. media ${media}`);
        }

        
        if (num2 > num3 && num3 >= 50 && num3 <= 700) {
            let suma = num1 + num2 + num3 + num4;
            alert(`el segundo es mayor que el tercero y el tercero está entre 50 y 700. suma total: ${suma}`);
        }
    }

}




function ejercicio21() {
    //21. Hacer un algoritmo en JavaScript que permita calcular el factorial de un número.
    let num = parseInt(prompt("ingresar un numero "));

    if (num < 0) {
        alert("no tiene factorial");
    } else {
        let factorial = 1;
        for (let i = 1; i <= num; i++) {
            factorial *= i;
        }
        alert(`el factorial de ${num} es: ${factorial}`);
    }

}




function ejercicio22() {
    //22. Hacer un algoritmo en JavaScript para calcular la suma de los n primeros números.
    let n = parseInt(prompt("ingrese un numero"));

    if (n <= 0) {
        alert("numero invalido");
    } else {
        let suma = 0;
        for (let i = 1; i <= n; i++) {
            suma += i;
        }
        alert(`la suma de los ${n} primeros nuemros es ${suma}`);
    }

}



function ejercicio23() {
    //23. Hacer un algoritmo en JavaScript para calcular la suma de los números 
    // impares menores o iguales a n.
    let n = parseInt(prompt("ingresar un numero positivo"));

    if (n <= 0) {
        alert("nuemro invalido");
    } else {
        let suma = 0;
        for (let i = 1; i <= n; i += 2) { 
            suma += i;
        }
        alert(`la suma de los números impares ≤ ${n} es: ${suma}`);
    }

}



function ejercicio24() {
    //24. Hacer un algoritmo en JavaScript para realizar la suma de todos los 
    // números pares hasta el 1000.
    let suma = 0;

    for (let i = 2; i <= 1000; i += 2) { 
        suma += i;
    }

    alert(`la suma de todos los números pares hasta 1000 es: ${suma}`);

}



function ejercicio25() {
    //25. Hacer un algoritmo en JavaScript para calcular el factorial de un número 
    // de una forma distinta.
    function factorial(n) {
        if (n === 0 || n === 1) {
            return 1; // Caso base
        }
        return n * factorial(n - 1); // Llamada recursiva
    }

    let numero = parseInt(prompt("Ingrese un número para calcular su factorial:"));
    let resultado = factorial(numero);

    alert(`El factorial de ${numero} es: ${resultado}`);

}


function ejercicio26() {
    //26. Hacer un algoritmo en JavaScript para calcular el resto y cociente por
    //  medio de restas sucesivas.
    let dividendo = parseInt(prompt("Ingrese el dividendo:"));
    let divisor = parseInt(prompt("Ingrese el divisor:"));

    let cociente = 0;
    let resto = dividendo;

    if (divisor > 0) {
        while (resto >= divisor) {
            resto -= divisor; // Restamos el divisor del resto
            cociente++;       // Contamos cuántas veces restamos
        }

        alert(`Cociente: ${cociente}`);
        alert(`Resto: ${resto}`);
    } else {
        alert("El divisor debe ser mayor que 0");
    }

}


function ejercicio27() {
    //27. Hacer un algoritmo en JavaScript para determinar la media de una lista
    //  indefinida de números positivos, se debe acabar el programa al ingresar 
    // un número negativo.
    let suma = 0;
    let contador = 0;

    while (true) {
        let num = parseFloat(prompt("Ingrese un número positivo (negativo para salir):"));

        if (num < 0) {
            break; // salir del bucle si es negativo
        }

        suma += num;
        contador++;
    }

    if (contador > 0) {
        let media = suma / contador;
        alert(`La media de los ${contador} números ingresados es: ${media}`);
    } else {
        alert("No se ingresaron números positivos.");
    }

}




function ejercicio28() {
    //28. Hacer un algoritmo en JavaScript para calcular la suma de los primeros
    //  cien números con un ciclo repetir.
    let suma = 0;
    let i = 1;

    do {
        suma += i;
        i++;
    } while (i <= 100);

    alert(`La suma de los primeros 100 números es: ${suma}`);

}



function ejercicio29() {
    //29. Hacer un algoritmo en JavaScript para calcular la suma de los primeros
    //  cien números con un ciclo mientras.
    let suma = 0;
    let i = 1;

    while (i <= 100) {
        suma += i;
        i++;
    }

    alert(`La suma de los primeros 100 números es: ${suma}`);

}



function ejercicio30() {
    //30. Hacer un algoritmo en JavaScript para calcular la suma de los primeros
    //  cien números con un ciclo para.
    let suma = 0;

    for (let i = 1; i <= 100; i++) {
        suma += i;
    }

    alert(`la suma de los primeros 100 números es: ${suma}`);

}



function ejercicio31() {
    //31. Hacer un algoritmo en JavaScript parar calcular la media de los números
    //  pares e impares, sólo se ingresará diez números.
    let sumaPares = 0;
    let sumaImpares = 0;
    let contPares = 0;
    let contImpares = 0;

    for (let i = 1; i <= 10; i++) {
        let num = parseInt(prompt(`ingresar numero ${i}:`));

        if (num % 2 === 0) {
            sumaPares += num;
            contPares++;
        } else {
            sumaImpares += num;
            contImpares++;
        }
    }

    let mediaPares = contPares > 0 ? (sumaPares / contPares) : 0;
    let mediaImpares = contImpares > 0 ? (sumaImpares / contImpares) : 0;

    alert(`media de pares: ${mediaPares}`);
    alert(`media de impares: ${mediaImpares}`);

}



function ejercicio32() {
    //32. Se quiere saber cuál es la ciudad con la población de más personas, 
    // son tres provincias y once ciudades, hacer un algoritmo en JavaScript 
    // que nos permita saber eso. 
    let ciudadMayor = "";
    let poblacionMayor = 0;

    for (let i = 1; i <= 11; i++) {
        let ciudad = prompt(`ingresar el nombre de la ciudad ${i}:`);
        let poblacion = parseInt(prompt(`ingresar cantidad de poblacion ${ciudad}:`));

        if (poblacion > poblacionMayor) {
            poblacionMayor = poblacion;
            ciudadMayor = ciudad;
        }
    }

    alert(`la ciudad con mayor poblacion es  ${ciudadMayor} con ${poblacionMayor} habitantes.`);

}



function ejercicio33() {
    //33. Hacer un algoritmo en JavaScript que permita al usuario continuar con el programa.
    let continuar = true;

    while (continuar) {
        let nombre = prompt("ingresar nombre:");
        alert(`Hola, ${nombre} 👋`);

        let respuesta = prompt("¿continuar¿ ( S/N )").toUpperCase();

        if (respuesta !== "S") {
            continuar = false;
            alert("programa finalizado");
        }
    }

}



function ejercicio34() {
    //34. Hacer un algoritmo en JavaScript que imprima la tabla de multiplicar 
    // de los números del uno al nueve.
    for (let i = 1; i <= 9; i++) {
        let tabla = `tabla del ${i}\n`;
        for (let j = 1; j <= 10; j++) {
            tabla += `${i} x ${j} = ${i * j}\n`;
        }
        alert(tabla);
    }


}



function ejercicio35() {
    //35. Hacer un algoritmo en JavaScript que nos permita saber cuál es el número 
    // mayor y menor, se debe ingresar sólo veinte números.

    let mayor = Number.NEGATIVE_INFINITY;
    let menor = Number.POSITIVE_INFINITY;

    for (let i = 1; i <= 20; i++) {
        let num = parseFloat(prompt(`ingresar numero ${i}:`));

        if (num > mayor) {
            mayor = num;
        }
        if (num < menor) {
            menor = num;
        }
    }

    alert(`el nuemro mayor es  ${mayor}\nel nuemro menor es ${menor}`);

}



function ejercicio36() {
    //36. Hacer un algoritmo en JavaScript para calcular la serie de Fibonacci.
    let n = parseInt(prompt("¿Cuántos términos de la serie Fibonacci quieres calcular?"));

    let a = 0, b = 1, serie = "";

    for (let i = 1; i <= n; i++) {
        serie += a + (i < n ? ", " : "");
        let siguiente = a + b;
        a = b;
        b = siguiente;
    }

    alert("serie de fibonacci:\n" + serie);

}



function ejercicio37() {
    //37. Hacer un algoritmo en JavaScript para conseguir el M.C.D de un número
    //  por medio del algoritmo de Euclides.

    let a = parseInt(prompt("ingresar primer numero"));
    let b = parseInt(prompt("ingresar segundo numero"));

    let originalA = a;
    let originalB = b;

    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }

    alert("El M.C.D. de " + originalA + " y " + originalB + " es " + a);

}



function ejercicio38() {
    //38. Hacer un algoritmo en JavaScript que nos permita saber si un número 
    // es un número perfecto.
    let num = parseInt(prompt("ingresar numero"));
    let suma = 0;

    for (let i = 1; i < num; i++) {
        if (num % i === 0) {
            suma += i;
        }
    }

    if (suma === num) {
        alert(num + "el numero es perfecto");
    } else {
        alert(num + "el numero no es perfecto");
    }

}



