Proceso Ejercicio_09
	// 9. Hacer un algoritmo en Pseint para determinar el aumento de un trabajador, 
	// se debe tomar en cuenta que si ganaba más de $2000 tendrá un aumento del 5%, 
	// si generaba menos de $2000 su aumento será de un 10%.
	Definir sueldoActual , aumento, ImporteAumento, sueldoFinal Como Real
	
	Escribir "Ingresar Sueldo Actual"
	Leer sueldoActual
	
	si sueldoActual > 2000 Entonces
		aumento <- 0.05
		Escribir "Le corresponde 5% de aumento"
	SiNo
		aumento <- 0.1
		Escribir "Le corresponde 10% de aumento"
	FinSi
	
	ImporteAumento = sueldoActual*aumento
	sueldoFinal = sueldoActual + ImporteAumento
	
	Escribir "Su aumento es: ", ImporteAumento
	Escribir "El sueldo final es: ", sueldoFinal
	
FinProceso
