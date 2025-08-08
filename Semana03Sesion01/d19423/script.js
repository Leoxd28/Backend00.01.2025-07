//Ejercicio01
/*document.getElementById("Btn2").addEventListener("click",()=>{

const numero = parseInt(document.getElementById("numero").value)
if (isNaN(numero)){
    alert("inserta un numero")
}
    else if(numero%2==0){
        document.getElementById("resultado").textContent="es numero par"
    }
    else{
        document.getElementById("resultado").textContent="es impar"
    }

})
*/
/*const nuevoArray= []
document.getElementById("Btn2").addEventListener("click",()=>{
    const datoInput = document.getElementById("dato");
    const dato = datoInput.value;
    
    nuevoArray.push(dato)
    document.getElementById("almacen").textContent=nuevoArray.join(", ");
    datoInput.value = "";
    datoInput.focus();
});

document.getElementById("Btn3").addEventListener("click",()=>{
    
    document.getElementById("orden").textContent = nuevoArray.sort( );
})*/

/*document.getElementById("formularioDatos").addEventListener('submit', function(e){
    e.preventDefault();
    //obtener los valores del formulario
    const dni = document.getElementById('dni').value;
    const apellido = document.getElementById('apellido').value;
    const nombre = document.getElementById('nombre').value;

    //crear nueva fila en la tabla
    const tabla = document.getElementById('tablaDatos').getElementsByTagName('tbody')[0];
    //insertar celdas con los datos
    const nuevaFila = tabla.insertRow();
        
        nuevaFila.insertCell(0).textContent = dni;
        nuevaFila.insertCell(1).textContent = apellido;
        nuevaFila.insertCell(2).textContent = nombre;

    //limpiar formulario
    document.getElementById('formularioDatos').reset();
});*/
/*let aumento=0;
document.getElementById('Btnaumentar').addEventListener('click',()=>{
        
        aumento++;
        document.getElementById('aumento').textContent = aumento;

})*/