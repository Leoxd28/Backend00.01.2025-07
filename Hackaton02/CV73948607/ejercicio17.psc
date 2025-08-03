Algoritmo ejercicio17
	//Hacer un algoritmo en Pseint que lea un número y según ese número, indique el día que corresponde.
	Escribir "Escribe un hora "
	Leer hr
	Escribir "Escribe un minuto"
	Leer  min
	Escribir "Escribe un segundo "
	Leer seg
	to_Seg=seg+60*min+3600*hr
	to_Seg=to_seg+1
	hr=trunc(to_seg/3600)MOD 24
	min=trunc(to_seg/60)MOD 60 
	seg=to_seg mod 60
	Escribir hr " horas" min " minutos" seg " segundos"
FinAlgoritmo
