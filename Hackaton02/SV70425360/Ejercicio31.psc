Proceso Ejercicio31
	//31. Hacer un algoritmo en Pseint parar calcular la media de los números pares e impares, sólo se ingresará diez números.
	pares <- 0
	sumaPares <- 0
	impares <- 0
	sumaImpares <- 0

	Para i <- 1 Hasta 10 Con Paso 1
		Escribir "Ingrese el número ", i, ":"
		Leer num
		si num MOD 2 = 0 entonces
			pares <- pares + 1
			sumaPares <- sumaPares + num
		sino
			impares <- impares + 1
			sumaImpares <- sumaImpares + num
		FinSi
	FinPara

	si pares > 0 entonces
		mediaPares <- sumaPares / pares
	sino
		mediaPares <- 0
	FinSi

	si impares > 0 entonces
		mediaImpares <- sumaImpares / impares
	sino
		mediaImpares <- 0
	FinSi

	Escribir "Media de pares: ", mediaPares
	Escribir "Media de impares: ", mediaImpares
FinProceso
