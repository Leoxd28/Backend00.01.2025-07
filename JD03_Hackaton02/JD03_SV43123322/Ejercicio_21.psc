Proceso Ejercicio_21
	
	// 21. Hacer un algoritmo en Pseint que permita calcular el factorial de un número
	
	Definir numero1 , i, acumula Como Real
	acumula <- 1
	Escribir "Ingresar un numero"
	Leer numero1
	
	Para i<- 1 Hasta numero1 Con Paso 1 Hacer
		acumula <- i * acumula
	Fin Para
	
	Escribir "El factorial del numero ", numero1, " es: ", acumula
FinProceso
