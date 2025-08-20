console.log("Inicio de la aplicacion")

/**
 * Television
 * marca
 * modelo
 * serie
 * tamaño
 * tecnologia
 * conectividad
 * resolucion
 * 
 * 
 * prender()
 * apagar()
 * cambiarVolumen()
 * reproducirVideo()
 * cambiarCanal()
 * reproducirMusica()
 * 
 */
// let objTelevision = {
//     marca: "JVC",
//     modelo: "SJJJS",
//     prender(){

//     },
//     apagar(){

//     }
// }

// let objTelevision2 = {
//     marca: "Samsung",
//     modelo: "Cristal",
//     prender(){

//     },
//     apagar(){

//     }
// }
class Electrodomesticos{
    #costo = 0;
    constructor(serie, marca, modelo, conectividad, precio,fechaCompra){
        this.serie = serie;
        this.marca = marca;
        this.modelo = modelo;
        this.conectividad  = conectividad;
        this.precio = precio;
        this.fechaCompra = fechaCompra;
    }
    getCosto(){
        return this.#costo;
    }
    setCosto(nuevoCosto, nivelAcceso){
        if(nivelAcceso === "admin"){
            this.#costo = nuevoCosto;
        }
    }
    encender(){
        console.log(`Se esta encendiendo el electrodomestico ${this.marca}`)
    }
    apagar(){
        console.log(`Se esta apagando la electrodomestico ${this.marca}`);
    }
    conectarAlIntenet(dispositivo){
        this.conectividad.forEach(element => {
            if(element.tipo === dispositivo){
                element.isActivo = true;
                console.log(`El dispositivo de conectividad ${element.tipo} se ha activado`)
            }else{
                element.isActivo = false;
                console.log(`El dispositivo de conectividad ${element.tipo} se ha desactivado`)
            }
        });
    }
}

class LineaMarron extends Electrodomesticos{
    constructor(serie, marca, modelo, conectividad, precio,fechaCompra,entradas, salidas){
        super(serie, marca, modelo, conectividad, precio,fechaCompra);
        this.entradas = entradas;
        this.salidas = salidas;
    }
    cambiarEntrada(entrada){
        this.entradas.forEach(element => {
            if(element.tipo === entrada){
                element.isActivo = true;
                console.log(`El dispositivo de entrada ${element.tipo} se ha activado`)
            }
            else{
                element.isActivo = false;
                console.log(`El dispositivo de entrada ${element.tipo} se ha desactivado`)
            }
        });
    }
    cambiarSalida(salida){
        this.salidas.forEach(element => {
            if(element.tipo === salida){
                element.isActivo = true;
                console.log(`El dispositivo de salida ${element.tipo} se ha activado`)
            }
            else{
                element.isActivo = false;
                console.log(`El dispositivo de salida ${element.tipo} se ha desactivado`)
            }
        });
    }
    cambiarVolumen(nivel){
        this.salidas.forEach(element => {
            if(element.isActivo){
                console.log(`El dispositivo de salida ${element.tipo} se ha configurado al nivel ${nivel}`)
            }
        });
    }
}

class Television extends LineaMarron{ 
    constructor(serie, marca, modelo, conectividad, precio,fechaCompra,entradas, salidas, tamaño, formato, sistemaOperativo){
       super(serie, marca, modelo, conectividad, precio,fechaCompra,entradas, salidas);
        this.tamaño = tamaño;
        this.formato = formato;
        this.sistemaOperativo = sistemaOperativo;
    }

    cambiarCanal(numeroCanal){
        let exito = false;
        this.entradas.forEach(element => {
            if(element.isActivo && element.tipo === "CABLE"){
                console.log(`La television ${this.marca} - ${this.modelo} esta mostrando el canal ${numeroCanal}`)
                exito=true;
            }
        });
        if(!exito){
            console.log(`La television ${this.marca} - ${this.modelo} no puede ejecutar la accion`)
        }
    }

   encender(){
        console.log(`Se esta encendiendo la television ${this.marca}`)
    }
    apagar(){
        console.log(`Se esta apagando la television ${this.marca}`);
    }
}


class Dispositivo{
    constructor(tipo, isActivo=false){
        this.tipo = tipo;
        this.isActivo = isActivo;
    }
}

let tv1 = new Television("SE001","Samsung","Cristal",
    [new Dispositivo("WiFi"), new Dispositivo("LAN")],
    1800, "2025-08-19",
    [new Dispositivo("HDMI"), new Dispositivo("CABLE"), new Dispositivo("BT")],
    [new Dispositivo("Parlantes Integrados"), new Dispositivo("BT")],50, "4K", "TIZEN"
)

let tv2 = new Television("SE0002", "JVC", "HDFG",
    [new Dispositivo("WiFi") ], 1600,"2025-08-01",
     [new Dispositivo("HDMI"), new Dispositivo("CABLE"), new Dispositivo("BT"), new Dispositivo("RCA")],
     [new Dispositivo("Parlantes Integrados"), new Dispositivo("BT"), new Dispositivo("OPTICO")],55, "4K", "GOOGLETV"
)


tv1.cambiarEntrada("CABLE");
tv1.cambiarEntrada("HDMI");
tv1.cambiarCanal("10")
tv2.encender()


// let tv1 = new Television("0001","Samsung","Cristal", ["WIFI", "LAN"], 1500, "2025-04-01", ["HDMI", "BT"]);
// let tv2 = new Television("0002", "JVC", "KLMD",["WIFI"], 1200, "2025-06-24",["HDMI","CABLE"]);

// console.log(tv1)

// console.log(tv1.modelo);
// console.log(tv2.marca)
// tv1.modelo = "AINOSEQUE";
// console.log(tv1.modelo)
// console.log(tv1)

// tv1.setCosto(200,"user")

// console.log(
// tv1.getCosto())

// tv1.encender();
// tv2.apagar()