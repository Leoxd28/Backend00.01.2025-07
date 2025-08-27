Proceso Ejercicio_07
//7. Hacer un algoritmo en Pseint para una tienda de helado que da un descuento por compra a sus clientes 
//con membresía dependiendo de su tipo, sólo existen tres tipos de membresía, tipo A, tipo B y tipo C.
	//Los descuentos son los siguientes:
	//Tipo A 10% de descuento 
	//Tipo B 15% de descuento
	//Tipo C 20% de descuento 

	Definir tipoMembresia Como Caracter
	Definir ImporteCompra, descuento, ImporteDescuento, ImporteTotal  Como Real
	
	Escribir "Ingresar su Tipo de Membresia: A, B o C"
	Leer tipoMembresia
	
	Escribir "Ingresar Importe Compra"
	Leer ImporteCompra
	
	descuento <- 0
	Segun tipoMembresia Hacer
		"A":
			descuento =  0.10 
		"B":
			descuento =  0.15 
		"C":
			descuento =  0.20 
		De Otro Modo:
			descuento =  0
			Escribir "No tiene descuento"
	Fin Segun
	
	ImporteDescuento = ImporteCompra * descuento
	ImporteTotal = ImporteCompra - ImporteDescuento
	
	Escribir "Importe de Compra sin Descuento es: " , ImporteCompra
	Escribir "Importe de Descuento es: " , ImporteDescuento	
	Escribir "Importe Total es: " , ImporteTotal	
FinProceso
