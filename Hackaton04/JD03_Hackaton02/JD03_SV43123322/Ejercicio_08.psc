Proceso Ejercicio_08
	//8. Hacer un algoritmo en Pseint para calcular el promedio de tres notas y determinar 
	//si el estudiante aprobó o no.
	
	Definir nota1, nota2, nota3, sumaNotas , Promedio Como Real
 
	
	Escribir "Ingresar las 3 notas"
	Leer nota1, nota2, nota3
	Promedio <- 0
	
	sumaNotas = nota1 + nota2 + nota3
	Promedio = sumaNotas/3
	
	Escribir "El promedio de nota es: ", Promedio
	
	si Promedio >= 11 Entonces
		Escribir "Estudiante APROBADO"
	SiNo
		Escribir "Estudiante DESAPROBADO"
	FinSi
	

	
FinProceso
