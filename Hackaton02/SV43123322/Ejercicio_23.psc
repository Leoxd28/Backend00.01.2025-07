Proceso Ejercicio_23
	// 23. Hacer un algoritmo en Pseint para calcular la suma de los números impares menores o iguales a n
	
	
	Definir numero1, i, sumaTotal Como Entero
	
	Escribir "Ingresar el numero limite que quiere sumar"
	Leer numero1 
	sumaTotal <- 0
	Para i=1  Hasta numero1 Con Paso 1 Hacer
		
		si i MOD 2 <> 0 Entonces
			sumaTotal = sumaTotal + i
		FinSi
		
		
	Fin Para
	
	Escribir "La suma de los números impares menores o iguales a " , numero1 , " es: " , sumaTotal
 
FinProceso
