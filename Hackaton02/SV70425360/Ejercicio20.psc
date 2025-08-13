Proceso Ejercicio20    
    Escribir "Ingrese el primer número:"
	Leer n1
	Escribir "Ingrese el segundo número:"
	Leer n2
	Escribir "Ingrese el tercer número:"
	Leer n3
	Escribir "Ingrese el cuarto número:"
	Leer n4

	pares <- 0
	si n1 MOD 2 = 0 entonces
		pares <- pares + 1
	FinSi
	si n2 MOD 2 = 0 entonces
		pares <- pares + 1
	FinSi
	si n3 MOD 2 = 0 entonces
		pares <- pares + 1
	FinSi
	si n4 MOD 2 = 0 entonces
		pares <- pares + 1
	FinSi

	mayor <- n1
	si n2 > mayor entonces
		mayor <- n2
	FinSi
	si n3 > mayor entonces
		mayor <- n3
	FinSi
	si n4 > mayor entonces
		mayor <- n4
	FinSi

	
	si n3 MOD 2 = 0 entonces
		cuadrado <- n2^2
		Escribir "El tercero es par, el cuadrado del segundo número es: ", cuadrado
	FinSi

	
	si n1 < n4 entonces
		media <- (n1 + n2 + n3 + n4) / 4
		Escribir "El primero es menor que el cuarto, la media de los 4 números es: ", media
	FinSi

	
	si n2 > n3 y n3 >= 50 y n3 <= 700 entonces
		suma <- n1 + n2 + n3 + n4
		Escribir "El segundo es mayor que el tercero y el tercero está entre 50 y 700"
		Escribir "La suma de los 4 números es: ", suma
	FinSi

	
	Escribir "Cantidad de números pares: ", pares
	Escribir "El mayor número es: ", mayor
FinProceso