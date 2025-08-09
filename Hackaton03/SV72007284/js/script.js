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
        } else {
            descuento = 0;
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
    //9. Hacer un algoritmo en JavaScript para determinar el aumento de un trabajador, se debe tomar en cuenta 
    // que si ganaba más de $2000 tendrá un aumento del 5%, si generaba menos de $2000 su aumento será de un 10%.
    let sueldo = parseFloat(prompt("Escribe tu sueldo mensual"));
    let aumento = 0;
    if (!isNaN(sueldo)) {
        aumento = sueldo > 2000 ? 0.05 : 0.1;
    } else {
        alert("El valor ingresado no es un número")
    }
    let sueldoConAumento = sueldo + (sueldo * aumento);
    alert("Aumento: $" + (aumento * 100) + "%" +
        "\nSueldo final: $" + sueldoConAumento
    )
}

function ejercicio10() {
    //10. Hacer un algoritmo en JavaScript que diga si un número es par o impar.
    let numero = parseInt(prompt("Escribe un número"));
    let formula = numero % 2;
    if (!isNaN(numero)) {
        if (formula === 0) {
            alert("Es par")
        } else {
            alert("No es par")
        }
    } else {
        alert("El valor ingresado no es un número")
    }
}

function ejercicio11() {
    //11. Hacer un algoritmo en JavaScript que lea tres números y diga cuál es el mayor.
    let num1 = parseFloat(prompt("Escribe el primer número"));
    let num2 = parseFloat(prompt("Escribe el segundo número"));
    let num3 = parseFloat(prompt("Escribe el tercer número"));
    let numeroMayor = num1;
    if (!isNaN(num1) && !isNaN(num2) && !isNaN(num3)) {
        if (numeroMayor < num2) {
            numeroMayor = num2;
        }
        if (numeroMayor < num3) {
            numeroMayor = num3;
        }
    } else {
        alert("El valor ingresado no es un número")
    }
    alert("Número mayor: " + numeroMayor)
}

function ejercicio12() {
    //12. Hacer un algoritmo en JavaScript que lea dos números y diga cuál es el mayor.
    let num1 = parseFloat(prompt("Escribe el primer número"));
    let num2 = parseFloat(prompt("Escribe el segundo número"));
    if (num1 > num2) {
        alert("El número " + num1 + " es mayor")
    } else if(num2 > num1) {
        alert("El número " + num2 + " es mayor")
    } else {
        alert("Ambos números son iguales")
    }
}

function ejercicio13() {
    //13. Hacer un algoritmo en JavaScript que lea una letra y diga si es una vocal.
    let letra = prompt("Escribe una letra").toLowerCase();

    if (isNaN(letra)) {
        if (letra.length === 1 && "aeiou".includes(letra)) {
            alert("La letra escrita es una vocal")
        } else {
            alert("La letra escrita no es una vocal o ingresaste más de una letra")
        }
    } else {
        alert("El valor ingresado no es una letra")
    }
}

function ejercicio14() {
    //14. Hacer un algoritmo en JavaScript que lea un entero positivo del 1 al diez y al 9 y determine si es un número primo.
    let numero = parseInt(prompt("Escribe un número"));
    function isPrimo(num){
        if (num <= 1) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;

        for (let i = 3; i <= Math.sqrt(numero); i += 2) {
            if (numero % i === 0) return false
        }
        return true;
    }
    if (numero > 0 && numero < 11) {
        if (isPrimo(numero)) {
            alert("El número escrito es primo")
        } else {
            alert("El número escrito no es primo")
        }
    } else {
        alert("El valor ingresado es negativo o sobrepasa el rango 1 - 10")
    }
}

function ejercicio15() {
    //15. Hacer un algoritmo en JavaScript que convierta centímetros a pulgadas y libras a kilogramos.
    let opcion = parseInt(prompt("Escribe la opcion de conversión" +
        "\n1.- Convertir centímetros a pulgadas" +
        "\n2.- Convertir libras a kilogramos"
    ));
    let divisorOpcion1 = 2.54;
	let divisorOpcion2 = 2.205;
    switch (opcion) {
        case 1:
            let centimetros = parseFloat(prompt("Escribe los centímetros"));
            let pulgadas = centimetros / divisorOpcion1;
            alert("Centimetros: " + centimetros +
                "\nPulgadas: " + pulgadas.toFixed(5)
            )
            break;
        case 2:
            let libras = parseFloat(prompt("Escribe las libras"));
            let kilogramos = libras / divisorOpcion2;
            alert("Libras: " + libras +
                "\nKilogramos: " + kilogramos.toFixed(6)
            )
            break;
        default: alert("La opción no es valida, intentalo de nuevo")
            break;
    }
}

function ejercicio16() {
    //16. Hacer un algoritmo en JavaScript que lea un número y según ese número, indique el día que corresponde.
    let numero = parseInt(prompt("Ingrese un número del 1 al 7:"));
    let dia = "";

    switch (numero) {
        case 1:
            dia = "Lunes";
            break;
        case 2:
            dia = "Martes";
            break;
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
        default:
            dia = "Número inválido. Debe estar entre 1 y 7.";
    }
    alert(dia);
}

function ejercicio17() {
    //17. Hacer un algoritmo en JavaScript donde se ingrese una hora y nos calcule la hora dentro de un segundo.
    let hora = parseInt(prompt("Ingrese la hora (0-23):"));
    let minutos = parseInt(prompt("Ingrese los minutos (0-59):"));
    let segundos = parseInt(prompt("Ingrese los segundos (0-59):"));

    segundos++;

    if (segundos === 60) {
        segundos = 0;
        minutos++;
        if (minutos === 60) {
            minutos = 0;
            hora++;
            if (hora === 24) {
                hora = 0;
            }
        }
    }

    alert("La hora dentro de un segundo será: " + 
          (hora < 10 ? "0" + hora : hora) + ":" +
          (minutos < 10 ? "0" + minutos : minutos) + ":" +
          (segundos < 10 ? "0" + segundos : segundos));
}

function ejercicio18() {
    //18. Hacer un algoritmo en JavaScript para una empresa se encarga de la venta y distribución de CD vírgenes. Los clientes pueden adquirir los artículos (supongamos un único producto de una única marca) por cantidad. Los precios son:
    //$10. Si se compran unidades separadas hasta 9.
    //$8. Si se compran entre 10 unidades hasta 99.
    //$7. Entre 100 y 499 unidades.
    //$6. Para mas de 500 unidades.
    //La ganancia para el vendedor es de 8,25 % de la venta. Realizar un algoritmo en JavaScript que dado un número de CDs a vender calcule el precio total para el cliente y la ganancia para el vendedor.
    let cantidad = parseInt(prompt("Ingrese la cantidad de CDs a vender:"));
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

    let totalVenta = cantidad * precioUnitario;
    let ganancia = totalVenta * 0.0825;

    alert("Precio total para el cliente: $" + totalVenta.toFixed(2) +
          "\nGanancia del vendedor: $" + ganancia.toFixed(2));
}

function ejercicio19() {
    //19. Hacer un algoritmo en JavaScript para una heladería se tienen 4 tipos de empleados ordenados de la siguiente forma con su número identificador y salario diario correspondiente:
    //Cajero (56$/día).
    //Servidor (64$/día).
    //Preparador de mezclas (80$/día).
    //Mantenimiento (48$/día).
    //El dueño de la tienda desea tener un programa donde sólo ingrese dos números enteros que representen al número identificador del empleado y la cantidad de días que trabajó en la semana (6 días máximos). Y el programa le mostrará por pantalla la cantidad de dinero que el dueño le debe pagar al empleado que ingresó
    let id = parseInt(prompt("Ingrese el número identificador del empleado:\n1. Cajero\n2. Servidor\n3. Preparador de mezclas\n4. Mantenimiento"));
    let dias = parseInt(prompt("Ingrese la cantidad de días trabajados (máximo 6):"));
    
    if (dias < 0 || dias > 6) {
        alert("Cantidad de días inválida. Debe ser entre 0 y 6.");
        return;
    }

    let salarioDiario;

    switch (id) {
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
            alert("Identificador inválido.");
            return;
    }

    let total = salarioDiario * dias;

    alert("El pago total al empleado es: $" + total);
}

function ejercicio20() {
    //20. Hacer un algoritmo en JavaScript que que lea 4 números enteros positivos y verifique y realice las siguientes operaciones:
    //¿Cuántos números son Pares?
    //¿Cuál es el mayor de todos?
    //Si el tercero es par, calcular el cuadrado del segundo.
    //Si el primero es menor que el cuarto, calcular la media de los 4 números.
    //Si el segundo es mayor que el tercero, verificar si el tercero esta comprendido entre los valores 50 y 700. Si cumple se cumple la segunda condición, calcular la suma de los 4 números.
    let num1 = parseInt(prompt("Ingrese el primer número entero positivo:"));
    let num2 = parseInt(prompt("Ingrese el segundo número entero positivo:"));
    let num3 = parseInt(prompt("Ingrese el tercer número entero positivo:"));
    let num4 = parseInt(prompt("Ingrese el cuarto número entero positivo:"));

    if (num1 < 0 || num2 < 0 || num3 < 0 || num4 < 0) {
        alert("Todos los números deben ser enteros positivos.");
        return;
    }

    let numeros = [num1, num2, num3, num4];

    // ¿Cuántos son pares?
    let pares = numeros.filter(n => n % 2 === 0).length;

    // ¿Cuál es el mayor?
    let mayor = Math.max(...numeros);

    let resultados = `Cantidad de números pares: ${pares}\n`;
    resultados += `El mayor número es: ${mayor}\n`;

    // Si el tercero es par, calcular el cuadrado del segundo
    if (num3 % 2 === 0) {
        let cuadrado = num2 ** 2;
        resultados += `El tercero es par, el cuadrado del segundo es: ${cuadrado}\n`;
    }

    // Si el primero es menor que el cuarto, calcular la media
    if (num1 < num4) {
        let media = (num1 + num2 + num3 + num4) / 4;
        resultados += `El primero es menor que el cuarto, la media es: ${media}\n`;
    }

    // Si el segundo > tercero y el tercero entre 50 y 700 inclusive
    if (num2 > num3 && num3 >= 50 && num3 <= 700) {
        let suma = num1 + num2 + num3 + num4;
        resultados += `El segundo es mayor que el tercero y el tercero está entre 50 y 700, la suma es: ${suma}\n`;
    }

    alert(resultados);
}

function ejercicio21() {
    //21. Hacer un algoritmo en JavaScript que permita calcular el factorial de un número.
    let numero = parseInt(prompt("Ingrese un número entero positivo:"));

    if (isNaN(numero) || numero < 0) {
        alert("Debe ingresar un número entero positivo.");
        return;
    }

    let factorial = 1;

    for (let i = 1; i <= numero; i++) {
        factorial *= i;
    }

    alert("El factorial de " + numero + " es: " + factorial);
}

function ejercicio22() {
    //22. Hacer un algoritmo en JavaScript para calcular la suma de los n primeros números.
    let n = parseInt(prompt("Ingrese un número entero positivo:"));

    if (isNaN(n) || n <= 0) {
        alert("Debe ingresar un número entero positivo mayor que 0.");
        return;
    }

    let suma = n * (n + 1) / 2;

    alert("La suma de los " + n + " primeros números es: " + suma);
}

function ejercicio23() {
    //23. Hacer un algoritmo en JavaScript para calcular la suma de los números impares menores o iguales a n.
    let n = parseInt(prompt("Ingrese un número entero positivo:"));

    if (isNaN(n) || n <= 0) {
        alert("Debe ingresar un número entero positivo mayor que 0.");
        return;
    }

    let suma = 0;

    for (let i = 1; i <= n; i += 2) {
        suma += i;
    }

    alert("La suma de los números impares menores o iguales a " + n + " es: " + suma);
}

function ejercicio24() {
    //24. Hacer un algoritmo en JavaScript para realizar la suma de todos los números pares hasta el 1000.
    let suma = 0;

    for (let i = 2; i <= 1000; i += 2) {
        suma += i;
    }

    alert("La suma de todos los números pares hasta 1000 es: " + suma);
}

function ejercicio25() {
    //25. Hacer un algoritmo en JavaScript para calcular el factorial de un número de una forma distinta.
    let numero = parseInt(prompt("Ingrese un número entero positivo:"));

    if (isNaN(numero) || numero < 0) {
        alert("Debe ingresar un número entero positivo.");
        return;
    }

    function factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }

    let resultado = factorial(numero);
    alert("El factorial de " + numero + " es: " + resultado);
}

function ejercicio26() {
    //26. Hacer un algoritmo en JavaScript para calcular el resto y cociente por medio de restas sucesivas.
    let dividendo = parseInt(prompt("Ingrese el dividendo (entero positivo):"));
    let divisor = parseInt(prompt("Ingrese el divisor (entero positivo):"));

    if (isNaN(dividendo) || isNaN(divisor) || dividendo < 0 || divisor <= 0) {
        alert("Entrada inválida. Ingrese números enteros positivos y el divisor debe ser mayor que 0.");
        return;
    }

    let cociente = 0;
    let resto = dividendo;

    while (resto >= divisor) {
        resto -= divisor;
        cociente++;
    }

    alert("Cociente: " + cociente + "\nResto: " + resto);
}

function ejercicio27() {
    //27. Hacer un algoritmo en JavaScript para determinar la media de una lista indefinida de números positivos, se debe acabar el programa al ingresar un número negativo.
    let suma = 0;
    let cantidad = 0;

    while (true) {
        let numero = parseFloat(prompt("Ingrese un número positivo (negativo para terminar):"));

        if (numero < 0) {
            break;
        }

        if (isNaN(numero)) {
            alert("Entrada no válida. Intente nuevamente.");
            continue;
        }

        suma += numero;
        cantidad++;
    }

    if (cantidad === 0) {
        alert("No se ingresaron números positivos.");
    } else {
        let media = suma / cantidad;
        alert("La media de los " + cantidad + " números ingresados es: " + media.toFixed(2));
    }
}

function ejercicio28() {
    //28. Hacer un algoritmo en JavaScript para calcular la suma de los primeros cien números con un ciclo repetir.
    let suma = 0;
    let i = 1;

    do {
        suma += i;
        i++;
    } while (i <= 100);

    alert("La suma de los primeros 100 números es: " + suma);
}

function ejercicio29() {
    //29. Hacer un algoritmo en JavaScript para calcular la suma de los primeros cien números con un ciclo mientras.
    let suma = 0;
    let i = 1;

    while (i <= 100) {
        suma += i;
        i++;
    }

    alert("La suma de los primeros 100 números es: " + suma);
}

function ejercicio30() {
    //30. Hacer un algoritmo en JavaScript para calcular la suma de los primeros cien números con un ciclo para.
    let suma = 0;

    for (let i = 1; i <= 100; i++) {
        suma += i;
    }

    alert("La suma de los primeros 100 números es: " + suma);
}

function ejercicio31() {
    //31. Hacer un algoritmo en JavaScript parar calcular la media de los números pares e impares, sólo se ingresará diez números.
    let sumaPares = 0, contadorPares = 0;
    let sumaImpares = 0, contadorImpares = 0;

    for (let i = 1; i <= 10; i++) {
        let num = parseInt(prompt(`Ingrese el número ${i}:`));

        if (isNaN(num)) {
            alert("Entrada inválida. Intente nuevamente.");
            i--; 
            continue;
        }

        if (num % 2 === 0) {
            sumaPares += num;
            contadorPares++;
        } else {
            sumaImpares += num;
            contadorImpares++;
        }
    }

    let mediaPares = contadorPares === 0 ? 0 : sumaPares / contadorPares;
    let mediaImpares = contadorImpares === 0 ? 0 : sumaImpares / contadorImpares;

    alert(`Media de números pares: ${mediaPares.toFixed(2)}\nMedia de números impares: ${mediaImpares.toFixed(2)}`);
}

function ejercicio32() {
    //32. Se quiere saber cuál es la ciudad con la población de más personas, son tres provincias y once ciudades, hacer un algoritmo en JavaScript que nos permita saber eso.
    const provincias = ["Provincia 1", "Provincia 2", "Provincia 3"];
    const ciudadesPorProvincia = 11;

    let ciudadMasPoblada = "";
    let provinciaCiudadMasPoblada = "";
    let maxPoblacion = -1;

    for (let p = 0; p < provincias.length; p++) {
        for (let c = 1; c <= Math.floor(ciudadesPorProvincia / provincias.length); c++) {
            let poblacion = parseInt(prompt(`Ingrese la población de la ciudad ${c} de ${provincias[p]}:`));
            if (isNaN(poblacion) || poblacion < 0) {
                alert("Población inválida, intente de nuevo.");
                c--;
                continue;
            }

            if (poblacion > maxPoblacion) {
                maxPoblacion = poblacion;
                ciudadMasPoblada = `Ciudad ${c}`;
                provinciaCiudadMasPoblada = provincias[p];
            }
        }
    }

    alert(`La ciudad con más población es ${ciudadMasPoblada} de ${provinciaCiudadMasPoblada} con ${maxPoblacion} habitantes.`);
}

function ejercicio33() {
    //33. Hacer un algoritmo en JavaScript que permita al usuario continuar con el programa.
    let continuar = true;

    while (continuar) {
        alert("Ejecutando el proceso...");

        let respuesta = prompt("¿Desea continuar? (s/n)").toLowerCase();

        if (respuesta !== 's' && respuesta !== 'si') {
            continuar = false;
            alert("Programa finalizado.");
        }
    }
}

function ejercicio34() {
    //34. Hacer un algoritmo en JavaScript que imprima la tabla de multiplicar de los números del uno al nueve.
    for (let i = 1; i <= 9; i++) {
        console.log(`Tabla del ${i}:`);
        for (let j = 1; j <= 10; j++) {
            console.log(`${i} x ${j} = ${i * j}`);
        }
        console.log('');
    }
}

function ejercicio35() {
    //35. Hacer un algoritmo en JavaScript que nos permita saber cuál es el número mayor y menor, se debe ingresar sólo veinte números.
    let mayor = null;
    let menor = null;

    for (let i = 1; i <= 20; i++) {
        let num = parseFloat(prompt(`Ingrese el número ${i}:`));

        if (isNaN(num)) {
            alert("Entrada inválida, intente nuevamente.");
            i--;
            continue;
        }

        if (mayor === null || num > mayor) {
            mayor = num;
        }
        if (menor === null || num < menor) {
            menor = num;
        }
    }

    alert(`El número mayor es: ${mayor}\nEl número menor es: ${menor}`);
}

function ejercicio36() {
    //36. Hacer un algoritmo en JavaScript para calcular la serie de Fibonacci.
    let n = parseInt(prompt("Ingrese la cantidad de términos de la serie Fibonacci a calcular (entero positivo):"));

    if (isNaN(n) || n <= 0) {
        alert("Debe ingresar un número entero positivo.");
        return;
    }

    let fib = [0, 1];

    for (let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }

    alert(`Los primeros ${n} términos de la serie Fibonacci son:\n${fib.slice(0, n).join(", ")}`);
}

function ejercicio37() {
    //37. Hacer un algoritmo en JavaScript para conseguir el M.C.D de un número por medio del algoritmo de Euclides.
    let a = parseInt(prompt("Ingrese el primer número entero positivo:"));
    let b = parseInt(prompt("Ingrese el segundo número entero positivo:"));

    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
        alert("Debe ingresar números enteros positivos válidos.");
        return;
    }

    function mcd(x, y) {
        while (y !== 0) {
            let temp = y;
            y = x % y;
            x = temp;
        }
        return x;
    }

    let resultado = mcd(a, b);
    alert(`El M.C.D de ${a} y ${b} es: ${resultado}`);
}

function ejercicio38() {
    //38. Hacer un algoritmo en JavaScript que nos permita saber si un número es un número perfecto.
    let num = parseInt(prompt("Ingrese un número entero positivo:"));

    if (isNaN(num) || num <= 0) {
        alert("Debe ingresar un número entero positivo.");
        return;
    }

    let sumaDivisores = 0;

    for (let i = 1; i <= num / 2; i++) {
        if (num % i === 0) {
            sumaDivisores += i;
        }
    }

    if (sumaDivisores === num) {
        alert(num + " es un número perfecto.");
    } else {
        alert(num + " no es un número perfecto.");
    }
}

function ejercicio39() {
    //39. Hacer un algoritmo en JavaScript que cumpla con la aproximación del número pi con la serie de Gregory-Leibniz. La formula que se debe aplicar es:
    //Pi = (4/1) - (4/3) + (4/5) - (4/7) + (4/9) - (4/11) + (4/13) - (4/15) ...
    let n = parseInt(prompt("Ingrese la cantidad de términos para aproximar π:"));

    if (isNaN(n) || n <= 0) {
        alert("Debe ingresar un número entero positivo.");
        return;
    }

    let pi = 0;
    let signo = 1;

    for (let i = 0; i < n; i++) {
        let divisor = 2 * i + 1;
        pi += signo * (4 / divisor);
        signo *= (-1);
    }

    alert(`Aproximación de π con ${n} términos: ${pi}`);
}

function ejercicio40() {
    //40. Hacer un algoritmo en JavaScript que cumpla con la aproximación del número pi con la serie de Nilakantha. La formula que se debe aplicar es:
    //Pi = = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - 4/(8*9*10) + 4/(10*11*12) - 4/(12*13*14) ...
    let n = parseInt(prompt("Ingrese la cantidad de términos para aproximar π con la serie de Nilakantha:"));

    if (isNaN(n) || n <= 0) {
        alert("Debe ingresar un número entero positivo.");
        return;
    }

    let pi = 3;
    let signo = 1;

    for (let i = 1; i <= n; i++) {
        let a = 2 * i;
        let termino = 4 / (a * (a + 1) * (a + 2));
        pi += signo * termino;
        signo *= (-1);
    }

    alert(`Aproximación de π con ${n} términos de la serie de Nilakantha: ${pi}`);
}