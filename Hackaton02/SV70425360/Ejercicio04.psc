Proceso Ejercicio04
	//4. Hacer un algoritmo en Pseint que lea tres números enteros y los muestre de menor a mayor.
	
    Escribir "Ingrese tres números:"
	Leer a, b, c
	si a > b entonces
		intercambio <- a
		a <- b
		b <- intercambio
	FinSi
	si a > c entonces
		intercambio <- a
		a <- c
		c <- intercambio
	FinSi
	si b > c entonces
		intercambio <- b
		b <- c
		c <- intercambio
	FinSi
	Escribir "Ordenados de menor a mayor: ", a, ", ", b, ", ", c
FinProceso
