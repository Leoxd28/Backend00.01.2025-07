Proceso Ejercicio_14
	//14. Hacer un algoritmo en Pseint que lea un entero positivo del 1 al diez y al 9 y determine si es un número primo.
	Definir  numero_1 , i Como Entero
	Definir estadoPrimo Como Logico
	
	Repetir
		Escribir "Ingresar un numero entero positivo del 1 al diez y al 9"
		Leer numero_1 
	Hasta Que numero_1 >= 1 y numero_1 <= 9 
	
	estadoPrimo <- Verdadero
	
 
	si numero_1 = 1 Entonces
		estadoPrimo <- Falso
	SiNo
		
		Para i <- 2 Hasta (numero_1 - 1) Con Paso 1 Hacer
			si 	numero_1 MOD i = 0 Entonces				
				estadoPrimo  <-	Falso
			
			FinSi
		FinPara
	FinSi
	
	si estadoPrimo = Verdadero Entonces
		Escribir numero_1 , " Sí es un número PRIMO"
	SiNo
		Escribir numero_1 , " No es un número PRIMO"
	FinSi
	
FinProceso
