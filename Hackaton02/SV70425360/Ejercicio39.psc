Proceso Ejercicio39
	//39. Hacer un algoritmo en Pseint que cumpla con la aproximación del número pi con la serie de Gregory-Leibniz. La formula que se debe aplicar es:

   //Pi = (4/1) - (4/3) + (4/5) - (4/7) + (4/9) - (4/11) + (4/13) - (4/15) ...
	Escribir "Ingrese el número de términos a usar:"
	Leer n
	
	aproxPi <- 0
	signo <- 1
	
	Para i <- 1 Hasta n Con Paso 1
		denominador <- 2 * i - 1
		termino <- 4 / denominador
		aproxPi <- aproxPi + signo * termino
		signo <- -signo  
	FinPara
	
	Escribir "La aproximación de pi con ", n, " términos es: ", aproxPi
FinProceso
