Proceso Ejercicio_11
	//11. Hacer un algoritmo en Pseint que lea tres números y diga cuál es el mayor.
	
	Definir numero1 , numero2, Numero3, temp Como Entero
	Escribir "Ingresar 3 numeros entero"
	Leer Numero1 , numero2, Numero3 
	
	SI numero1> numero2 Entonces
		temp <- numero1
		numero1  <- numero2
		numero2  <- temp 
	FinSi
	
	si numero1 > numero3 entonces 
		temp  <- numero1
		numero1  <- numero3
		numero3  <- temp
	FinSi
	
	si numero2 >  numero3 entonces 
		temp   <- numero2
		numero2  <- numero3
		numero3   <- temp
	FinSi
	
	Escribir "El numero mayor es: " , Numero3 
FinProceso
