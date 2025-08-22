console.log("Inicio de la aplicacion");

const Reserva = function(){
    let nombre, pais;
    function configurar(){
        $("#txt_nombre").text(nombre);
        $("#txt_pais").text(pais);
    }
    function eventos(){
        $("#reservar").on("click",reservar)
    }
    function reservar(e){
        e.preventDefault();
        console.log("Hizo click en reservar")
    }
    return{
        init: function(parametros){
            nombre = parametros.nombre;
            pais = parametros.pais;

            configurar();
            eventos();
        }
    }
}()

class Persona{
    #logged=false;
    constructor(dni, nombres, apellidos, direccion,telefono){
        this.dni = dni;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.telefono = telefono;
    }
    login(){
        if(this.#logged){
            console.log(`El usuario ${this.nombres} ${this.apellidos} ya esta logeado`)
        }
        else{
            this.#logged = true;
            console.log(`El usuario ${this.nombres} ${this.apellidos} inicia sesion`)
        }
    }
    logout(){
        if(this.#logged){
            this.#logged = false;
            console.log(`El usuario ${this.nombres} ${this.apellidos} ha salido de la sesion`)
        }
        else{
            console.log(`El usuario ${this.nombres} ${this.apellidos} no ha iniciado sesion`)
        }
    }
}

class Cliente extends Persona{
    constructor(dni, nombres, apellidos, direccion,telefono, codigoCliente){
        super(dni, nombres, apellidos, direccion,telefono);
        this.codigoCliente = codigoCliente;
    }
    pagar(medioPago, valor){
        console.log(`El Cliente estaa pagando con ${medioPago} la cantidad de ${valor}`)
    }
}

class Empleado extends Persona{
    constructor(dni, nombres, apellidos, direccion,telefono, codigoEmpleado){
        super(dni, nombres, apellidos, direccion,telefono);
        this.codigoEmpleado = codigoEmpleado;
    }
    revesarPago(numeroTransaccion, cliente){
        console.log(`El Empleado esta reversando la transaccion ${numeroTransaccion} del cliente ${cliente.nombres} ${cliente.apellidos}`)
    }
}

class Reservas{
    constructor(origen, destino, fechaIda, fechaVuelta){
        this.origen = origen;
        this.destino = destino;
        this.fechaIda = fechaIda;
        this.fechaVuelta = fechaVuelta;
        this.avionIda = null;
        this.avionVuelta = null;
    }
    asignarAvionIda(avion){
        this.avionIda = avion;
    }
    asignarAvionVuelta(avion){
        this.avionVuelta = avion;
    }
}

class Aviones{
    constructor(matricula, modelo, nroAsientos,capacidadMinima, costoVuelo){
        this.matricula = matricula;
        this.modelo = modelo;
        this.nroAsientos = nroAsientos;
        this.capacidadMinima = capacidadMinima;
        this.costoVuelo = costoVuelo;

        this.habilidato = false;
        this.resevados = 0;
        this.arrPasajeros = [];
    }

    agregarPasajero(pasajero){
        this.arrPasajeros.push(pasajero);
        this.resevados++;
        if(this.resevados>=this.capacidadMinima){
            this.habilidato = true;
        }
        else{
            this.habilidato = false;
        }
    }
}