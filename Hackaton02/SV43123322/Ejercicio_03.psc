Proceso Ejercicio_03
	//3. Hacer un algoritmo en Pseint que lea un n�mero y determinar si termina en 4.
	Definir Numero1 Como Entero
	Escribir "Ingresar un numero"
	Leer Numero1
	ultimoDigito =   Numero1-  (trunc(Numero1/10)*10)
	
	Si ultimoDigito = 4 Entonces 
		    Escribir "El ultimo digito del numero es " ultimoDigito
			Escribir "Por lo tanto numero ingresado SI termina en 4"
		Sino
			Escribir "El ultimo digito del numero es " ultimoDigito
			Escribir "Por lo tanto numero ingresado  NO termina en 4"
	FinSi
	
	
	
 
 
	
FinProceso


// division_entera <- Trunc(numero / 10)
// ultimo_digito <- Abs(numero) - (division_entera * 10)
// SV43123322 - Jhosep Denis Cueva Milla