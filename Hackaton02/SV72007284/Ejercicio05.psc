Proceso Ejercicio05
	//5. Hacer un algoritmo en Pseint para una tienda de zapatos que tiene una promoción de descuento
	//para vender al mayor, esta dependerá del número de zapatos que se compren. Si son más de diez,
	//se les dará un 10% de descuento sobre el total de la compra; si el número de zapatos es mayor de
	//veinte pero menor de treinta, se le otorga un 20% de descuento; y si son más treinta zapatos se
	//otorgará un 40% de descuento. El precio de cada zapato es de $80.
	Definir i, cantidad Como Entero;
	Definir precio, desc, subtotal, total Como Real;
	
	Escribir "-- Bienvenido a la tienda de zapatos al por mayor --";
	Escribir Sin Saltar "Cantidad de zapatos a comprar: ";
	Leer cantidad;
	
	precio = 80.0 * cantidad;
	
	Para i <- 1 Hasta cantidad Con Paso 1 Hacer
		Si cantidad > 10 Entonces
			desc = 0.10;
			subtotal = precio * desc;
			total = precio - subtotal;
		SiNo
			Si cantidad > 20 Entonces
				desc = 0.20;
				subtotal = precio * desc;
				total = precio - subtotal;
			SiNo
				Si cantidad > 30 Entonces
					desc = 0.40;
					subtotal = precio * desc;
					total = precio - subtotal;
				SiNo
					desc = 0.0;
					subtotal = precio * desc;
					total = precio - subtotal;
				FinSi
			FinSi
		FinSi
	Fin Para
	
	Escribir "---------- Resultados ----------";
	Escribir "Cantidad: ", cantidad;
	Escribir "Descuento por cantidad: S/", subtotal;
	Escribir "Total: S/", total;
FinProceso
