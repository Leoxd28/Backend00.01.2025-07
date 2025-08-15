console.log("Inicio de la aplicacion")


let $table = $("#table");
let $tableDespachos = $('#tableDespachos');
let $tableCaja = $('#tableCaja');
let arrClientes = [];
let arrDespachos = [];
let arrCaja = [];

const Heladeria = function () {
    let Nombre;
    let Direccion;

    let arrSabores = ["Vainilla", "Chocolate", "Mango", "Fresa"]

    function configurar() {
        document.getElementById("nombre").innerText = Nombre;
        $("#direccion").text(Direccion);

        $table.bootstrapTable({ data: arrClientes });
        $tableDespachos.bootstrapTable({ data: arrDespachos });
        $tableCaja.bootstrapTable({ data: arrCaja });

        cargarSabores();

    }

    cargarSabores = ()=>{
        arrSabores.forEach(element => {
            $("#lstSabores").append(`<li>${element}</li>`);
        });
    }

    function eventos() {
        console.log("Escuchando Eventos");

        document.getElementById("crearCliente").addEventListener("click", crearCliente);

        $("#verOrdenes").on("click", (e) => {
            e.preventDefault();
            $table.bootstrapTable("load", arrClientes);
            $("#tblOrdenes").css("display", "block")
            console.log("Hizo clic en ver ordenes")
        })
        $("#cerrarVentana").on("click", (e) => {
            e.preventDefault();
            $table.bootstrapTable('load', arrClientes);
            $("#infoCliente").css('display', 'none');
        })


        $("#verDespachos").on("click", (e) => {
            e.preventDefault();
            $tableDespachos.bootstrapTable('load', arrDespachos)
            $table.bootstrapTable('load', arrClientes)
            //$table.bootstrapTable({data: arrClientes})
            document.getElementById("tblDespachos").style.display = "block";
        })


        $("#verCaja").on("click", (e) => {
            e.preventDefault();
            $tableCaja.bootstrapTable('load', arrCaja)
            document.getElementById("tblCaja").style.display = "block";
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
        arrClientes.push(objCliente);
        cargarInfoCliente(objCliente);
        $("#infoCliente").css('display', 'block');
        $table.bootstrapTable("load", arrClientes);
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


function ordenesFormatter(value, row, index) {
    if (row.estado) {
        return [
            '<a class="like" href="javascript:void(0)" id="btnDespachar" title="Like">',
            '<i class="fa-brands fa-jedi-order">Despachar</i>',
            '</a>  ',
            '<a class="edit" href="javascript:void(0)" id="btnDespachar" title="Like">',
            '<i class="fa-solid fa-download">Editar</i>',
            '</a>  '
        ].join('')
    }
}

window.ordenesEvents = {
    'click .like': function (e, value, row, index) {
        despacharHelado(row)
        //  alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .edit': function (e, value, row, index) {
        editarSabor(row)
        // alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        })
    }
}

let despacharHelado = (obj) => {
    console.log(arrClientes);
    arrDespachos.push(obj);
    const index = arrClientes.indexOf(obj);
    console.log(index);
    if (index > -1) { // only splice array when item is found
        arrClientes.splice(index, 1); // 2nd parameter means remove one item only
    }
    console.log(arrClientes);
    $table.bootstrapTable('load', arrClientes);
    console.log(obj);
}

let editarSabor = (obj) => {
    console.log(arrClientes);
    const index = arrClientes.indexOf(obj);
    let sabor = prompt("Pon el nuevo sabor")
    console.log(index);
    if (index > -1) { // only splice array when item is found
        arrClientes[index].helado.sabor = sabor;
    }
    console.log(arrClientes);
    $table.bootstrapTable('load', arrClientes);
    console.log(obj);
}

function despachoFormatter(value, row, index) {
    if (row.estado) {
        return [
            '<a class="like" href="javascript:void(0)" id="btnDespachar" title="Like">',
            '<i class="fa fa-heart">Entregar</i>',
            '</a>  '
        ].join('')
    }
}

window.despachoEvents = {
    'click .like': function (e, value, row, index) {
        entregarHelado(row)
        //alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        })
    }
}
let entregarHelado = (obj) => {
    console.log(arrCaja);
    arrCaja.push(obj);
    const index = arrDespachos.indexOf(obj);
    console.log(index);
    if (index > -1) { // only splice array when item is found
        arrDespachos.splice(index, 1); // 2nd parameter means remove one item only
    }
    console.log(arrDespachos);
    $tableDespachos.bootstrapTable('load', arrDespachos);
    $tableCaja.bootstrapTable('load', arrCaja);
    console.log(obj);
}

function priceFormatter (data){
    var field = this.field
    return '$' + data.map(function (row) {
        return +row[field]
    }).reduce(function (sum, i) {
        return sum + i
    }, 0)
}

function cobradoFormatter(value, row, index) {
    if (row.cobrado) {
        return [
            '<a class="like" href="javascript:void(0)" id="btnDespachar" title="Like">',
            '<i class="fa-regular fa-sack-dollar">Cobrado</i>',
            '</a>  '
        ].join('')
    } else {
        return [
            '<a class="like" href="javascript:void(0)" id="btnDespachar" title="Like">',
            '<i class="fa-solid fa-circle-dollar-to-slot">Por Cobrar</i>',
            '</a>  '
        ].join('')
    }
}

function cajaFormatter(value, row, index) {
    if (row.estado) {
        return [
            '<a class="like" href="javascript:void(0)" id="btnDespachar" title="Like">',
            '<i class="fa fa-heart">Cobrar</i>',
            '</a>  '
        ].join('')
    }
}

window.cajaEvents = {
    'click .like': function (e, value, row, index) {
        cobrarHelado(row)
        //alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        })
    }
}

function cobrarHelado(obj) {
    console.log(arrCaja);
    const index = arrCaja.indexOf(obj);
    let precio = prompt("Pon el precio cobrado")
    console.log(index);
    if (index > -1) { // only splice array when item is found
        arrCaja[index].cobrado = true;
        arrCaja[index].precio = precio;
    }
    console.log(arrCaja);
    $tableCaja.bootstrapTable('load', arrCaja);
    console.log(obj);
}

function idFormatter() {
    return 'Total'
}

function nameFormatter(data) {
    return data.length
}