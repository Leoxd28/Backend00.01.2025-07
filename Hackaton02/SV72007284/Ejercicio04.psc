Proceso Ejercicio04
	//4. Hacer un algoritmo en Pseint que lea tres números enteros y los muestre de menor a mayor.
	Definir i, n1, n2, n3, num Como Entero;
	
	Para i <- 1 Hasta 3 Con Paso 1 Hacer
		
		Escribir Sin Saltar i, " número entero: ";
		Leer num;
		
		Segun i Hacer
			1: 
				n1 = num;
			2: 
				n2 = num;
			3: 
				n3 = num;
			De Otro Modo:
				Escribir "Solo se permite el ingreso de tres números enteros";
		FinSegun
	Fin Para
	
	Si n1 < n2 y n2 < n3 Entonces
		Escribir "Ordenamiento ascendente: ";
		Escribir n1, " - ", n2, " - ", n3;
	SiNo
		Si n2 < n1 y n1 < n3 Entonces
			Escribir "Ordenamiento ascendente: ";
			Escribir n2, " - ", n1, " - ", n3;
		SiNo
			Si n3 < n1 y n1 < n2 Entonces
				Escribir "Ordenamiento ascendente: ";
				Escribir n3, " - ", n1, " - ", n2;
			SiNo
				Si n1 < n3 y n3 < n2 Entonces
					Escribir "Ordenamiento ascendente: ";
					Escribir n1, " - ", n3, " - ", n2;
				SiNo
					Si n2 < n3 y n3 < n1 Entonces
						Escribir "Ordenamiento ascendente: ";
						Escribir n2, " - ", n3, " - ", n1;
					SiNo
						Si n3 < n2 y n2 < n1 Entonces
							Escribir "Ordenamiento ascendente: ";
							Escribir n3, " - ", n2, " - ", n1;
						FinSi
					FinSi
				FinSi
			FinSi
		FinSi
	FinSi
	
FinProceso
