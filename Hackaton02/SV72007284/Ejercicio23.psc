Proceso Ejercicio23
	//23. Hacer un algoritmo en Pseint para calcular la suma de los números impares menores o iguales a n.
	Definir num, i, suma Como Entero;
	
    suma = 0;
	
    Escribir Sin Saltar "Ingrese un número: ";
    Leer num;
	
    Para i <- 1 Hasta num Con Paso 1 Hacer
        Si i MOD 2 <> 0 Entonces
            suma = suma + i;
			Escribir suma;
        FinSi
    FinPara
	
    Escribir "La suma de los números impares menores o iguales a ", num, " es: ", suma;
FinProceso
