Proceso Ejercicio13
	//13. Hacer un algoritmo en Pseint que lea una letra y diga si es una vocal.
	Definir letra, vocal Como Cadena;
	
	Escribir Sin Saltar "Ingrese una letra: ";
	
	Repetir
		Leer letra;
		Si Longitud(letra) <> 1 Entonces
			Escribir "Ingresa solo una letra para determinar si es vocal";
		FinSi
	Hasta Que Longitud(letra) = 1
	
	Si letra = Minusculas(letra) Entonces
		letra = Mayusculas(letra)
	FinSi
	
	Si letra = "A" o letra = "E" o letra = "I" o letra = "O" o letra = "U" Entonces
		Escribir "---------- Resultado ----------";
		Escribir "Es una vocal";
	SiNo
		Escribir "---------- Resultado ----------";
		Escribir "No es una vocal";
	FinSi
	
FinProceso
