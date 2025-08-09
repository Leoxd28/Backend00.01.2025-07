Proceso Ejercicio05
	//5. Hacer un algoritmo en Pseint para una tienda de zapatos que tiene una promoción de descuento para vender al mayor, 
    esta dependerá del número de zapatos que se compren. Si son más de diez, se les dará un 10% de descuento sobre el total de 
    la compra; si el número de zapatos es mayor de veinte pero menor de treinta, se le otorga un 20% de descuento; y si son más 
    treinta zapatos se otorgará un 40% de descuento. El precio de cada zapato es de $80.
	
    Escribir "Ingrese cantidad de zapatos:"
	Leer cantidad
	precioZapato <- 80
	subtotal <- cantidad * precioZapato

	si cantidad > 30 entonces
		descuento <- 0.40
	sino
		si cantidad > 20 entonces
			descuento <- 0.20
		sino
			si cantidad > 10 entonces
				descuento <- 0.10
			sino
				descuento <- 0
			FinSi
		FinSi
	FinSi

	total <- subtotal - (subtotal * descuento)
	Escribir "Total a pagar: $", total
FinProceso
