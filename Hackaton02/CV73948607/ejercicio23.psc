Algoritmo ejercicio21
//  Hacer un algoritmo en Pseint para calcular la suma de los números impares menores o iguales a n.
	Escribir "Ingrese numero"	
	Leer num
	tota=0
	i=0
	
	Repetir
		im=2*i+1
		si im<= num Entonces
			tota=tota+im
		FinSi
		i=i+1
	Hasta Que im>=num 
	Escribir tota
	
FinAlgoritmo
