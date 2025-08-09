Algoritmo Ejercicio19
//Hacer un algoritmo en Pseint que que lea 4 números enteros positivos y verifique y realice las siguientes operaciones:
	
    //¿Cuántos números son Pares?
	
    //¿Cuál es el mayor de todos?
	
    //Si el tercero es par, calcular el cuadrado del segundo.
		
	//Si el primero es menor que el cuarto, calcular la media de los 4 números.
			
	//Si el segundo es mayor que el tercero, verificar si el tercero esta comprendido entre los valores 50 y 700. Si cumple se cumple la segunda condición, calcular la suma de los 4 números.
	Escribir "Ingrese primer numero"
	Leer n1
	Escribir "Ingrese segundo numero"
	Leer n2
	Escribir "Ingrese tercer numero"
	Leer n3
	Escribir "Ingrese cuarto numero"
	Leer n4
	si n1 MOD 2 = 0
		par1=1 
	     sino
			par1=0
		FinSi
	si n2 MOD 2 = 0
			par2=1 
		sino
			par2=0
		FinSi
	si n3 MOD 2 = 0
			par3=1 
		sino
			par3=0
		FinSi
	si n4 MOD 2 = 0
			par4=1 
		sino
			par4=0
		FinSi
		Escribir "Hay " par1+par2+par3+par4 " numeros pares"
		si n1>n2 y n1>n3 y n1>n4
			Escribir n1 " es el mayor"
		  sino
			si n2>n3 y n2>n4 
				Escribir n2 " es el mayor"
			sino 
				si n3>n4
					Escribir n3 " es el mayor"
				sino 
				     Escribir n4 " es le mayor"
				FinSi
			FinSi
		FinSi
		
		si par3=1	Entonces
			Escribir "el cuadrado es " n2*n2
		FinSi
		
	 si n1<n4 Entonces
		 Escribir "La media es " (n1+n2+n3+n4)/4	
	 FinSi
	 si n2>n3 y n3<51 y n3<701 Entonces
		 Escribir "la suma de los cuatros numeros es " n1+n2+n3+n4
	 FinSi
finAlgoritmo








