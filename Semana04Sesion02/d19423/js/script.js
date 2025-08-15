console.log("Inicio de la aplicacion")

const Heladeria = function () {
    let Nombre;
    let Direccion;
    let arrCliente = [];

    function configurar() {
        document.getElementById("nombre").innerText = Nombre;
        $("#direccion").text(Direccion);
    }

    function eventos() {
        console.log("Escuchando Eventos");

        document.getElementById("crearCliente").addEventListener("click", crearCliente);

        $("#verOrdenes").on("click", (e) => {
            e.preventDefault();
            console.log("Hizo clic en ver ordenes")
        })
        $("#cerrarVentana").on("click", (e) => {
            e.preventDefault();
            $("#infoCliente").css('display', 'none');
        })
    }

    function crearCliente(e) {
        e.preventDefault();
        console.log("Hizo Click")
        let nombre = prompt("Escribe tu nombre");
        let documento = prompt("Escribe tu documento");
        let telefono = prompt("Escribe tu telefono");
        let objCliente = {
            nombre,
            documento,
            telefono,
            helado: {},
            estado: true,
            precio: 0,
            cobrado: false,
            recibirPedido() {
                let sabor = prompt("Escoge tu sabor");
                let tamaño = prompt("Escoje tu tamaño");
                let toppins = prompt("Escoge tus toppins");
                this.helado.sabor = sabor;
                this.helado.tamaño = tamaño;
                this.helado.toppins = toppins;
            }
        }
        objCliente.recibirPedido();
        arrCliente.push(objCliente);
        cargarInfoCliente(objCliente);
        $("#infoCliente").css('display', 'block');
    }

    let cargarInfoCliente = (obj) => {
        $("#nombreCliente").val(obj.nombre);
        $("#telefonoCliente").val(obj.telefono);
        $("#tamañoHelado").val(obj.telefono);
        $("#saborHelado").val(obj.helado.sabor);
        $("#toppinsHelado").val(obj.helado.toppins);
    }

    return {
        init: function (parametros) {
            console.log(parametros)
            Nombre = parametros.nombre;
            Direccion = parametros.direccion;
            configurar();
            eventos()
        }
    }
}();