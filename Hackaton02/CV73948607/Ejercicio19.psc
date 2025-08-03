Algoritmo Ejercicio19
//Hacer un algoritmo en Pseint para una heladería se tienen 4 tipos de empleados ordenados de la siguiente forma con su número identificador y salario diario correspondiente:
				
//Cajero (56$/día).
				
//Servidor (64$/día).
				
//Preparador de mezclas (80$/día).
	
//Mantenimiento (48$/día).
				
//El dueño de la tienda desea tener un programa donde sólo ingrese dos números enteros que representen al número identificador del empleado y la cantidad de días que trabajó en la semana (6 días máximos). Y el programa le mostrará por pantalla la cantidad de dinero que el dueño le debe pagar al empleado que ingresó
	Repetir
	 
	Escribir "Ingresar numero 1.CAJERO 2.SERVIDOR 3.PREPARADOR DE MEZCLAS 4.MATENIMIENTO"
	Leer num
	Escribir"ingresar dias "
	Leer dias
	si num>4 o num <1 o dias>7
 		Escribir "Las opciones estan del 1 a 4 y verifique que lsod dias no pasen de 6"
	FinSi
Hasta Que dias<7 y num<7 y num>0
Segun num Hacer
	1:suel= 56
	2:suel= 64
	3:suel=	80
	4:suel=48
FinSegun
tota=suel*dias
Escribir "se le debe de hacer paga de " tota
FinAlgoritmo

