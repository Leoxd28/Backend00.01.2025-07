Proceso Ejercicio07
	//7. Hacer un algoritmo en Pseint para una tienda de helado que da un descuento por compra a sus clientes con membresía dependiendo de su tipo, sólo existen tres tipos de membresía, tipo A, tipo B y tipo C. Los descuentos son los siguientes:

   //Tipo A 10% de descuento
   //Tipo B 15% de descuento
   //Tipo C 20% de descuento
	
    Escribir "Ingrese tipo de membresía (A, B o C):"
	Leer tipo
	Escribir "Ingrese monto de la compra:"
	Leer monto

	si tipo = "A" entonces
		descuento <- 0.10
	sino
		si tipo = "B" entonces
			descuento <- 0.15
		sino
			si tipo = "C" entonces
				descuento <- 0.20
			sino
				descuento <- 0
			FinSi
		FinSi
	FinSi

	total <- monto - (monto * descuento)
	Escribir "Total con descuento: $", total
FinProceso
