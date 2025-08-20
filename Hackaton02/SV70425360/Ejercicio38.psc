Proceso Ejercicio38
	//38. Hacer un algoritmo en Pseint que nos permita saber si un número es un número perfecto.

	Escribir "Ingrese un número:"
	Leer n
	suma <- 0

	Para i <- 1 Hasta n-1
		si n MOD i = 0 entonces
			suma <- suma + i
		FinSi
	FinPara

	si suma = n entonces
		Escribir n, " es un número perfecto."
	sino
		Escribir n, " no es un número perfecto."
	FinSi
FinProceso
