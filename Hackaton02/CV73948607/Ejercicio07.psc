Algoritmo Ejercicio07
//Hacer un algoritmo en Pseint para una tienda de helado que da un descuento por compra a sus clientes con membresía dependiendo de su tipo, sólo existen tres tipos de membresía, tipo A, tipo B y tipo C. Los descuentos son los siguientes:
	//Tipo A 10% de descuento
	//Tipo B 15% de descuento
	//Tipo C 20% de descuento
	Escribir "Ingresar su membresia A. B. C."
	Leer memb
	memb = Mayusculas(memb)
	segun memb Hacer
		"A" : desc <- 10
		"B" : desc <- 15
	    "C" : desc <- 20
	FinSegun
	Escribir "Su descuento es del " desc " porciento"
FinAlgoritmo
