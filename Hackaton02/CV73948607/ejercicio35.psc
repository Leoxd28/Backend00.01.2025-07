Algoritmo ejercicio21
	//     Hacer un algoritmo en Pseint que nos permita saber cuál es el número mayor y menor, se debe ingresar sólo veinte números.
	i=0
	mayo= 0
	meno = 99999999
	Repetir
		
		Escribir "Ingrese numero "
		Leer n 
		SI n>mayo Entonces
			mayo = n
		FinSi
		si n<meno Entonces
			meno = n
		FinSi
		i=i+1
	Hasta Que i=20
	Escribir mayo " es el numero mayor y " meno " es el numero menor"


FinAlgoritmo
