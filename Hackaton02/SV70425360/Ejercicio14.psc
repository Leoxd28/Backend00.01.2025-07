Proceso Ejercicio14
	//14. Hacer un algoritmo en Pseint que lea un entero positivo del 1 al diez y al 9 y determine si es un número primo.
	
 	Escribir "Ingrese un número entre 1 y 9:"
	Leer n

	si n < 1 o n > 9 entonces
		Escribir "Número fuera de rango"
	sino
		si n = 2 o n = 3 o n = 5 o n = 7 entonces
			Escribir "Es primo."
		sino
			Escribir "No es primo."
		FinSi
	FinSi
FinProceso
