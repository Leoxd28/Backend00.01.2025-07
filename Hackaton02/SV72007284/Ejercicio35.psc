Proceso Ejercicio35
	//35. Hacer un algoritmo en Pseint que nos permita saber cuál es el número mayor y menor, se debe ingresar sólo veinte números.
	Definir i, num, numMayor, numMenor Como Entero;
	
    Escribir "Ingrese número 1: ";
    Leer num;
	
    numMayor = num;
    numMenor = num;
	
    Para i = 2 Hasta 20 Con Paso 1 Hacer
        Escribir "Ingrese número ", i, ": ";
        Leer num;
		
        Si num > numMayor Entonces
            numMayor = num;
        FinSi
		
        Si num < numMenor Entonces
            numMenor = num;
        FinSi
    FinPara
	
    Escribir "El número mayor es: ", numMayor;
    Escribir "El número menor es: ", numMenor;
FinProceso
