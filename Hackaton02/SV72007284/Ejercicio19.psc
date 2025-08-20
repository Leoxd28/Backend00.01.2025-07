Proceso Ejercicio19
//19. Hacer un algoritmo en Pseint para una heladería se tienen 4 tipos de empleados 
//ordenados de la siguiente forma con su número identificador y salario diario correspondiente:
    //Cajero (56$/día).
    //Servidor (64$/día).
    //Preparador de mezclas (80$/día).
    //Mantenimiento (48$/día).
    //El dueño de la tienda desea tener un programa donde sólo ingrese dos números enteros que 
	//representen al número identificador del empleado y la cantidad de días que trabajó en la 
	//semana (6 días máximos). Y el programa le mostrará por pantalla la cantidad de dinero que 
	//el dueño le debe pagar al empleado que ingresó
	
	Definir identificador, diasTrabajados Como Entero;
	Definir sueldoEmpleado Como Real;
	
	Escribir "Bienvenido a la tienda de helados Donofrio";
	Escribir "Este programa le permite calcular el sueldo de sus trabajadores";
	Escribir "Primero debe ingresar número identificador del empleado";
	Escribir "48.- Mantenimiento"
	Escribir "56.- Cajero"
	Escribir "64.- Servidor"
	Escribir "80.- Preparador de mezclas"
	
	Leer identificador;
	
	Segun identificador Hacer
		48:
			sueldoEmpleado = 48.0;
			Escribir "Identificador del empleado: Mantenimiento";
			Escribir Sin Saltar "Días trabajados: ";
			Leer diasTrabajados;
		56:
			sueldoEmpleado = 56.0;
			Escribir "Identificador del empleado: Cajero";
			Escribir Sin Saltar "Días trabajados: ";
			Leer diasTrabajados;
		64:
			sueldoEmpleado = 64.0;
			Escribir "Identificador del empleado: Servidor";
			Escribir Sin Saltar "Días trabajados: ";
			Leer diasTrabajados;
		80:
			sueldoEmpleado = 80.0;
			Escribir "Identificador del empleado: Preparador de mezclas";
			Escribir Sin Saltar "Días trabajados: ";
			Leer diasTrabajados;
		De Otro Modo:
			Escribir "El identificador no existe, vuelve a intentarlo";
	FinSegun
	
	Si diasTrabajados > 0 y diasTrabajados <= 6 Entonces
		sueldoEmpleado = sueldoEmpleado * diasTrabajados;
		
		Escribir "---------- Sueldo empleado ----------";
		Escribir "sueldo: " sueldoEmpleado;
	SiNo
		Escribir "Un trabajador no puede laburar más de seis días a la semana";
	FinSi
	
	
	
FinProceso
