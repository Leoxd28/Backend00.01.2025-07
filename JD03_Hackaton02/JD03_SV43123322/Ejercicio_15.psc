Proceso Ejercicio_15
	// 15. Hacer un algoritmo en Pseint que convierta centímetros a pulgadas y libras a kilogramos.
	Definir centimetros , pulgadas, libras , kilogramos Como Real
	Definir tipo Como Entero
	
	
	Escribir "Ingresar tipo 1 para convertir centimetros a pulgadas o 2 para convertir libras a kilogramas"
	Leer tipo
	
 
	
	si tipo = 1 Entonces
		Escribir "Ingresar longitud en centimetros"
		Leer centimetros
		pulgadas =  0.393701  * centimetros
		Escribir centimetros," ", "centimetros equivalen a "," ", pulgadas ," ","pulgadas"
	SiNo 	si tipo = 2 Entonces
			Escribir "Ingresar longitud en libras"
			Leer libras
			kilogramos  =  0.453592 * libras
			Escribir   libras ," ", "libras equivalen a ", kilogramos ," ","kilogramos" 	
	FinSi
		

	FinSi	
 

 

 
FinProceso
 