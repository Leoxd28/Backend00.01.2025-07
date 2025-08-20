Proceso Ejercicio11
	//11. Hacer un algoritmo en Pseint que lea tres números y diga cuál es el mayor.
	Definir i, n1, n2, n3 Como Entero;
	
	Escribir "Ingrese tres números";
	
	Para i <- 1 Hasta 3 Con Paso 1 Hacer
		
		Segun i Hacer
			1:
				Escribir Sin Saltar "Ingrese el número ", i, ": ";
				Leer n1;
			2:
				Escribir Sin Saltar "Ingrese el número ", i, ": ";
				Leer n2;
			3:
				Escribir Sin Saltar "Ingrese el número ", i, ": ";
				Leer n3;
			De Otro Modo:
				Escribir "El algoritmo no soporta cuatro números"
		Fin Segun
	Fin Para
	
	Si n1 < n2 y n2 < n3 Entonces
		numeroMayor = n3;
	SiNo
		Si n2 < n1 y n1 < n3 Entonces
			numeroMayor = n3;
		SiNo
			Si n3 < n1 y n1 < n2 Entonces
				numeroMayor = n2;
			SiNo
				Si n1 < n3 y n3 < n2 Entonces
					numeroMayor = n2;
				SiNo
					Si n3 < n2 y n2 < n1 Entonces
						numeroMayor = n1;
					SiNo
						Si n2 < n3 y n3 < n1 Entonces
							numeroMayor = n1;
						FinSi
					FinSi
				FinSi
			FinSi
		FinSi
	FinSi
	
	Escribir "----------- Número mayor ----------";
	Escribir "El número ", numeroMayor, " es el mayor de todos";
FinProceso
