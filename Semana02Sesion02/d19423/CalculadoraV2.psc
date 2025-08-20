Proceso CalculadoraV2
	Escribir "Digita el primer numero"
	Leer primerNumero
	Escribir "Digita el segundo numero"
	Leer segundoNumero
	Escribir "Digita la operacion: 1 si es suma, 2 si es resta, 3 si es multiplicacion o 4 si es division"
	Leer operacion
	respuesta = 0
	Segun operacion Hacer
		1:
			respuesta = primerNumero  + segundoNumero
		2:
			respuesta = primerNumero  - segundoNumero
		3:
			respuesta = primerNumero  * segundoNumero
		4: 
			respuesta = primerNumero  / segundoNumero
		De Otro Modo:
			Escribir "La operacion no es valida"
	Fin Segun

	
	Escribir "La respuesta es: ", respuesta
	
FinProceso
