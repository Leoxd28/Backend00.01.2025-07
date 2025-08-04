Proceso Ejercicio_19
// 19. Hacer un algoritmo en Pseint para una heladería se tienen 4 tipos de empleados ordenados de 
// la siguiente forma con su número identificador y salario diario correspondiente:
		
	// Cajero (56$/día).
	// Servidor (64$/día).
	// Preparador de mezclas (80$/día).
	// Mantenimiento (48$/día).
	
	// El dueño de la tienda desea tener un programa donde sólo ingrese dos números enteros que representen 
	//al número identificador del empleado y la cantidad de días que trabajó en la semana (6 días máximos). 
	//Y el programa le mostrará por pantalla la cantidad de dinero que el dueño le debe pagar al empleado que ingresó
	
	Definir tipoEmpleado, cantidadDias , tarifaDia Como Entero
	Definir  importePagar Como Real
	
	Escribir "Ingresar tipo de empleado 1 es Cajero, 2 es Servidor, 3 es Preparador y 4 es Mantenimiento"
	Leer tipoEmpleado 
	
	Escribir "Ingresar cantidad de días que trabajo"
	Leer   cantidadDias
	
	
	Segun tipoEmpleado Hacer
		1:
			tarifaDia <- 56
		2:
			tarifaDia <- 64
		3:
			tarifaDia <- 80
		4:
			tarifaDia <- 48
		De Otro Modo:
			Escribir "No existe tipo de empleado"
	Fin Segun
	
	si cantidadDias <= 6 Entonces
		importePagar <- cantidadDias * tarifaDia
		
	SiNo si cantidadDias > 6 Entonces 
		Escribir "La numero de días trabajados no es valido"
		FinSi	
	FinSi
	
	Escribir  "El importe a pagar al empleado es: " importePagar
	
FinProceso
