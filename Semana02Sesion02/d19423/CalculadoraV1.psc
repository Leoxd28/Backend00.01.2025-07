Proceso CalculadoraV1
	Escribir "Digita el primer numero"
	Leer primerNumero
	Escribir "Digita el segundo numero"
	Leer segundoNumero
	Escribir "Digita la operacion: 1 si es suma, 2 si es resta, 3 si es multiplicacion o 4 si es division"
	Leer operacion
	respuesta = 0
	si operacion = 1 Entonces
		respuesta = primerNumero  + segundoNumero
	SiNo
		si operacion = 2 Entonces
			respuesta = primerNumero - segundoNumero
		SiNo
			si operacion = 3 Entonces
				respuesta = primerNumero * segundoNumero
			SiNo
				si operacion = 4 Entonces
					respuesta = primerNumero / segundoNumero
				SiNo
					Escribir "La operacion no es valida"
				FinSi
			FinSi
		FinSi
	FinSi
	
	Escribir "La respuesta es: ", respuesta
	
FinProceso
