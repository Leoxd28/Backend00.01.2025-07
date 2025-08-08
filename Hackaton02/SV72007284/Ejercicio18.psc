Proceso Ejercicio18
	//18. Hacer un algoritmo en Pseint para una empresa se encarga de la venta y 
	//distribución de CD vírgenes. Los clientes pueden adquirir los artículos 
	//(supongamos un único producto de una única marca) por cantidad. Los precios son:
	
    //$10. Si se compran unidades separadas hasta 9.
	//$8. Si se compran entre 10 unidades hasta 99.
	//$7. Entre 100 y 499 unidades.
	//$6. Para mas de 500 unidades.
	
	//La ganancia para el vendedor es de 8,25 % de la venta. Realizar un algoritmo en Pseint 
	//que dado un número de CDs a vender calcule el precio total para el cliente y la ganancia 
	//para el vendedor.
	
	Definir cantidad Como Entero;
	Definir precio, ganancia, totalCliente Como Real;
	
	marca = "CD Plast";
	ganancia = 0.0825;
	
	Escribir "Bienvenido a", marca;
	Escribir Sin Saltar "Ingrese la cantidad de CDs a comprar: ";
	Leer cantidad;
	
	Si cantidad > 0 y cantidad <= 9 Entonces
		precio = 10.0 * cantidad;
	SiNo
		Si cantidad >= 10 y cantidad <= 99 Entonces
			precio = 8.0 * cantidad;
		SiNo
			Si cantidad >= 100 y cantidad <= 499 Entonces
				precio = 7.0 * cantidad;
			SiNo
				Si cantidad >= 500 Entonces
					precio = 6.0 * cantidad;
				FinSi
			FinSi
		FinSi
	FinSi
	
	ganancia = ganancia * precio;
	totalCliente = precio + ganancia;
	
	Escribir "---------- Total a pagar Cliente ----------";
	Escribir "Cantidad: ", cantidad;
	Escribir "Total: ", totalCliente;
	Escribir "---------- Ganancia Vendedor ----------";
	Escribir "Ganancia: ", ganancia;
FinProceso
