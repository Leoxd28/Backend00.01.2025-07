Proceso Ejercicio32
	//32. Se quiere saber cuál es la ciudad con la población de más personas, son tres provincias y once ciudades, hacer un algoritmo en Pseint que nos permita saber eso. 
	Definir provincias, ciudades, poblacion, mayorPoblacion, provinciaMayor, ciudadMayor Como Entero;
    Definir nombreProvincia, nombreCiudad, nombreProvinciaMayor, nombreCiudadMayor Como Cadena;
	
    mayorPoblacion = -1;
    nombreProvinciaMayor = "";
    nombreCiudadMayor = "";
	
    Para provincias = 1 Hasta 3 Con Paso 1 Hacer
        Escribir "Provincia ", provincias;
        Para ciudades = 1 Hasta 11 Con Paso 1 Hacer
            Escribir Sin Saltar "  Ciudad ", ciudades, " - Ingrese el nombre de la ciudad: ";
            Leer nombreCiudad;
            Escribir Sin Saltar "  Ingrese la población de ", nombreCiudad, ": ";
            Leer poblacion;
			
            Si poblacion > mayorPoblacion Entonces
                mayorPoblacion = poblacion;
                provinciaMayor = provincias;
                ciudadMayor = ciudades;
                nombreProvinciaMayor = "Provincia " + ConvertirATexto(provincias);
                nombreCiudadMayor = nombreCiudad;
            FinSi
        FinPara
    FinPara
	
    Escribir "La ciudad con mayor población es ", nombreCiudadMayor, " de ", nombreProvinciaMayor, " con ", mayorPoblacion, " habitantes.";
FinProceso
