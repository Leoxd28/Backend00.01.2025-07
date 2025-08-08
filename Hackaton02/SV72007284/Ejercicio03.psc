Proceso Ejercicio03
	//3. Hacer un algoritmo en Pseint que lea un número y determinar si termina en 4.
	Definir num Como Entero;
	Definir continuar Como Caracter;
	
	Repetir
		Escribir Sin Saltar "Ingresa un número: ";
		Leer num;
		Si num % 10 = 4 Entonces
			Escribir "Resultado: ", (num % 10);
			Escribir "El número termina en 4";
		SiNo
			Escribir "Resultado: ", (num % 10);
			Escribir "El número NO termina en 4";
		FinSi
		Escribir Sin Saltar "¿Volver a intentar? ";
		Leer continuar;
		Mientras continuar <> "si" Y continuar <> "SI" Y continuar <> "no" Y continuar <> "NO" Hacer
			Escribir "Digita correctamente si/no";
		 	Escribir Sin Saltar "¿Volver a intertar? ";
			Leer continuar;
		Fin Mientras
	Hasta Que continuar = "no" O continuar = "NO";
	
	
FinProceso
