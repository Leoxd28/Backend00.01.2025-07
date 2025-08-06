Proceso Ejercicio26
	//26. Hacer un algoritmo en Pseint para calcular el resto y cociente por medio de restas sucesivas.
	Definir dividendo, divisor, cociente, resto Como Entero;
	
    Escribir Sin Saltar "Ingrese el dividendo: ";
    Leer dividendo;
    Escribir Sin Saltar "Ingrese el divisor: ";
    Leer divisor;
	
	cociente = 0;
	resto = dividendo;
	
    Si divisor = 0 Entonces
        Escribir "No se puede dividir entre cero";
    Sino
        Mientras resto >= divisor Hacer
            resto = resto - divisor;
            cociente = cociente + 1;
        FinMientras
		
        Escribir "Cociente: ", cociente;
        Escribir "Resto: ", resto;
    FinSi
FinProceso
