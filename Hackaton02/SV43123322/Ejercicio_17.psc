Proceso Ejercicio_17
	//17. Hacer un algoritmo en Pseint donde se ingrese una hora y nos calcule la hora dentro de un segundo.
 
		Definir hora, minuto, segundo1 Como Entero
		
		Escribir "Ingresar la hora en un rago de 0 a 23 : "
		Leer hora
		Escribir "Ingresar los minutos en un rago de 0 a 59 : "
		Leer minuto
		Escribir "Ingresar los segundos en un rago de 0 a 59 : "
		Leer segundo1
  
	  
		segundo1 <- segundo1 + 1
		
	 
		Si segundo1 = 60 Entonces
			segundo1 <- 00  
			minuto <- minuto + 1
						 
			Si minuto = 60 Entonces
				minuto <- 0
				hora <- hora + 1
							 
				Si hora = 24 Entonces
					hora <- 0
				FinSi
			FinSi
		FinSi
		
		Escribir "La hora dentro de un segundo será: ", hora, ":", minuto, ":", segundo1 
 

FinProceso
