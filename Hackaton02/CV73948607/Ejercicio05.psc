Algoritmo Ejercicio05
	// Hacer un algoritmo en Pseint para una tienda de zapatos que tiene una promoción de descuento para vender al mayor, esta dependerá del número de zapatos que se compren. Si son más de diez, se les dará un 10 MOD  de descuento sobre el total de la compra; si el número de zapatos es mayor de veinte pero menor de treinta, se le otorga un 20 MOD  de descuento; y si son más treinta zapatos se otorgará un 40 MOD  de descuento. El precio de cada zapato es de $80.
	Escribir 'ingrese numero de zapatos'
	Leer cant
 si cant<10
		desc <- 1
	sino
		si cant>10
			desc <- 0.10
		SiNo
			si cant>20 Y cant <30
			desc <- 0.20
			sino
				desc <- 0.40
		    FinSi
			
		FinSi
	FinSi
	
	topar <- cant*80
	todesc = topar*desc
	total <- topar-topar*desc
	Escribir 'total parcial ', topar
	Escribir 'Descuento ', todesc
	Escribir 'total final ', total
FinAlgoritmo
