Proceso Ejercicio_31
	// 31. Hacer un algoritmo en Pseint parar calcular la media de los números pares e impares, sólo se ingresará diez números.
	
Definir numero1 , i, cantPares, sumaPares ,cantImpares, sumaImpares, mediaPar, mediaImpar Como Real
sumaPares <- 0
cantPares <- 0
sumaImpares <- 0
cantImpares <- 0

Para i=1   Hasta 10 Con Paso 1 Hacer
	Escribir "Ingresar el numero: ", i
	Leer numero1
	
	si numero1 MOD 2 = 0 Entonces
		sumaPares <- sumaPares +  numero1
		cantPares <- cantPares + 1
	SiNo
		sumaImpares <- sumaImpares + numero1
		cantImpares <- cantImpares +1
	FinSi
Fin Para

si cantPares > 0 Entonces
	mediaPar <- sumaPares/cantPares
SiNo
	mediaPar <- 0
FinSi

si cantImpares > 0 Entonces
	mediaImpar <- sumaImpares/cantImpares
SiNo
	mediaImpar <- 0
FinSi

si cantPares > 0 Entonces 
	Escribir "La media de los números pares es: ", mediaPar
SiNo
	Escribir "No se ingresaron numeros pares"
FinSi

si cantImpares > 0 Entonces 
	Escribir "La media de los números impares es: ", mediaImpar
SiNo
	Escribir "No se ingresaron numeros impares"
FinSi



FinProceso
