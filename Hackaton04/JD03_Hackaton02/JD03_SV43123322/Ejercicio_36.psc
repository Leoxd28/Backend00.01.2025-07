Proceso Ejercicio_36
	// 36. Hacer un algoritmo en Pseint para calcular la serie de Fibonacci.
	Definir cantidad , i, num1, num2 , temporal Como Entero
	Escribir  "Ingresar la cantidad de numeros con los cuales calculara la serie Fibonacci"
	Leer cantidad
	
	num1 <- 0
	num2 <- 1
	Para i <- 2 Hasta (cantidad + 1) Con Paso 1 
		Escribir num2
		temporal <- num1 + num2
		num1 <- num2
		num2<- temporal
		
	Fin Para
	
FinProceso
 