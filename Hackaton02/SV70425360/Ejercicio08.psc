Proceso Ejercicio08
	//8. Hacer un algoritmo en Pseint para calcular el promedio de tres notas y determinar si el estudiante aprobó o no.
	
    Escribir "Ingrese tres notas:"
	Leer n1, n2, n3
	promedio <- (n1 + n2 + n3) / 3
	Escribir "Promedio: ", promedio
	si promedio >= 10.5 entonces
		Escribir "El estudiante aprobó."
	sino
		Escribir "El estudiante no aprobó."
	FinSi
FinProceso
