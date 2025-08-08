Proceso Ejercicio17
	//17. Hacer un algoritmo en Pseint donde se ingrese una hora y nos calcule la hora dentro de un segundo.
	
	Escribir "Ingrese hora, minutos y segundos:"
	Leer h, m, s

	s <- s + 1

	si s = 60 entonces
		s <- 0
		m <- m + 1
	FinSi

	si m = 60 entonces
		m <- 0
		h <- h + 1
	FinSi

	si h = 24 entonces
		h <- 0
	FinSi

	Escribir "Hora actual + 1 segundo: ", h, ":", m, ":", s
FinProceso
