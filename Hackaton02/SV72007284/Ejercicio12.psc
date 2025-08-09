Proceso Ejercicio12
	//12. Hacer un algoritmo en Pseint que lea dos números y diga cuál es el mayor.
	Definir i, n1, n2 Como Entero;
	
	Escribir "Ingrese tres números";
	
	Para i <- 1 Hasta 2 Con Paso 1 Hacer
		
		Segun i Hacer
			1:
				Escribir Sin Saltar "Ingrese el número ", i, ": ";
				Leer n1;
			2:
				Escribir Sin Saltar "Ingrese el número ", i, ": ";
				Leer n2;
			De Otro Modo:
				Escribir "El algoritmo no soporta tres números"
		Fin Segun
	Fin Para
	
	Si n1 < n2 Entonces
		numeroMayor = n2;
		Escribir "----------- Número mayor ----------";
		Escribir "El número ", numeroMayor, " es el mayor";
	SiNo
		Si n2 < n1 Entonces
			numeroMayor = n1;
			Escribir "----------- Número mayor ----------";
			Escribir "El número ", numeroMayor, " es el mayor";
		SiNo
			Si n1 = n2 Entonces
				Escribir "Ambos números son iguales";
			FinSi
		FinSi
	FinSi
	
	
FinProceso
