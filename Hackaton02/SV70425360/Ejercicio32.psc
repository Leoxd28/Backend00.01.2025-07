Proceso Ejercicio32
	//32. Se quiere saber cuál es la ciudad con la población de más personas, son tres provincias y once ciudades, hacer un algoritmo en Pseint que nos permita saber eso. 
	mayorPoblacion <- 0
	nombreCiudad <- ""
	
	Para i <- 1 Hasta 3
		Escribir "Provincia ", i
		Para j <- 1 Hasta 11
			Escribir "Ingrese nombre de ciudad ", j, ":"
			Leer ciudad
			Escribir "Ingrese su población:"
			Leer poblacion

			si poblacion > mayorPoblacion entonces
				mayorPoblacion <- poblacion
				nombreCiudad <- ciudad
			FinSi
		FinPara
	FinPara

	Escribir "La ciudad con más población es: ", nombreCiudad, " con ", mayorPoblacion, " habitantes."
FinProceso
