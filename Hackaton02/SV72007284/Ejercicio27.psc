Proceso Ejercicio27
	//27. Hacer un algoritmo en Pseint para determinar la media de una lista indefinida 
	//de números positivos, se debe acabar el programa al ingresar un número negativo.
	Definir num, suma, contador Como Real;
	
    suma = 0;
    contador = 0;
	
    Escribir "Calcular la media de números positivos";
	Escribir "Ingrese un número negativo para termina";
	
    Repetir
        Escribir Sin Saltar "Número: ";
        Leer num;
		
        Si num >= 0 Entonces
            suma = suma + num;
            contador = contador + 1;
        FinSi
		
    Hasta Que num < 0;
	
    Si contador > 0 Entonces
        Escribir "La media es: ", suma / contador;
    Sino
        Escribir "No se ingresaron números positivos";
    FinSi
FinProceso
