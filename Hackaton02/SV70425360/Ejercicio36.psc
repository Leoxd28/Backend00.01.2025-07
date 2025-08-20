Proceso Ejercicio36
	//36. Hacer un algoritmo en Pseint para calcular la serie de Fibonacci.
	Escribir "cantidad de términos:"
	Leer n

	a <- 0
	b <- 1

	Escribir "Serie Fibonacci:"
	Para i <- 1 Hasta n
		Escribir a
		siguiente <- a + b
		a <- b
		b <- siguiente
	FinPara
FinProceso
