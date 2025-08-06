Proceso Ejercicio08
	//8. Hacer un algoritmo en Pseint para calcular el promedio de tres notas y determinar si el estudiante aprobó o no.
	Definir i, n1, n2, n3 Como Entero;
	Definir promedio Como Real;
	Definir estado Como Caracter;
	
	Escribir "Calcular el promedio de tres notas";
	Para i <- 1 Hasta 3 Con Paso 1 Hacer
		Segun i Hacer
			1:
				Escribir Sin Saltar "Ingresa la nota ", i, ": ";
				Leer n1;
			2:
				Escribir Sin Saltar "Ingresa la nota ", i, ": ";
				Leer n2;
			3:
				Escribir Sin Saltar "Ingresa la nota ", i, ": ";
				Leer n3;
			De Otro Modo:
				Escribir Sin Saltar "Error, el algoritmo no esta preparado para más de 3 notas";
		Fin Segun
	Fin Para
	
	promedio = (n1 + n2 + n3) / 3;
	Si promedio <= 11 Entonces
		estado = "No aprobó";
	SiNo
		Si promedio >= 12 Entonces
			estado = "Aprobó";
		SiNo
			estado = "No se pudo calcular el promedio, debido a que se ingreso una o más notas incorrectamente";
		FinSi
	FinSi
	Escribir "---------- Promedio final ----------";
	Escribir "Promedio: ", promedio;
	Escribir "Estado: ", estado;
FinProceso
