Proceso Ejercicio_26
	
// 26. Hacer un algoritmo en Pseint para calcular el resto y cociente por medio de restas sucesivas.
	
	Definir numDividendo , numDivisor, cociente, resto Como Entero
	
	Escribir "Ingresar el dividendo: "
	Leer numDividendo
	
	Escribir "Ingresar el divisor: "
	Leer numDivisor
	
	conciente <- 0
	resto <- numDividendo
	
	Mientras resto >= numDivisor Hacer
		resto <- resto - numDivisor
		cociente <- cociente + 1  
	Fin Mientras
	
	Escribir "Cociente es: " cociente
	Escribir "Resto es: " resto
	
FinProceso
