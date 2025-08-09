Proceso Ejercicio_32
	// 32. Se quiere saber cuál es la ciudad con la población de más personas, son tres provincias y once ciudades, 
	// hacer un algoritmo en Pseint que nos permita saber eso. 	
	
	Definir nombreCiudad, ciudadMayor Como Cadena
	Definir poblacion, mayorPoblacion Como Entero
	Definir i Como Entero
	
	mayorPoblacion <- -1  // Inicializa con un valor imposible
	ciudadMayor <- ""
	
	Para i <- 1 Hasta 11 Hacer
		Escribir "Ingrese el nombre de la ciudad ", i 
		Leer nombreCiudad
		
		Escribir "Ingrese la población de la ciudad ", nombreCiudad, ":"
		Leer poblacionPersonas
		
		Si poblacionPersonas > mayorPoblacion Entonces
			mayorPoblacion <- poblacionPersonas
			ciudadMayor <- nombreCiudad
		FinSi
	FinPara
	
	Escribir "La ciudad con mayor población es: ", ciudadMayor
	Escribir "Con una población de: ", mayorPoblacion
 

FinProceso
