Proceso Ejercicio40
	//40. Hacer un algoritmo en Pseint que cumpla con la aproximación del número pi con la serie de Nilakantha. La formula que se debe aplicar es:
    //Pi = = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - 4/(8*9*10) + 4/(10*11*12) - 4/(12*13*14) ...
	
	Definir n, i, signo, a Como Entero;
    Definir piAproximado, termino Como Real;
	
    Escribir "Ingrese la cantidad de términos para la aproximación de pi: ";
    Leer n;
	
    piAproximado = 3;
    signo = 1;
    a = 2;
	
    Para i = 1 Hasta n Con Paso 1 Hacer
        termino = 4 / (a * (a + 1) * (a + 2));
        piAproximado = piAproximado + signo * termino;
        signo = signo * (-1);
        a = a + 2;
    FinPara
	
    Escribir "Aproximación de pi usando la serie de Nilakantha con ", n, " términos: ", piAproximado;
	Escribir "Valor de PI: ", PI;
FinProceso
