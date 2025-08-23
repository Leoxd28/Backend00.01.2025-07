Proceso Ejercicio_22
	// 22. Hacer un algoritmo en Pseint para calcular la suma de los n primeros números.
	
	Definir numero1, i, sumaTotal Como Entero
	
	Escribir "Ingresar el numero limite que quiere sumar"
	Leer numero1 
	sumaTotal <- 0
	Para i=1  Hasta numero1 Con Paso 1 Hacer
		sumaTotal = sumaTotal + i
	Fin Para
	
	Escribir "La suma de los " , numero1 , " primeros números es: " , sumaTotal
FinProceso
