Proceso Ejercicio40
	//40. Hacer un algoritmo en Pseint que cumpla con la aproximación del número pi con la serie de Nilakantha. La formula que se debe aplicar es:

   //Pi = = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - 4/(8*9*10) + 4/(10*11*12) - 4/(12*13*14) ...
	Escribir "Ingrese número de términos:"
	Leer n
	Aproxpi <- 3
	signo <- 1
	num <- 2
	
	Para i <- 1 Hasta n
		termino <- 4 / (num * (num + 1) * (num + 2))
		Aproxpi <- Aproxpi + signo * termino
		signo <- signo * (-1)
		num <- num + 2
	FinPara
	
	Escribir "Aproximación de Pi: ", pi
FinProceso
