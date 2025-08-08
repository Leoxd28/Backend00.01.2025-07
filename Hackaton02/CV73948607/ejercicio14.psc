Algoritmo ejercicio11
	//Hacer un algoritmo en Pseint que lea un entero positivo del 1 al diez y al 9 y determine si es un número primo.
	Escribir "numero del 1 al 10"
	Leer n1
	cont=0
	para i =1 Hasta n1 hacer
			si n1 mod i= 0 Entonces
				cont= cont + 1
			FinSi
		
			
		FinPara
		si cont = 2 
			Escribir "es primo"
		sino 
			Escribir "no es primo"
		Finsi

	
FinAlgoritmo
