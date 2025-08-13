Proceso Ejercicio07
	//7. Hacer un algoritmo en Pseint para una tienda de helado que da un descuento por compra a sus clientes 
	//con membresía dependiendo de su tipo, sólo existen tres tipos de membresía, tipo A, tipo B y tipo C. 
	//Los descuentos son los siguientes:
	
	//Tipo A 10% de descuento
	//Tipo B 15% de descuento
	//Tipo C 20% de descuento
	
	Definir cantidad Como Entero;
	Definir precioUnitario, desc, total Como Real;
	Definir menbresiaCli Como Caracter;
	
	precioUnitario = 5.0;
	tipoS = 0.0;
	tipoA = 0.1;
	tipoB = 0.15;
	tipoC = 0.12;
	
	Escribir "---------- Bienvenido a la tienda de helados ----------";
	Escribir "Ingresa a que tipo de cliente al cual perteneces: ";
	Escribir "Tipo A";
	Escribir "Tipo B";
	Escribir "Tipo C";
	Escribir "Tipo S, si no pertenecez a ninguno";
	
	Repetir
		Leer menbresiaCli;
		Si Longitud(menbresiaCli) <> 1 Entonces
			Escribir "Ingresa solo una letra para determinar tu menbresía";
		FinSi
		
		Si menbresiaCli = Minusculas(menbresiaCli) Entonces
			menbresiaCli = Mayusculas(menbresiaCli)
		FinSi
		
		Si menbresiaCli = "A" o menbresiaCli = "B" o menbresiaCli = "C" o menbresiaCli = "S" Entonces
			Escribir "¡Todo correcto!";
		SiNo
			Escribir "El valor ingresado no es del todo correcto, ingresa los valores sugeridos";
			Escribir "Vuelve a intentarlo";
		FinSi
	Hasta Que Longitud(menbresiaCli) = 1;
	
	Si menbresiaCli = "A" Entonces
		Escribir Sin Saltar "Ingrese la cantidad de helados que va ha llevar: ";
		Leer cantidad;
		desc = (cantidad * precioUnitario) * tipoA;
		total = (cantidad * precioUnitario) - desc;
	SiNo
		Si menbresiaCli = "B" Entonces
			Escribir Sin Saltar "Ingrese la cantidad de helados que va ha llevar: ";
			Leer cantidad;
			desc = (cantidad * precioUnitario) * tipoB;
			total = (cantidad * precioUnitario) - desc;
		SiNo
			Si menbresiaCli = "C" Entonces
				Escribir Sin Saltar "Ingrese la cantidad de helados que va ha llevar: ";
				Leer cantidad;
				desc = (cantidad * precioUnitario) * tipoC;
				total = (cantidad * precioUnitario) - desc;
			SiNo
				Si menbresiaCli = "S" Entonces
					Escribir Sin Saltar "Ingrese la cantidad de helados que va ha llevar: ";
					Leer cantidad;
					desc = (cantidad * precioUnitario) * tipoS;
					total = (cantidad * precioUnitario) - desc;
				FinSi
			FinSi
		FinSi
	FinSi
	
	Escribir "---------- Resultados ----------";
	Escribir "Tipo menbresia: ", menbresiaCli;
	Escribir "Cantidad de helados: ", cantidad;
	Escribir "Descuento por menbresia: S/", desc;
	Escribir "Total a pagar: S/", total;
	
FinProceso
