Proceso Ejercicio_24
// 24. Hacer un algoritmo en Pseint para realizar la suma de todos los números pares hasta el 1000.
	
	Definir   i, sumaTotal Como Entero
 
	sumaTotal <- 0
	
	Para i=1  Hasta 1000 Con Paso 1 Hacer
		
		si i MOD 2 = 0 Entonces
			sumaTotal = sumaTotal + i
		FinSi
		
		
	Fin Para
	
	Escribir "La suma de todos los números pares hasta el 1000 es: " , sumaTotal
FinProceso
