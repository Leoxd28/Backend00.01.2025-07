Proceso Ejercicio27
	//27. Hacer un algoritmo en Pseint para determinar la media de una lista indefinida de números positivos, se debe acabar el programa al ingresar un número negativo.
	suma <- 0
	contador <- 0

	Repetir
		Escribir "Ingrese un número positivo (negativo para terminar):"
		Leer num
		si num >= 0 entonces
			suma <- suma + num
			contador <- contador + 1
		FinSi
	Hasta Que num < 0

	si contador > 0 entonces
		media <- suma / contador
		Escribir "Media: ", media
	sino
		Escribir "No se ingresaron números válidos."
	FinSi
FinProceso
