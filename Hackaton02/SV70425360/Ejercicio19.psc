Proceso Ejercicio19
	
	Escribir "Ingrese tipo de empleado (1-Cajero, 2-Servidor, 3-Preparador, 4-Mantenimiento):"
	Leer tipo
	Escribir "Ingrese días trabajados (máx 6):"
	Leer dias

	si tipo = 1 entonces
		pago <- 56
	sino
		si tipo = 2 entonces
			pago <- 64
		sino
			si tipo = 3 entonces
				pago <- 80
			sino
				si tipo = 4 entonces
					pago <- 48
				sino
					Escribir "Tipo inválido."
					pago <- 0
				FinSi
			FinSi
		FinSi
	FinSi

	total <- pago * dias
	Escribir "Sueldo semanal: $", total
FinProceso
