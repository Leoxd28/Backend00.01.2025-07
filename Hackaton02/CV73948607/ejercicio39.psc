Algoritmo ejercicio21
	//    Hacer un algoritmo en Pseint que cumpla con la aproximación del número pi con la serie de Gregory-Leibniz. La formula que se debe aplicar es:
	// Pi = (4/1) - (4/3) + (4/5) - (4/7) + (4/9) - (4/11) + (4/13) - (4/15) ...

	Escribir "1 Para inciar 2 para cerrar "  
	Leer n
	b=1
	c=1
	i=1
	SI n=1 Entonces
	mientras i<1000 Hacer
		vlp=vlp+b*(4/c)
		b=b*(-1)
		c=c+2
		i=i+1
	FinMientras
FinSi

	Escribir vlp
FinAlgoritmo
