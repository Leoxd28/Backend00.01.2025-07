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

class Television{
    #costo = 100;
    constructor(serie, marca, modelo, conectividad, precio,fechaCompra,entradas){
        this.serie = serie;
        this.marca = marca;
        this.modelo = modelo;
        this.conectividad  = conectividad;
        this.precio = precio;
        this.fechaCompra = fechaCompra;
        this.entradas = entradas;
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
        console.log(`Se esta encendiendo la television ${this.marca}`)
    }
    apagar(){
        console.log(`Se esta apagando la television ${this.marca}`);
    }
}

let tv1 = new Television("0001","Samsung","Cristal", ["WIFI", "LAN"], 1500, "2025-04-01", ["HDMI", "BT"]);
let tv2 = new Television("0002", "JVC", "KLMD",["WIFI"], 1200, "2025-06-24",["HDMI","CABLE"]);

console.log(tv1)

console.log(tv1.modelo);
console.log(tv2.marca)
tv1.modelo = "AINOSEQUE";
console.log(tv1.modelo)
console.log(tv1)

tv1.setCosto(200,"user")

console.log(
tv1.getCosto())

tv1.encender();
tv2.apagar()