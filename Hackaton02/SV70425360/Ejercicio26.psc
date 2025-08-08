Proceso Ejercicio26
	//26. Hacer un algoritmo en Pseint para calcular el resto y cociente por medio de restas sucesivas.
	Escribir "Ingrese el dividendo:"
	Leer dividendo
	Escribir "Ingrese el divisor:"
	Leer divisor

	cociente <- 0
	mientras dividendo >= divisor Hacer
		dividendo <- dividendo - divisor
		cociente <- cociente + 1
	FinMientras

	resto <- dividendo
	Escribir "Cociente: ", cociente
	Escribir "Resto: ", resto
FinProceso
