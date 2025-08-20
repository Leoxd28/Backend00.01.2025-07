// 25. Hacer un algoritmo en Pseint para calcular el factorial de un número de una forma distinta

Funcion num  <-  factorial (n)
	si n =0 Entonces
		num <- 1
	SiNo
		num <- n * factorial (n-1)
	FinSi
FinFuncion

Proceso Ejercicio_25
	
	Definir numero1 , importeFactorial Como Entero
	Escribir  "Ingrese numero que quiere calcular factorial"
	Leer numero1 
	
	importeFactorial <- factorial(numero1)
	
	Escribir "El factorial del numero ", numero1, " es igual a ", importeFactorial
	
	
FinProceso


