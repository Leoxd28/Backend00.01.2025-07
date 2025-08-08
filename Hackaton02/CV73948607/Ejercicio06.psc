Algoritmo Ejercicio06
	//Hacer un algoritmo en Pseint para ayudar a un trabajador a saber cuál será su sueldo semanal, se sabe que si trabaja 40 horas o menos, se le pagará $20 por hora, pero si trabaja más de 40 horas entonces las horas extras se le pagarán a $25 por hora.
	Escribir "ingrese las horas trabajadas"
	Leer horas
	si horas<= 40 Entonces
		pag=20
	SiNo
		pag=25
	FinSi
	to=pag*horas
	
	Escribir "su sueldo semanal es " to
FinAlgoritmo
