Proceso Ejercicio35
	//35. Hacer un algoritmo en Pseint que nos permita saber cuál es el número mayor y menor, se debe ingresar sólo veinte números.
	Escribir "Ingrese 20 números:"
	Leer num
	mayor <- num
	menor <- num

	Para i <- 2 Hasta 20
		Leer num
		si num > mayor entonces
			mayor <- num
		FinSi
		si num < menor entonces
			menor <- num
		FinSi
	FinPara

	Escribir "El mayor es: ", mayor
	Escribir "El menor es: ", menor
FinProceso
