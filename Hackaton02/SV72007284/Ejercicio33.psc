Proceso Ejercicio33
	//33. Hacer un algoritmo en Pseint que permita al usuario continuar con el programa.
	Definir continuar Como Caracter;
	
    Repetir
        Escribir "Ejecutando el programa...";
		
        Escribir "¿Desea continuar? (S/N): ";
        Leer continuar;
		
        continuar = Mayusculas(continuar);
    Hasta Que continuar = "N";
	
    Escribir "Programa finalizado.";
FinProceso
