Proceso Ejercicio37
	//37. Hacer un algoritmo en Pseint para conseguir el M.C.D de un número por medio del algoritmo de Euclides.
	Escribir "Ingrese el primer número:"
	Leer a
	Escribir "Ingrese el segundo número:"
	Leer b

	Mientras b <> 0 Hacer
		r <- a MOD b
		a <- b
		b <- r
	FinMientras

	Escribir "El MCD es: ", a
FinProceso
