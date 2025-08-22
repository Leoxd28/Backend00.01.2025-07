function ejercicio01() {
  let numero = 0 ; 
    for (let index = 1; index < 3; index++){
   numero =parseInt(prompt(index+ "ingrese numero"))
   numero += numero
  } 
  alert("la suma de los numero es " + numero)

}

function ejercicio02() {
    let numero=parseInt(prompt("INgresar numero"))
    let contador=parseInt(prompt("Ingresar potencia"))
    if (contador==!1) {
      for (let index = 1; index < contador; index++) {
        numero *= numero  
    alert("El resultado es " + numero)
   }    
     alert("El resultado es " + 1)
    } 
    
}

function ejercicio03() {
 let numero= 0
 for (let index = 0; index < 2; index++) {
    numero = parseInt(prompt("ingrsar numero"))
    numero=3^numero
    numero+=numero
}
alert("El resultado es " + numero)
}

function ejercicio04() {
    let base =parseInt(prompt("ingresar base"))
    let altura =parseInt(prompt("ingresar altura"))
     
    let area= altura*base
    alert("El area es "+area )
}

function ejercicio05() {
let numero = parseInt(prompt("Ingrese su numero"))
let numero2 = parseInt(prompt("ingrese segundo numero"))  
let tota= 0
let signo = prompt("ingrese operacion (+,-,*,/) ")
let arraysignos=["+","-","*","/"]    

for (let index = 0; index < arraysignos.length; index++) {
    if (signo==arraysignos[index]) {
          tota =eval(numero + arraysignos[index] + numero2)           
        alert("el resultado es " +tota)
        break
    }
    
}                                

alert("la opcion elegida es invald")
}

function ejercicio06() {
    
    let respuesta=""
    let pregunta =[ "nombre","apellido","edad"]
    let persona = {
        nombre:"",
        apellido:"",
        edad:"",
       }
        for (let index = 0; index < pregunta.length; index++) {
        respuesta=prompt("ingresar su "+pregunta[index])
        
        persona[pregunta[index]]=respuesta
    }   

    const mifuncion=(persona)=>{ return `Hola mi nombre es ${persona.nombre} ${persona.apellido} y mi edad es ${persona.edad}`}
    alert(mifuncion(persona))
}


function ejercicio07() {
    let numero = 0
    let tota = 0
    for (let index = 0; index < 3; index++) {
        numero= parseInt(prompt("Ingrese su numero"))
        tota+=numero^3
    }
    alert(`la suma de los cubos es ${tota} `)
}

 function ejercicio08() {
 let valor =prompt("Escribir")
const buscar=(valor)=> {
    if (!isNaN(valor) && valor.trim() !== "") {
        return "number" 
    }     
    if (valor==="true"||valor==="false") {
        return "boolean"
    }
    
    if(valor==="null"){
        return "null"}
    if (valor==="undefined") {
        return "undefined" 
    }
    try{
        const parsed=JSON.parse(valor)
        if (Array.isArray(parsed)) return"array"
        if (typeof parsed ==="object" && parsed !== null) return "object";

    }catch(e){

    }
 return"string"

}
alert("Es un " + buscar(valor))
}

function ejercicio09(){
function sumar(...numeros){
let total= 0
for(let num of numeros){
    total+=num
}
return total
}
let cantidad= parseInt(prompt("cuantos numero quieres sumar"))
let numeros =[]

for (let index = 0; index < cantidad ;index++) {
     let num =parseInt(prompt(`ingrsa numero ${index+1}`))
      numeros.push(num)
}
alert("la suma es :" +sumar(...numeros))
}

function ejercicio10() {
 let valor = "";
 let evaluar =[]
 let cantidad =parseInt(prompt("ingrese cuantos valores pondra"))
 for (let index = 0; index < cantidad; index++) {
    valor=prompt("ingrese valor")
    try {
        valor=JSON.parse(valor)
    } catch (e) {}
    
    evaluar.push(valor)
 }

 function arraycompro (evaluar) {
    return evaluar.filter(elemento =>typeof elemento==="string")
    
 }
alert("los valores que son string son :" + arraycompro(evaluar))
}

function ejercicio11() {
 let opcion=parseInt(prompt("Igresar cantiadad de numeros para el array"))
 let conjnumero=[]
 let num=""
 for (let index = 0; index < opcion; index++) {
    num=parseInt(prompt("ingresar numero"))
    conjnumero.push(num)
 }
  function  minymax(conjnumero) {
   let min = Math.min(...conjnumero)
   let max = Math.max(...conjnumero)
   return{min:min  , max:max }
  }
 alert("el numero mayor y menor son  " + minymax(conjnumero).max +"y" + minymax(conjnumero).min)


 } 

function ejercicio12 () {
let num =""
let cadetele=[]
for (let index = 0; index < 10; index++) {
    num = parseInt(prompt("Ingresar numeor del 0-9"))
    cadetele.push(num)
}
function telefono(cadetele) {
    let numero=cadetele.join("")
    let match = numero.match(/^(\d{3})(\d{3})(\d{4})$/) 
    return match? `(${match[1]}) ${match[2]}-${match[3]}` : numero
}
alert("el numero de telefono es " + telefono(cadetele))
}


function ejercicio13() {
let arrnumero0 =[
]
let arrmoyr=[]
let numero =0 
let opcion=""
let general=parseInt(prompt("ingrese cuantas matrizes creara"))
for (let index = 0; index < general; index++) {
     opcion=parseInt(prompt("Ingresar de cuantos nuemros sera esta matriz"))
    for (let index = 0; index < opcion; index++) {
        let numero=parseInt(prompt("Ingrese su numero"))
         arrnumero0.push(numero)   
    }
    mayor(arrmoyr)
 
}
function mayor(arrmoyr) {
let numeromayor=Math.max(...arrnumero0)
arrmoyr.push(numeromayor)
arrnumero0=[]     
return arrmoyr
}
alert("El array de los mayores seria " + arrmoyr)
}

function ejercicio14(){
    let caracter = prompt("Ingrsar palbra ")
    function buscar(caracter) {
    let primero=caracter[0]
    let ultimo=caracter[caracter.length-1]
    return {primero ,ultimo}
}
alert("el primer es"+buscar(caracter).primero+" y el ultimo es "+buscar(caracter).ultimo
)
}



function ejercicio15() {
 let texto=prompt("ingresa cadena formato con conmilas al inicio y al final en las letras{ x:numero,x:numero ......}")
let objeto=JSON.parse(texto) 
function convertir(objeto){
    let objconver=Object.entries(objeto)
    return objconver
}
alert("la conversion es "+JSON.stringify(convertir(objeto)))
}

function ejercicio16() {
 let contador =parseInt(prompt("Escribir cuantas personas seran registradas"))
let total =  0 
let principalarray = []
for (let index = 0; index < contador; index++){
    let nombre=prompt("escribir nombre")
    let edad=prompt("escribir edad")
    let dinero=parseInt(prompt("Escribir dinerero dado"))
    
    let recolectorarray={
       nombre:nombre,
       edad:edad,
       dinero:dinero
    }
        total+=dinero
        principalarray.push(recolectorarray)

}
alert(JSON.stringify(principalarray)+ "SUMA = "+total)
}

function ejercicio17() {
  let arraynombres=[]
  let nombremostrar=[]
  let nombres =""
 let contador=parseInt(prompt("Escribir cuantos nombres tomara la mariz"))
 for (let index = 0; index < contador; index++) {
    nombres=prompt("Ingresar el nombre")
    let nombprov={
        nombre:nombres,
    }
    arraynombres.push(nombprov)
    nombremostrar.push(nombres) 
    }
    alert(JSON.stringify(arraynombres,null,2)+JSON.stringify(nombremostrar))
}
function  ejercicio18 () {
 let contador = parseInt(prompt("Escribri cantidad de matrizes que añadiraz")) 
 let arrayfinal=[]
 let nombre=""
 let valor=""
 for (let index = 0; index < contador; index++) {
    nombre=prompt("Ingresa palabra")
     valor=prompt("ingrsa valor")
    let arraydepaso=[nombre,valor]
    arrayfinal.push(arraydepaso)
 }
 
 let finaltext=arrayfinal.map(par=>`(${par[0]}" :+"${par[1]})`).join(", ")
 alert("la matriz es " + arrayfinal.join("\n") +  " y su descomposicion es "  +finaltext)
}
function ejercicio19(params) {
let total= 0
    let numero = parseInt(prompt("ingresar hasta que numero se quiere sumar al cubo"))
for (let index = 1; index <= numero; index++) {
     let cubo = index ** 3
     total = total+cubo 
}
alert("la suma de tods los cubos hasta " +numero+"es "+total)
}
function ejercicio20(params) {
    let contador =parseInt(prompt("Ingresar la cantiadd de elemntos a openr en la matriz"))
    let arraypnumeros=[ ]
    let arraynumerosmulti=[ ]
    let numero = 0
    for (let index = 0; index < contador; index++) {
        numero= parseInt(prompt("Escribir numero"))
        arraypnumeros.push(numero)
    }
   
      for (let index = 0; index < contador; index++) {
        let provicional=arraypnumeros[index]*contador
              arraynumerosmulti.push(provicional)
      }  
      asdf=arraynumerosmulti.map(num=> "("+num+")").join(",")
    alert("el resultao de multiplicar cada uno de os valores del array por la cantidad es "+ asdf)
 }
function ejercicio21() {
let contador = parseInt(prompt("Ingresar el numero dwesde el cual se contara desde este hasta el 0"))
let i = i+contador
let arraynumeros=[]
for (i ; i >=0; i--) {
    arraynumeros.push(i)
}
let texto="( "+arraynumeros.join(",")+")"
alert(texto)
}

function ejercicio22() {
let contador=parseInt(prompt("ingresar tamñao del array"))
let num = 0
let arraynum=[]
for (let index = 0; index < contador; index++) {
    num=parseInt(prompt("ingresar numero"))
    arraynum.push(num)
}
function comparar(arraynum) {
    let mayor=Math.max(...arraynum)
    let menor=Math.min(...arraynum)
    let diferencia=mayor-menor
    return diferencia
}
alert("la resta del mayor y menor es " + comparar(arraynum))
}

function ejercicio23() {
    let contador=parseInt(prompt("Ingresar tamaño del array"))
   let arraynum=[]
   let arrayfiltrada=[]
   let num = 0
  for (let index = 0; index < contador; index++) {
    num=prompt("ingresar un valor")
    arraynum.push(num)
  }
  for (let index = 0; index  < contador; index++) {
         let fitro=arraynum[index].trim()
        if (!isNaN(fitro)&& fitro!== "") {
            arrayfiltrada.push(fitro)
        }   
  }
    alert("el array ingresado seria "+arraynum+"  el array filtrado seria "+arrayfiltrada )  
}

function ejercicio24(params) {
let elemento =parseInt(prompt("Escribri elmento a reptir"))
let repetir =parseInt(prompt("Escribri el numero de vces qe se repitira"))
let arraytota=[]
for (let index = 0; index < repetir; index++) {
    arraytota.push(elemento)
    
}
    alert("el arry seria "+ "{"+arraytota+"}")
}

function ejercicio25() {
let texto=prompt("ingrese texto")
let vocal=prompt("ingrese volca por la cua quieres reemplazar")
let newtext=texto.replace(/[aeiou]/gi,vocal)
alert(newtext)
}

function ejercicio26() {
let texto=prompt("ingrese texto")
let encontrar=prompt("ingresar palabra a encontrar")
let partes=texto.split(" ")
let coincidencia=""
for (let index = 0; index < partes.length; index++) {
     if (partes[index]==encontrar) {
        coincidencia+=index+","
     }
}
alert(encontrar+" a sido ecnontrado en "+coincidencia)
}

function ejercicio27() {
    let letra =prompt("ingresar texto")
    let letrades=letra.split("")
     letrades[0]=letrades[0].toUpperCase()
     let mayus =letrades[0]+textoslice(1) 
     alert(mayus)
}