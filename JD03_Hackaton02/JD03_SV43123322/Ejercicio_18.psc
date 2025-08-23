Proceso Ejercicio_18
	// 18. Hacer un algoritmo en Pseint para una empresa se encarga de la venta y distribución de CD vírgenes.
	//Los clientes pueden adquirir los artículos (supongamos un único producto de una única marca) por cantidad.
	// Los precios son:
	
	//  $10. Si se compran unidades separadas hasta 9.
	//   $8. Si se compran entre 10 unidades hasta 99.
	//  $7. Entre 100 y 499 unidades.
	//  $6. Para mas de 500 unidades.
	
	// La ganancia para el vendedor es de 8,25 % de la venta. Realizar un algoritmo en Pseint que dado un número de 
	// CDs a vender , calcule el precio total para el cliente y la ganancia para el vendedor.
	
	
	Definir    precioTotalCliente, gananciaVendedor, precioProducto Como Real
	Definir  cantidad Como Entero 
	
	Escribir "Ingresar cantidad a adquirir del producto"
	Leer cantidad 
	 
	si cantidad <= 9 Entonces
		precioProducto <- 10
	SiNo
		si cantidad >= 10 y cantidad <= 99 Entonces
			precioProducto <- 8
		SiNo
			si cantidad >= 100 y cantidad <= 499 Entonces
				precioProducto <- 7
			SiNo
				si cantidad >= 500 Entonces
					precioProducto <- 6
				SiNo
					Escribir "Cliente no adquiere ningun producto"
				FinSi
			FinSi
		FinSi
	FinSi
	
	precioTotalCliente = cantidad * precioProducto
	gananciaVendedor = 8.25/100 * precioTotalCliente
	
	
	Escribir "La precio total del cliente es: " precioTotalCliente
	Escribir "La ganancia del venededor es: " gananciaVendedor
FinProceso
