Proceso Ejercicio_39

	// 39. Hacer un algoritmo en Pseint que cumpla con la aproximación del número pi con la serie de Gregory-Leibniz. 
	// La formula que se debe aplicar es:
	// Pi = (4/1) - (4/3) + (4/5) - (4/7) + (4/9) - (4/11) + (4/13) - (4/15) ...

	Definir numero1, i Como Entero
	Definir piaprox, denominador, constante Como Real
	
	Escribir "Ingresar la cantidad de numeros que usara para aproxima el valor de PI "
	Leer numero1
	piaprox <- 0
	Para i <- 0  Hasta numero1-1 Con Paso 1 Hacer
		denominador <- 2 * i + 1
		constante <-  4/denominador
		
		si i MOD 2 = 0 Entonces
			piaprox <- piaprox + constante
		SiNo
			piaprox <- piaprox - constante
		FinSi
	Fin Para
	
	Escribir "El numero aproximado de PI es: ", piaprox
	
FinProceso
