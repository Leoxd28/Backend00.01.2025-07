Algoritmo ejercicio21
	//   Hacer un algoritmo en Pseint que cumpla con la aproximación del número pi con la serie de Nilakantha. La formula que se debe aplicar es:
	
    //Pi = = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - 4/(8*9*10) + 4/(10*11*12) - 4/(12*13*14) ... 
	Escribir "1 Para inciar 2 para cerrar "  
	Leer n
	a=2
	b=3
	c=4
	d=1
	i=1
	vlp=3
	SI n=1 Entoncs
		mientras i<1000 hacer
		vlp=vlp+d*(4/(a*b*c))
		d=d*(-1)
		a=a+2
		b=b+2
		c=c+2
		i=i+1
	FinMientras
FinSi

	Escribir vlp
FinAlgoritmo
