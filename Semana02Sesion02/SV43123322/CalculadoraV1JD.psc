Proceso CalculadoraV1
	Escribir "Digite el primer numero"
	Leer primerNumero
	Escribir "Digite el segudo numero"	
	Leer segundoNumero
	Escribir "Digita la operación: 1 si es una suma, 2 si es resta , 3 si es multiplicacion o 4 si es division ", primerNumero+segundoNumero
	Leer operacion
	respuesta = 0
	
	SI operacion=1 Entonces
		respuesta = primerNumero + segundoNumero
	SiNo
			SI operacion = 2 Entonces 
			respuesta = primerNumero - segundoNumero
					SiNo
							SI operacion = 3 Entonces 
								respuesta = primerNumero * segundoNumero
								SiNo

									SI operacion = 4 Entonces 
										respuesta = primerNumero / segundoNumero
									Sino Escribir "La operacion no es valida"
							FinSi
					FinSi
			FinSi
    FinSi
	Escribir "La respuesta es: ", respuesta
	
FinProceso
