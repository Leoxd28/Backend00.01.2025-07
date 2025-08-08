Proceso Ejercicio18
	//18. Hacer un algoritmo en Pseint para una empresa se encarga de la venta y distribución de CD vírgenes. Los clientes pueden adquirir los artículos (supongamos un único producto de una única marca) por cantidad. Los precios son:

    //$10. Si se compran unidades separadas hasta 9.

    //$8. Si se compran entre 10 unidades hasta 99.

    //$7. Entre 100 y 499 unidades.

    //$6. Para mas de 500 unidades.

    //La ganancia para el vendedor es de 8,25 % de la venta. Realizar un algoritmo en Pseint que dado un número de CDs a vender calcule el precio total para el cliente y la ganancia para el vendedor.
	
	Escribir "Ingrese la cantidad de CDs:"
	Leer cantidad

	si cantidad <= 9 entonces
		precio <- 10
	sino
		si cantidad <= 99 entonces
			precio <- 8
		sino
			si cantidad <= 499 entonces
				precio <- 7
			sino
				precio <- 6
			FinSi
		FinSi
	FinSi

	total <- cantidad * precio
	ganancia <- total * 0.0825

	Escribir "Total a pagar: $", total
	Escribir "Ganancia del vendedor: $", ganancia
FinProceso
