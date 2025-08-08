Proceso Ejercicio06
	//6. Hacer un algoritmo en Pseint para ayudar a un trabajador a saber cuál será su sueldo semanal, 
    se sabe que si trabaja 40 horas o menos, se le pagará $20 por hora, pero si trabaja más de 40 horas entonces las 
    horas extras se le pagarán a $25 por hora.
	
    Escribir "Ingrese horas trabajadas en la semana:"
	Leer horas
	si horas <= 40 entonces
		sueldo <- horas * 20
	sino
		extras <- horas - 40
		sueldo <- (40 * 20) + (extras * 25)
	FinSi
	Escribir "Sueldo semanal: $", sueldo
FinProceso
