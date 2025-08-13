Algoritmo ejercicio17
	// Hacer un algoritmo en Pseint para una empresa se encarga de la venta y distribución de CD vírgenes. Los clientes pueden adquirir los artículos (supongamos un único producto de una única marca) por cantidad. Los precios son:
	
    //$10. Si se compran unidades separadas hasta 9.
		
	//$8. Si se compran entre 10 unidades hasta 99.
			
     //$7. Entre 100 y 499 unidades.
			
	//$6. Para mas de 500 unidades.
				
	//La ganancia para el vendedor es de 8,25 % de la venta. Realizar un algoritmo en Pseint que dado un número de CDs a vender calcule el precio total para el cliente y la ganancia para el vendedor.
	Escribir "Ingresar cantiadad de cds"
	Leer cd
	si cd<10 Entonces
		pr=10
	SiNo
		si cd<100 Entonces
			pr=8
		sino 
			si cd<500 entoncs
				pr=7
			sino 
				pr=6
			FinSi
		
		FinSi
	FinSi
	to= cd*pr
	gn=to*0.0825
	Escribir to " costaria los cdss y " gn " seria la ganancia"
FinAlgoritmo
