Proceso Ejercicio38
	//38. Hacer un algoritmo en Pseint que nos permita saber si un número es un número perfecto.
	Definir num, i, sumaDivisores Como Entero;
	
    Escribir "Ingrese un número: ";
    Leer num;
	
    sumaDivisores = 0;
	
    Para i = 1 Hasta num - 1 Con Paso 1 Hacer
        Si num MOD i = 0 Entonces
            sumaDivisores = sumaDivisores + i;
        FinSi
    FinPara
	
    Si sumaDivisores = num Entonces
        Escribir num, " es un número perfecto";
    Sino
        Escribir num, " no es un número perfecto";
    FinSi
FinProceso
