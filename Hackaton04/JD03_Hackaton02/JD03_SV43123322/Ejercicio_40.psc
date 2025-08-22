Proceso Ejercicio_40
	// 40. Hacer un algoritmo en Pseint que cumpla con la aproximación del número pi con la serie de Nilakantha. La formula que se debe aplicar es:
	// Pi = = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - 4/(8*9*10) + 4/(10*11*12) - 4/(12*13*14) ...
	
	Definir numero1, i Como Entero
	Definir piaprox, constante , a, b, c Como Real
	
	Escribir  "Ingresar la cantidad de numeros para la aproximacion: "
	Leer numero1
	
	piaprox<- 3
	Para i<-1  Hasta numero1 Con Paso 1 Hacer
		a <- 2 + 2 *(i-1)
		b <- a + 1 
		c <- b + 1
		constante <- 4/(a*b*c)
		
		si i MOD 2 = 1 Entonces
			piaprox <- piaprox + constante
		SiNo
			piaprox <- piaprox - constante
		FinSi
	Fin Para
	Escribir "El numero aproximado de PI es: ", piaprox
FinProceso
