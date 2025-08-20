Algoritmo ejercicio21
//  Hacer un algoritmo en Pseint para realizar la suma de todos los números pares hasta el 1000.
	Escribir "Se iniciara la suma autoriza 1.si  2.no"
	leer rpta
	num =1000
	tota=0
	i=0
	
	si rpta = 1
	Repetir
		im=2*i+2
		si im<= num Entonces
			tota=tota+im
		FinSi
		i=i+1
	Hasta Que im>=num
	Escribir tota
FinSi

	
FinAlgoritmo
