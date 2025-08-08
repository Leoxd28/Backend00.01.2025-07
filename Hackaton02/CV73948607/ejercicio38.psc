Algoritmo ejercicio21
	//   Hacer un algoritmo en Pseint que nos permita saber si un número es un número perfecto.
	Escribir "Ingresar numero "  
	Leer n1
	i=1
	nume=0
	mientras i<n1 Hacer
		si n1 MOD i =0
			nume=i+nume
		FinSi
		i=i+1
	FinMientras
	si nume = n1 Entonces
		escribir"es numero perefecto"
	FinSi
FinAlgoritmo
