Proceso Ejercicio25
	//25. Hacer un algoritmo en Pseint para calcular el factorial de un número de una forma distinta.
	Definir num, factorial, i Como Entero;
	
	factorial = 1;
	i = 1;
	
    Escribir Sin Saltar "Ingrese un número: ";
    Leer num;
	
    Si num < 0 Entonces
        Escribir "El número debe ser positivo."
    Sino
        
        Mientras i <= num Hacer
            factorial = factorial * i;
			Escribir factorial;
            i = i + 1;
        FinMientras
		
        Escribir "El factorial de ", num, " es: ", factorial
    FinSi
FinProceso
