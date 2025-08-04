Proceso Ejercicio_35
	
	// 35. Hacer un algoritmo en Pseint que nos permita saber cuál es el número mayor y menor, se debe ingresar sólo veinte números.
	Definir numero1, numMayor, numMenor Como Real
	Definir i Como Entero
	
	Escribir "Ingrese el número 1:"
	Leer numero1
	
	numMayor <- numero1
	numMenor <- numero1
	
	Para i <- 2 Hasta 20 Hacer
		Escribir "Ingrese el número ", i, ":"
		Leer numero1
		
		Si numero1 > numMayor Entonces
			numMayor <- numero1
		FinSi
		
		Si numero1 < numMenor Entonces
			numMenor <- numero1
		FinSi
	FinPara
	
	Escribir "El número numMayor es: ", numMayor
	Escribir "El número numMenor es: ", numMenor
FinProceso

 
