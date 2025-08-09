Proceso Ejercicio_20
	// 20. Hacer un algoritmo en Pseint que que lea 4 números enteros positivos y verifique y realice las siguientes operaciones:
	// P1. ¿Cuántos números son Pares?
	// P2. ¿Cuál es el mayor de todos?
	// P3. Si el tercero es par, calcular el cuadrado del segundo.
	// P4. Si el primero es menor que el cuarto, calcular la media de los 4 números.
	// P5. Si el segundo es mayor que el tercero, verificar si el tercero esta comprendido entre los valores 50 y 700. Si se cumple 
	//      la segunda condición, calcular la suma de los 4 números.
	
	Definir  numero1 , numero2, numero3, numero4 , i,numerop, cantidadPares, numMayor, sumaTotal Como Entero
	Definir cuadradoSegundo , promedio   Como Real
	
	cantidadPares <- 0
	sumaTotal <- 0
	
	Para i<- 1  Hasta 4 Con Paso 1   Hacer
		Escribir "Ingresar numero: " , i , " Entero positivo"
		Leer numerop
		
		si numerop < 0 Entonces
			Escribir "Numero ingresado es negativo"
		FinSi
		
		sumaTotal <- sumaTotal + numerop
		
		si numerop MOD 2 = 0  Entonces
			cantidadPares <- cantidadPares + 1
		FinSi
		
		
		
		si i = 1 Entonces
			numMayor <- numerop
			numero1 <- numerop
			
		SiNo
			si numerop > numMayor Entonces
				numMayor <- numerop	
			FinSi
			
			si i=2 Entonces
				numero2 <- numerop
			SiNo
				si i=3 Entonces
					numero3 <- numerop
				SiNo
					numero4 <- numerop
				FinSi
								
			FinSi		
			
		FinSi
					
	Fin Para
 
		 
	si numero3 MOD 2 = 0 Entonces
		cuadradoSegundo = numero2 * numero2
	FinSi
	
	si numero1 < numero4 Entonces
		promedio = sumaTotal/4
	FinSi
	
	
	Escribir  "P1. La cantidad de numeros pares es: ", cantidadPares
	Escribir  "P2. El numero mayor es: ", numMayor
	
	si numero3 MOD 2 = 0 Entonces
		Escribir "P3. El tercer numero es PAR"
		Escribir  "P3. El cuadrado del segundo", cuadradoSegundo
		
	sino 
		Escribir "P3. El tercer numero NO es PAR por lo tanto NO se calcula el cuadrado del segundo"	
 
	FinSi
	
	si numero1 < numero4 Entonces
		Escribir "P4. El primer numero es menor que el cuarto numero por lo tanto el promedio de los 4 numeros es: " , promedio
	SiNo
		Escribir "P4. No se cumple condicion de que el primer numero es menor que el cuarto numero"
	FinSi
		
	si numero2 > numero3 y numero3 >= 50 y numero3 <= 70 Entonces
		Escribir "P5. Se cumple la condicion que el segundo es mayor que el tercero por lo tanto la suma de los 4 numeros es: ", sumaTotal
	SiNo
		Escribir "P5. No se cumple condicion"
	FinSi
 
	
FinProceso
