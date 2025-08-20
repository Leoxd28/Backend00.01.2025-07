Proceso CalculadoraV4
	
	bandera = Verdadero
	
	Mientras bandera Hacer
		Escribir "Digita la operacion: 1 si es suma, 2 si es resta, 3 si es multiplicacion, 4 si es division"
		Leer operacion
		
		Escribir "Digita el primer numero"
		Leer primerNumero
		Escribir "Digita el segundo numero"
		Leer segundoNumero
		
		si operacion = 4 y segundoNumero = 0 Entonces
			Escribir "La division para 0 es indefinida"
		SiNo
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
		FinSi
		Escribir "Deseas salir digita 0"
		Leer salir
		si salir= 0 Entonces
			bandera = Falso
		FinSi
		
	Fin Mientras
	
FinProceso
