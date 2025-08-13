Algoritmo ejercicio21
// Hacer un algoritmo en Pseint para determinar la media de una lista indefinida de números positivos, se debe acabar el programa al ingresar un número negativo.
	tot=0
	j=0
	Repetir
		Escribir "ingresar su numero"
		leer n
		si n> 0 			
			tot=tot+n
			j=j+1
	FinSi
Hasta Que n<0
si j> 0 Entoncs
	Escribir "La media es " tot/j
FinSi
FinAlgoritmo
