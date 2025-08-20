Proceso Ejercicio_38
	// 38. Hacer un algoritmo en Pseint que nos permita saber si un número es un número perfecto.
	
	Definir numero1 , i, sumaDivisores Como Entero
	
	Escribir "Ingresar un numero entero positivo"
	Leer 	numero1
	
	sumaDivisores <- 0
	
	Para i<- 1  Hasta numero1 - 1  Con Paso 1 Hacer
		
		si numero1 MOD i = 0 Entonces
			sumaDivisores <- sumaDivisores + i	
		FinSi
	Fin Para
	
	si sumaDivisores = numero1 Entonces
		Escribir "El numero SI es Perfecto"
	SiNo
		Escribir "El numero NO es Perfecto"
	FinSi
FinProceso
