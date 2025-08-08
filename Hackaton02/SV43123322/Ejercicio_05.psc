Proceso Ejercicio_05
	//5. Hacer un algoritmo en Pseint para una tienda de zapatos que tiene una promoción de descuento para vender al mayor, 
	//esta dependerá del número de zapatos que se compren. 
	//Si son más de diez, se les dará un 10% de descuento sobre el total de la compra; 
	//si el número de zapatos es mayor de veinte pero menor de treinta, se le otorga un 20% de descuento; 
	//y si son más treinta zapatos se otorgará un 40% de descuento. El precio de cada zapato es de $80.
	Definir numeroZapatos, precio Como Entero
	Definir descuento, totalCompra, importeDescuento, totalConDescuento  Como Real
	Leer numeroZapatos
	precio <- 80
	
	
	si numeroZapatos > 10 y numeroZapatos <= 20 Entonces
		descuento =  0.1
		Escribir "Descuento de 10%"
	SiNo
		si numeroZapatos > 20 y numeroZapatos <= 30 Entonces
			descuento = 0.2 
			Escribir "Descuento de 20%"
		SiNo
			si numeroZapatos > 30 Entonces
				descuento = 0.4 
				Escribir "Descuento de 40%"
			SiNo
				Escribir "No tiene descuento"
			FinSi
		FinSi
	FinSi
	
	totalCompra = numeroZapatos*precio
	importeDescuento = totalCompra * descuento
	totalConDescuento = totalCompra - importeDescuento
 
	Escribir "Importe Compra Total sin Descuento es: " totalCompra
	Escribir "Importe Descuento es: " importeDescuento
	Escribir "Importe Final Aplicado Descuento es: " totalConDescuento
	
FinProceso
