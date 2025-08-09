Algoritmo ejercicio21
	//    Hacer un algoritmo en Pseint para conseguir el M.C.D de un número por medio del algoritmo de Euclides.
	Escribir "Ingresar primer numero (mayor)"  
	Leer n1
	Escribir "Ingresar segundo numero(menor)"
	Leer n2 
	Repetir
	si n2 > 0 Entonces
		r= n1 MOD n2 
		n1=n2
		n2=r
	FinSi 
Hasta Que  n2=0
Escribir n1
FinAlgoritmo
