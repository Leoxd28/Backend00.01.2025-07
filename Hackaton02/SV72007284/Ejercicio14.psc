Proceso Ejercicio14
	//14. Hacer un algoritmo en Pseint que lea un entero positivo del 1 al diez y 
	//al 9 y determine si es un número primo.
	Definir i, contador, num Como Entero;
	
	enteroNegatico = -1;
	
	Escribir Sin Saltar "Ingrese un número entero positivo: ";
	
	
	Repetir
		Leer num;
		Si num <= enteroNegatico Entonces
			Escribir "El número es entero negativo, vuelve a intentarlo";
		FinSi
	Hasta Que num > enteroNegatico;
	
	Para i <- 1 Hasta num Con Paso 1 Hacer
		Si num MOD i = 0 Entonces
			contador = contador + 1;
		FinSi
	Fin Para
	
	Si contador = 2 Entonces
		resultado = "Es PRIMO";
	SiNo
		resultado = "No es PRIMO";
	FinSi
	
	Si num <= 10 Entonces
		Escribir "---------- Resultado ----------";
		Escribir "Número ingresado: ", num;
		Escribir resultado;
	SiNo
		Escribir "El número no debe exceder de 10";
	FinSi
	
FinProceso
