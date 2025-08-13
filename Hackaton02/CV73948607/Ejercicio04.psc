Algoritmo Ejercicio04
//Hacer un algoritmo en Pseint que lea tres números enteros y los muestre de menor a mayor.
	Escribir " ingrese el primer numero"
	Leer num1
	Escribir " ingrese el segundo numero"
	Leer num2
	Escribir " ingrese el terecer numero"
	Leer num3
    si num1<num2 y num1<num3
		ord1=num1
        ord2=num2
		ord3=num3
	SiNo
		si num2<num3
			ord1=num2
			ord2=num3
			ord3=num1
		SiNo
			ord1=num3
			ord2=num1
			ord3=num2
		FinSi
		
	FinSi
	se=ord2
	th=ord3
	si ord2<ord3
		ord2=th
		ord3=se
	FinSi
 Escribir  ord1 ord2 ord3
FinAlgoritmo
