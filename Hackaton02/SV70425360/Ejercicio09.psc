Proceso Ejercicio09
	//9. Hacer un algoritmo en Pseint para determinar el aumento de un trabajador, se debe tomar en cuenta que si ganaba más de $2000 tendrá un aumento del 5%, si generaba menos de $2000 su aumento será de un 10%.

	
    Escribir "Ingrese el sueldo actual:"
	Leer sueldo

	si sueldo > 2000 entonces
		aumento <- sueldo * 0.05
	sino
		aumento <- sueldo * 0.10
	FinSi

	nuevoSueldo <- sueldo + aumento
	Escribir "Nuevo sueldo: $", nuevoSueldo
FinProceso
