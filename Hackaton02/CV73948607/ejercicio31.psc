Algoritmo ejercicio21
	// Hacer un algoritmo en Pseint parar calcular la media de los números pares e impares, sólo se ingresará diez números.
	j=0
	k=0
	Repetir
	Escribir "ingrese numero"
	leer n
	i=n
	si i mod 2 = 0
		pr=pr+i
		j=j+1
	sino 
		inp=inp+i
		k=k+1
	FinSi
  hasta que j+k=10
si j>0 Entonces
	totpr=pr/j
FinSi
si k>0 Entonces
	totinp=inp/k
FinSi
Escribir "la media de los apres es " totpr " el total de los inpares es " totinp
FinAlgoritmo
