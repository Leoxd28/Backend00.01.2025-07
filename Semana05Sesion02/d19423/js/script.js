console.log("Inicio de la aplicacion");

const Reserva = function () {
    let nombre, pais, objAvionIda, objAvionVuelta;
    function configurar() {
        $("#txt_nombre").text(nombre);
        $("#txt_pais").text(pais);
        objAvionIda = new Aviones("JA7702", "Airbus 320 Neo", 146, 73, 10000)
        objAvionVuelta = new Aviones("JA7704", "Airbus 318", 186, 93, 15000)
    }
    function eventos() {
        $("#reservar").on("click", reservar)
    }
    async function reservar(e) {
        e.preventDefault();
        console.log("Hizo click en reservar");
        $("#divReserva").hide();
        const { value: formValues } = await Swal.fire({
            title: "Ingresa tus datos de vuelo",
            icon: "info",
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            html: `
            <input id="origen" type="text" placeholder="Cual es la ciudad de Origen"
    class="form-control input-md">
<input id="destino" type="text" placeholder="Cual es la Ciudad de Destino"
    class="form-control input-md">
<input id="fechaIda" type="text" placeholder="Cual es la fecha de ida"
    class="form-control input-md">
<input id="fechaVuelta" type="text" placeholder="Cual es la fecha de vuelta"
    class="form-control input-md">
            `,
            preConfirm: () => {
                return {
                    origen: $("#origen").val(),
                    destino: $("#destino").val(),
                    fechaIda: $("#fechaIda").val(),
                    fechaVuelta: $("#fechaVuelta").val()
                }
            }
        })
        if (formValues) {
            console.log(formValues)
            let objReserva = new Reservas(formValues.origen, formValues.destino, formValues.fechaIda, formValues.fechaVuelta);
            console.log(objReserva)

            incluirPasajeros().then((data) => {

                objReserva.asignarAvionIda(objAvionIda);
                objReserva.asignarAvionVuelta(objAvionVuelta);
                objReserva.avionIda.agregarPasajero(data);
                objReserva.avionVuelta.agregarPasajero(data);
                console.log(objReserva);

                dibujarReserva(objReserva);

            }).catch(err => {
                console.log(err);
            })
        }
    }
    function dibujarReserva(objReserva) {
        $("#idaNombre").val(objReserva.avionIda.arrPasajeros[0].nombres);
        $("#idaApellido").val(objReserva.avionIda.arrPasajeros[0].apellidos);
        $("#idaFecha").val(objReserva.fechaIda);
        $("#idaVuelo").val(objReserva.avionIda.matricula)
        $("#idaOrigen").val(objReserva.origen)
        $("#vueltaNombre").val(objReserva.avionVuelta.arrPasajeros[0].nombres);
        $("#vueltaApellido").val(objReserva.avionVuelta.arrPasajeros[0].apellidos)
        $("#vueltaFecha").val(objReserva.fechaVuelta)
        $("#vueltaVuelo").val(objReserva.avionVuelta.matricula)
        $("#vueltaDestino").val(objReserva.destino)
        $("#divReserva").show();
    }

    async function incluirPasajeros() {
        const { value: formValues } = await Swal.fire({
            title: "Ingresa tus datos personales",
            icon: "info",
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            html: `
            <input id="nombres" type="text" placeholder="Cual tu nombre"
    class="form-control input-md">
<input id="apellidos" type="text" placeholder="Cual tu apellido"
    class="form-control input-md">
<input id="documento" type="text" placeholder="Cual es tu documento de identidad"
    class="form-control input-md">
            `,
            preConfirm: () => {
                return {
                    nombres: $("#nombres").val(),
                    apellidos: $("#apellidos").val(),
                    documento: $("#documento").val()
                }
            }
        })
        if (formValues) {
            let pasajero = new Cliente(formValues.documento, formValues.nombres, formValues.apellidos, "", "", "");
            return pasajero;
        }
    }

    return {
        init: function (parametros) {
            nombre = parametros.nombre;
            pais = parametros.pais;

            configurar();
            eventos();
        }
    }
}()



class Persona {
    #logged = false;
    constructor(dni, nombres, apellidos, direccion, telefono) {
        this.dni = dni;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.telefono = telefono;
    }
    login() {
        if (this.#logged) {
            console.log(`El usuario ${this.nombres} ${this.apellidos} ya esta logeado`)
        }
        else {
            this.#logged = true;
            console.log(`El usuario ${this.nombres} ${this.apellidos} inicia sesion`)
        }
    }
    logout() {
        if (this.#logged) {
            this.#logged = false;
            console.log(`El usuario ${this.nombres} ${this.apellidos} ha salido de la sesion`)
        }
        else {
            console.log(`El usuario ${this.nombres} ${this.apellidos} no ha iniciado sesion`)
        }
    }
}

class Cliente extends Persona {
    constructor(dni, nombres, apellidos, direccion, telefono, codigoCliente) {
        super(dni, nombres, apellidos, direccion, telefono);
        this.codigoCliente = codigoCliente;
    }
    pagar(medioPago, valor) {
        console.log(`El Cliente estaa pagando con ${medioPago} la cantidad de ${valor}`)
    }
}

class Empleado extends Persona {
    constructor(dni, nombres, apellidos, direccion, telefono, codigoEmpleado) {
        super(dni, nombres, apellidos, direccion, telefono);
        this.codigoEmpleado = codigoEmpleado;
    }
    revesarPago(numeroTransaccion, cliente) {
        console.log(`El Empleado esta reversando la transaccion ${numeroTransaccion} del cliente ${cliente.nombres} ${cliente.apellidos}`)
    }
}

class Reservas {
    constructor(origen, destino, fechaIda, fechaVuelta) {
        this.origen = origen;
        this.destino = destino;
        this.fechaIda = fechaIda;
        this.fechaVuelta = fechaVuelta;
        this.avionIda = null;
        this.avionVuelta = null;
    }
    asignarAvionIda(avion) {
        this.avionIda = avion;
    }
    asignarAvionVuelta(avion) {
        this.avionVuelta = avion;
    }
}

class Aviones {
    constructor(matricula, modelo, nroAsientos, capacidadMinima, costoVuelo) {
        this.matricula = matricula;
        this.modelo = modelo;
        this.nroAsientos = nroAsientos;
        this.capacidadMinima = capacidadMinima;
        this.costoVuelo = costoVuelo;

        this.habilidato = false;
        this.resevados = 0;
        this.arrPasajeros = [];
    }

    agregarPasajero(pasajero) {
        this.arrPasajeros.push(pasajero);
        this.resevados++;
        if (this.resevados >= this.capacidadMinima) {
            this.habilidato = true;
        }
        else {
            this.habilidato = false;
        }
    }
}