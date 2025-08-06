Proceso Ejercicio10
	//10. Hacer un algoritmo en Pseint que diga si un número es par o impar.
	Definir num Como Entero;
	Definir estado Como Caracter;
	
	Escribir Sin Saltar "Ingrese un número: ";
	Leer num;
	
	formula = num % 2;
	
	Si formula = 0 Entonces
		estado = "El número es PAR";
	SiNo
		estado = "El número es IMPAR";
	FinSi
	
	Escribir "---------- Resultado ----------";
	Escribir "Número: ", num;
	Escribir "Residuo: ", (num % 2);
	Escribir "-------------------------------";
	Escribir estado;
FinProceso
