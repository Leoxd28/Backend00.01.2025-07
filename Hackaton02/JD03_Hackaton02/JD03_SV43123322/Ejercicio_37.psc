Proceso Ejercicio_37
	//37. Hacer un algoritmo en Pseint para conseguir el M.C.D de un número por medio del algoritmo de Euclides
	
	Definir num1, num2, res Como Entero
	
	Escribir "Ingresar el primer numero entero positivo: "
	Leer num1
	
	Escribir "Ingresar el segundo numero entero positivo: "
	Leer num2
	
	si num1 < 0 Entonces
		num1 <- -num1
	FinSi
	
	si num2 < 0 Entonces
		num2 <- -num2
	FinSi
	
	Mientras num2 <> 0 Hacer
		res <- num1 MOD num2
		num1 <- num2
		num2 <- res
	Fin Mientras
	
	Escribir "El M.C.D es: ", num1
FinProceso
