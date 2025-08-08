Proceso Ejercicio_27
 // 27. Hacer un algoritmo en Pseint para determinar la media de una lista indefinida de números positivos,
	// se debe acabar el programa al ingresar un número negativo.
	
	Definir numero1, sumaTotal, i, media Como Real
	
	Escribir "Ingrese un listado de numeros positivos para determinar la media"
	Escribir "Ingrese un numero negativo para finalizar el calculo"
	
	Leer numero1
	
	Mientras numero1 >= 0  Hacer
		sumaTotal <- sumaTotal + numero1
		i <- i + 1
		Leer numero1
	Fin Mientras
	
	si i > 0 Entonces		
		media <- sumaTotal / i
		Escribir "La cantidad de numeros ingresados es: ", i
		Escribir "La suma total de los numeros ingresados es: ", sumaTotal		
		Escribir "La media de los numeros ingresados es: ", media
	SiNo
		Escribir "No se ingresaron numeros positivos"
		
	FinSi
FinProceso
