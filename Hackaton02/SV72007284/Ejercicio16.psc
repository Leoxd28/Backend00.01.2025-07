Proceso Ejercicio16
	//16. Hacer un algoritmo en Pseint que lea un número y según ese número, indique el día que corresponde.
	Definir num Como Entero;
	
	Escribir "Ingresa un número entre 1 - 7";
	Escribir "Dependiendo del número se sabra el día que corresponde";
	Leer num;
	
	Segun num Hacer
		1:
			Escribir "Lunes";
		2:
			Escribir "Martes";
		3:
			Escribir "Miercoles";
		4:
			Escribir "Jueves";
		5:
			Escribir "Viernes";
		6:
			Escribir "Sabado";
		7:
			Escribir "Domingo";
		De Otro Modo:
			Escribir "Una semana solo tiene siete días, vuelve a intentarlo";
	Fin Segun
FinProceso
