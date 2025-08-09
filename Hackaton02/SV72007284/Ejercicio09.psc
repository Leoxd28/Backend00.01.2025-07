Proceso Ejercicio09
	//9. Hacer un algoritmo en Pseint para determinar el aumento de un trabajador, 
	//se debe tomar en cuenta que si ganaba más de $2000 tendrá un aumento del 5%, 
	//si generaba menos de $2000 su aumento será de un 10%.
	Definir sueldo, aumento Como Real;
	
	Escribir "Sueldo generado: ";
	Leer sueldo;
	
	Si sueldo < 2000 Entonces
		aumento = sueldo * 0.1;
		sueldo = sueldo + aumento;
	SiNo
		aumento = sueldo * 0.05;
		sueldo = sueldo + aumento;
	FinSi
	
	Escribir "---------- Sueldo final ----------";
	Escribir "Aumento: S/", aumento;
	Escribir "Sueldo: S/", sueldo;
FinProceso
