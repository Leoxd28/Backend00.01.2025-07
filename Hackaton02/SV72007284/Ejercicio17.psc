Proceso Ejercicio17
//17. Hacer un algoritmo en Pseint donde se ingrese una hora y nos calcule la hora dentro de un segundo.
	Definir horas, minutos, segundos Como Entero
	
	Escribir "Calcular la hora dentro de un segundo";
    Escribir "Horas (0 - 23): " Sin Saltar;
    Leer horas;
    Escribir "Minutos (0 - 59): " Sin Saltar;
    Leer minutos;
    Escribir "Segundos (0 - 59): " Sin Saltar;
    Leer segundos;
	
    segundos = segundos + 1;
	
    Si segundos = 60 Entonces
        segundos = 0;
        minutos = minutos + 1;
    FinSi
	
    Si minutos = 60 Entonces
        minutos = 0;
        horas = horas + 1;
    FinSi
	
    Si horas = 24 Entonces
        horas = 0;
    FinSi
	
	Escribir "---------- Resultado ----------";
    Escribir "La hora dentro de un segundo es: ", horas, ":", minutos, ":", segundos;
	
FinProceso
