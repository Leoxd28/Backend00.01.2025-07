function ejercicio01(){
//1. Hacer un algoritmo en JavaScript que lea un número por el teclado y determinar si tiene tres dígitos.
  let num=parseInt(prompt("Escribir numero"))
  if (num<1000 && num>99) 
   alert("el numero es de tres digitoS")
    else 
     alert("el numeor no es de tres digitos digitos")
}
function ejercicio02(){
//2. Hacer un algoritmo en JavaScript que lea un número entero por el teclado y determinar si es negativo.
let num=parseInt(prompt("Escribir numero"))
  if(num<0){
    alert("el numero es negatio")
  }
  else{
    alert("el nuermo noes negativo")
  }
} 
function ejercicio03(){
//  Hacer un algoritmo en JavaScript que lea un número y determinar si termina en 4.
let num = parseInt ( prompt ( "escibir numero"))
 if(num % 10 === 4){
alert("el numero termina en cuatro")    
 }
 else{
    alert("el numero no termina en 4")
 }

}
function ejercicio04(){
// Hacer un algoritmo en JavaScript que lea tres números enteros y los muestre de menor a mayor.+
let num1 = parseInt(prompt("Escribir numero 1"))
let num2 = parseInt(prompt("Escribir numero 2"))
let num3 = parseInt(prompt("Escribir numero 3")) 
 
let numeros=[num1,num2,num3 ]
numeros.sort(function(a,b){ 
    return a-b}) 
alert(" el orden asecnedete es " + numeros.join(","))
}

function ejercicio05(){
//Hacer un algoritmo en JavaScript para una tienda de zapatos que tiene una promoción de descuento para vender al mayor, esta dependerá del número de zapatos que se compren. Si son más de diez, se les dará un 10% de descuento sobre el total de la compra; si el número de zapatos es mayor de veinte pero menor de treinta, se le otorga un 20% de descuento; y si son más treinta zapatos se otorgará un 40% de descuento. El precio de cada zapato es de $80.
let num =parseInt(prompt("Escribir cantidadde de zapatos"))
let desc=0
if(num>10){
    let desc=0.10
}
else if (num>20 && num<30){
    let desc=0.20
}
else if(num>30){
    let desc =0.40
}
let tota=num*80-num*desc
alert("el precio seria"+" "+ tota)
}

function ejercicio06(){
//Hacer un algoritmo en JavaScript para ayudar a un trabajador a saber cuál será su sueldo semanal, se sabe que si trabaja 40 horas o menos, se le pagará $20 por hora, pero si trabaja más de 40 horas entonces las horas extras se le pagarán a $25 por hora.
let hora=parseInt(prompt("escibir cantidad de horas"))
let paga=0
if(hora<=40){
  paga=20
}
else{
    paga=40
}    
total=hora*paga
alert(" la paga sera de" +" "+total)
}

function ejercicio07(){
//Hacer un algoritmo en JavaScript para una tienda de helado que da un descuento por compra a sus clientes con membresía dependiendo de su tipo, sólo existen tres tipos de membresía, tipo A, tipo B y tipo C. Los descuentos son los siguientes:

   //Tipo A 10% de descuento
   //Tipo B 15% de descuento
   //Tipo C 20% de descuento
   let tipo =prompt("Escribir meebresia A. B. C.")
  let desc=0
   switch (tipo) {
    case "A":
              desc=10
        break;
              
    case "B":
             desc=15
        break;
          
    case "C":
            desc=20
        break;
                  
     default:alert("la opcion ingresada no es correcta")   
}
 alert("tiene un descuento del "+desc+"%")
    

}
function ejercicio08(){
// Hacer un algoritmo en JavaScript para calcular el promedio de tres notas y determinar si el estudiante aprobó o no.
i=0
tota=0
while (i<3) {
    let numero=prompt("Escribir ingrtese numero")
    i=i+1
    tota=tota+numero
}
prom=tota/3
if(prom>13){
    alert("Escribir El alumno aprobo")
}
else{
    alert("escribir no aprobo")
}

}

function ejercicio09(){
//acer un algoritmo en Pseint para determinar el aumento de un trabajador, se debe tomar en cuenta que si ganaba más de $2000 tendrá un aumento del 5%, si generaba menos de $2000 su aumento será de un 10%.
let sueldo=parseInt(prompt("Escribir su sueldo"))
let aument=0
if(sueldo>2000){ 
aument=0.05
}
else{
    aument=0.10
}
tota=sueldo+sueldo*aument
alert("el aumento del sueldo es "+sueldo*aument+" el sueldo total seria " +tota)
}

function ejercicio10(){
//Hacer un algoritmo en JavaScript que diga si un número es par o impar.
let numero=parseInt(prompt("insertar numero"))
if(numero%2 === 0){
alert("El numero es par ")
}
else{
    alert("El numero es inpar")
}
}
function ejercicio11 ( ){
//Hacer un algoritmo en JavaScript que lea tres números y diga cuál es el mayor.
i=0
mayor=0
while (i<3) {
let numero=parseInt(prompt("Escribir numero"))
if( numero>mayor){
    mayor=numero
}
i=i+1
}
alert("el numero mayor es " + mayor)
}
function ejercicio12(){
//Hacer un algoritmo en JavaScript que lea dos números y diga cuál es el mayor.
let numero1=parseInt(prompt("Escribir primer numero"))
let numero2=parseInt(prompt("Escribir segundo numoro"))
let mayor=Math.max(numero1 , numero2)
alert("El mayor numero es "+mayor)
}

function ejercicio13(){
//Hacer un algoritmo en JavaScript que lea una letra y diga si es una vocal.
let letra=prompt("Escribir su Letra").toLowerCase()
let letras=["a","e","i","o","u"]
if(letras.includes(letra)){
 alert("es vocal")   
}
else{
    alert("no es vocal")
}
}

function ejercicio14(){
// Hacer un algoritmo en JavaScript que lea un entero positivo del 1 al diez y al 9 y determine si es un número primo.
let primos=[2,3,5,7]
let numero =parseInt(prompt("Ingrese su numero"))
if (primos.includes(numero))
   {alert("es primo")}
else{
    alert("no es primo")
    
    }
}

function ejercicio15(){
//Hacer un algoritmo en JavaScript que convierta centímetros a pulgadas y libras a kilogramos.Hacer un algoritmo en JavaScript que convierta centímetros a pulgadas y libras a kilogramos.
let conver=0
let numero=parseInt(prompt("Ingrese numero"))
let medida=prompt("Ingrese conversion A.cent a pulgadas B.Libras a kg")
 switch (medida) {
    case "A":
           conver=numero*0.393   
        break;
           
    case"B":
          conver=numero*0.453
    break;

    default:alert("opcion ingresada no es valida")
        break;
 }
alert("la conversion es de  " + conver.toFixed(4))
}

function ejercicio16(){
//Hacer un algoritmo en JavaScript que lea un número y según ese número, indique el día que corresponde.
let numero=parseInt(prompt("Escribe su numero"))
i=1
inte=false
while (inte=false) {
 if(numero%7==0){
  inte=true
 }else{
    i++
    if(i>7){
         i= 0
    }
 }

  
}
switch (i ) {
    case 1:
           alert("es un lunes")
        break;

    case 2:
           alert("es un martes")
        break;
      
    case 3:
            alert("es un miercoles")
        break;
      
    case 4:
           alert(" es un jueves")
        break;

    case 5:
          alert("es un viernes")
        break;
      
    case 6:
          alert(" es un sabado")      
        break;
    
     default: 
          alert(" es un domingo")
        break;
}
}
function ejercicio17(){
//Hacer un algoritmo en JavaScript donde se ingrese una hora y nos calcule la hora dentro de un segundo
  let horas=parseInt(prompt("ingrese horas"))
  let minutos=parseInt(prompt("ingrese minutos"))
  let segundos=parseInt(prompt("ingresar segundos"))
   
  let horatotal=horas*3600+minutos*60+segundos+1

  horas=Math.floor(horatotal/3600)
  minutos=Math.floor((horatotal%3600)/60)
  segundos=Math.floor(horatotal%3600)%60

alert("La hora seria " + horas +":"+ minutos + ":" + segundos)
} 

function ejercicio18() {
//Hacer un algoritmo en Pseint para una empresa se encarga de la venta y distribución de CD vírgenes. Los clientes pueden adquirir los artículos (supongamos un único producto de una única marca) por cantidad. Los precios son:
//$10. Si se compran unidades separadas hasta 9.
//$8. Si se compran entre 10 unidades hasta 99.
//$7. Entre 100 y 499 unidades.
//$6. Para mas de 500 unidades.
//La ganancia para el vendedor es de 8,25 % de la venta. Realizar un algoritmo en Pseint que dado un número de CDs a vender calcule el precio total para el cliente y la ganancia para el vendedor.   
let cantidad=parseInt(prompt("ingrese la canitad"))
let precio=0
let ganancia=0
let pagototal=0
if (cantidad<=9) {
    precio=10
}else 
    if (cantidad>=10 && cantidad<100) {
    precio=8
}else
    if (cantidad>=100 && cantidad<500) {
        precio=7
    }
    else{
        precio=6
    }
  ganancia=(precio*cantidad)*0.0825
  pagototal=precio*cantidad
  alert("La venta seria de " + precio*ganancia + " y la ganancia seria de " +ganancia)
}

function ejercicio19(){
//Hacer un algoritmo en Pseint para una heladería se tienen 4 tipos de empleados ordenados de la siguiente forma con su número identificador y salario diario correspondiente:

//Cajero (56$/día).

//Servidor (64$/día).

//Preparador de mezclas (80$/día).

//Mantenimiento (48$/día).

//El dueño de la tienda desea tener un programa donde sólo ingrese dos números enteros que representen al número identificador del empleado y la cantidad de días que trabajó en la semana (6 días máximos). Y el programa le mostrará por pantalla la cantidad de dinero que el dueño le debe pagar al empleado que ingresó
let sueldo=0
let total=0
let dias=parseInt(prompt("Escribe dias de 1 a 6"))
let identificador=parseInt(prompt("Escribe tu cargo 1cajero 2servidor 3preparador de mezclas 4Mnatenimiento"))
switch (identificador) {
    case 1:
       sueldo=56      
        break;
     
    case 2:
        sueldo=64
        break
        
    case 3:
        sueldo=80
        break
        
    case 4:
        sueldo=48
         break
   
     default:
      alert("la opcion es incorrecta")
     break;
}
total=sueldo*dias
alert("Se le debe de pagar al empleado "+total)
}

function ejercicio20(){
//Hacer un algoritmo en JavaScript que que lea 4 números enteros positivos y verifique y realice las siguientes operaciones:
//¿Cuántos números son Pares?

//¿Cuál es el mayor de todos?

//Si el tercero es par, calcular el cuadrado del segundo.

//Si el primero es menor que el cuarto, calcular la media de los 4 números.

///Si el segundo es mayor que el tercero, verificar si el tercero esta comprendido entre los valores 50 y 700. Si cumple se cumple la segunda condición, calcular la suma de los 4 números.
let alcuadrado=0
let n1=parseInt(prompt("ingresar primer numero"))
let n2=parseInt(prompt("ingresa segundo numero"))
let n3=parseInt(prompt("ingresa el tercer numero"))
let n4=parseInt(prompt("ingresa el cuarto numero"))
 i=0
 if (n1%2==0) {
    i=i+1 
 }
if (n2%2==0) {
     i=i+1
    }
if (n3%2==0) {
     i=i+1       
    }
 if (n4%2==0) {
     i=i+1
        }
 alert("la cantidad de numero pares es "+i) 
let mayor=Math.max(n1,n2,n3,n4)
alert("el mayor numero es "+mayor)

if (n3%2==0) {
    alcuadrado=n2*n2
}
alert("El cuadrado del segundo es "+alcuadrado)
if (n1<n4) {
    alert("la media de los 4 numeros es "+(n1+n2+n3+n4)/4)
}
if (n2>n3 && n3>=50 && n3<=700) {
    alert("la suma de los cuatros son "+(n1+n2+n3+n4))
}
}

function ejercicio21(){
// Hacer un algoritmo en JavaScript que permita calcular el factorial de un número.
let numero=parseInt(prompt("Escribe su numero"))
i=1
let factorial=numero
while (i<numero) {
    factorial=factorial*i
    i=i+1
}
alert("el factorail del numero es "+factorial)
}

    function ejercicio22() {
    //Hacer un algoritmo en JavaScript para calcular la suma de los n primeros números.
    let numero=parseInt(prompt("ngresar numero para sumar todo hasta ese numero"))
    let suma=0
    suma=(numero*(numero+1))/2
    alert("la suma de los numeros es "+suma)
    }

    function ejercicio23() {
    // Hacer un algoritmo en JavaScript para calcular la suma de los números impares menores o iguales a n.
    let numero=parseInt(prompt("ingresar numero para sumar todos los impares hasta ese numero"))
    i=1
    let tota= 0
    while (i<numero) {
        if (i%2!==0) {
            tota=tota+i
        }
    i++
    } 
    
alert("la seuma de la secuencia es " +tota)
    }

    function ejercicio24(){
    // Hacer un algoritmo en Pseint para realizar la suma de todos los números pares hasta el 1000.
    let opcion=prompt("INgresa 1para inciar y 2 para cancelar")
    i=1
    let tota=0
    if (opcion==1) {
        tota=(1000*(1001))/2
        } 
    alert("la suma de los nuermos hasta el 1000 es "+tota)
    }

     function ejercicio25(){
    //Hacer un algoritmo en JavaScript para calcular el factorial de un número de una forma distinta.
     let numero=parseInt(prompt("ingrese numero"))
     let tota=numero
      for (let i = 1; i < numero; i++) {
            tota=tota*i
        }   
    alert("el factorial es " + tota)
        }

function ejercicio26 (){
// Hacer un algoritmo en JavaScript para calcular el resto y cociente por medio de restas sucesivas.
let numero=parseInt(prompt("ingrese dividendo"))
let numero2=parseInt(prompt("ingresar divisor"))
let residuo=numero
i=0
while (residuo>=numero2) {
    residuo=residuo-numero2
    i=i+1
}
alert("EL reusltado es " + i)
}

function  ejercicio27() {
  //Hacer un algoritmo en JavaScript para determinar la media de una lista indefinida de números positivos, se debe acabar el programa al ingresar un número negativo.
i=0
let numero=1
let to=0
let media=0
while (numero>0) {
numero=parseInt(prompt("Escrbir numero"))
if (numero>0) {
to=to+numero
i++
}
}
media=to/i
alert("La mediad de lso numeros ingreasdos es "+ media)
}

function ejercicio28() {
//Hacer un algoritmo en JavaScript para calcular la suma de los primeros cien números con un ciclo repetir.
let inicio=parseInt(prompt("Escribir 1 inicio 2 cancela"))
i=1
let suma=0
if (inicio==1) {
while (i<=100) {
    suma=suma+i
    i++
}
alert("La suam de los cien primeros numeor es" + suma)
}
}

function ejercicio29() {
//vHacer un algoritmo en JavaScript para calcular la suma de los primeros cien números con un ciclo mientras.
let inicio=parseInt(prompt("Escribir 1incio 2cancela"))
i=1
let suma= 0
if (inicio==1) {
do {
    suma=suma+i
    i++
} while (i<=100);
alert("La suma de los primeros cien numeros es " + suma)    
}
}   

function ejercicio30() {
//Hacer un algoritmo en JavaScript para calcular la suma de los primeros cien números con un ciclo para.
let inicio=parseInt(prompt("Escirbni 1incio 2cancela"))
let suma=0
if(inicio==1){
for (let i = 1; i < 101; i++){
suma+=i
}
alert("La suam de los cien primeros numeros es " + suma)
}
}

function ejercicio31(){ 
//acer un algoritmo en JavaScript parar calcular la media de los números pares e impares, sólo se ingresará diez números.
let numero= 0
i=0
j=0
k=0
let par = 0
let inpar= 0
while (i <10) {
    numero=parseInt(prompt("ingresar numero"))
    if (numero%2==0) {
        par+=numero
         j+=1
    }
    else{
        inpar+=numero
        k+=1    
    } 
    i++
}
alert("la media de lso numeros pares es "+ par/j+"la media de los numeros inpares es "+ inpar/k)
}

function ejercicio32 () {
//Se quiere saber cuál es la ciudad con la población de más personas, son tres provincias y once ciudades, hacer un algoritmo en JavaScript que nos permita saber eso. 
let ciudad =""
let mayorci=""
let población=0
let mayorpo=0
i=0
while (i<11) {
ciudad=prompt("ingresar ciudad letra mayuscula de preferencia")
población=parseInt(prompt("ingresar cantidad de persona"))
if (población>mayorpo) {
    mayorpo=población
    mayorci=ciudad
}
i++
}
alert("La ciudad con mas poblacion es "+mayorci+" con una poblacion de "+mayorpo)
}

function ejercicio33() {
//Hacer un algoritmo en JavaScript que permita al usuario continuar con el programa.
let interuptor=true
let dialogo=""
while (interuptor==true) {

       dialogo=prompt("Hola este es un prgrama que le permita al usuario continuero con el program en cualquier mometno cuadno escribs 1")
       if (dialogo=="1") {
        interuptor=false
        break
       }
        dialogo=prompt( "Buno contare como llevo haciendo , pues ya voy como mas 4 horas desde ayer talvez 8")
       if (dialogo=="1") {
        interuptor=false
        break
       }
        dialogo=prompt("que porque tanto?, la verdad es mas tiempo pero ya no recuerdo")
        if (dialogo=="1") {
            interuptor=false
            break
        }
        dialogo=prompt("bueno con musica de fondo es mas pasable pero simplemten no se porque demoro tanto") 
        if (dialogo=="1") {
            interuptor=false
            break
        }
        dialogo=prompt(" puede ser falta de costumbre ")
        if (dialogo=="1") {
            interuptor=false
            break
        } 
        dialogo=prompt("bueno grcias por tu opinin")
        if (dialogo=="1") {
            interuptor=false
            break
         }
        dialogo=prompt("la conversaicon se repitira recureda que en cualquier mometno si respondes 1 la conversacin termina")  
        if (dialogo=="1") {
            interuptor=false
           break
        }
    }
    alert("prueba finalizdag gracias por estar")
}

function ejercicio34() {
// Hacer un algoritmo en JavaScript que imprima la tabla de multiplicar de los números del uno al nueve.
let interuptor=parseInt(prompt("Escribir 1iniciar 2finalizar"))
if (interuptor==1) {
  for (let p = 1; p<=9 ; p++){
  let numero=[] 
      for(let s = 1;s <= 12;s++)
     numero.push(p+"x"+s+"="+(p*s))
  
    alert("la tabla es"+numero.join("\n"))
    }
}
}

function ejercicio35(){
// Hacer un algoritmo en JavaScript que nos permita saber cuál es el número mayor y menor, se debe ingresar sólo veinte números.
let numero=0
let mayor=0
let menor=999999999
let i=0
while (i<20) {
numero=parseInt(prompt("ingresar numero"))
 if (numero>mayor) {
    mayor=numero
 }
 if (numero<menor) {
    menor=numero
 }
 i++
}
alert("el numero mayor es"+mayor+"el numero menor es"+menor)
}

function ejercicio36(){
// Hacer un algoritmo en JavaScript para calcular la serie de Fibonacci.
let p = 0
let s = 0
let x = 1
let i=0
let numero=[]
let interuptor=parseInt(promp("poner 1inicar 2salir"))
if (interuptor==1) {
p=s+x
s=x
numero.push(p+"="+s+"+"+x)
while (i<10) {
   p=s+x
   s=x
   x=p 
 numero.push(p+"="+s+"+"+x)
 i++
}
alert("la serie es"+numero.join("\n"))
}
}

function ejercicio37() {
//Hacer un algoritmo en JavaScript para conseguir el M.C.D de un número por medio del algoritmo de Euclides.
let numero1=parseInt(prompt("inresar primer numero(mayor)"))
let numero2=parseInt(prompt("ngresar segundo numero(menor)"))
let r=0
while (numero2>0) {
    r=numero1%numero2
    numero1=numero2
    numero2=r
    
}
alert("el MCD es"+numer1)
}

function ejercicio38() {
 //acer un algoritmo en JavaScript que nos permita saber si un número es un número perfecto.
 let numero1=parseInt(prompt("ingresar numero"))   
i=1
let tota=0
while (i<numero1) {
    if(numero1%i==0){
      tota+=i
   }
i++
}
if (tota==numero1) {
alert("si es numero perfcto")
}else{
    alert("no es un numoer perfecto")
}
}

function ejercicio39() {
//Hacer un algoritmo en JavaScript que cumpla con la aproximación del número pi con la serie de Gregory-Leibniz. La formula que se debe aplicar es:

//Pi = (4/1) - (4/3) + (4/5) - (4/7) + (4/9) - (4/11) + (4/13) - (4/15) ...
let interuptor=parseInt(prompt("Ingresar 1inicio 2apago"))
let vlorpi=0
i=1
j=-1
k=0
if (interuptor==1) {
while (k<200) {
vlorpi+=-j*(4/i)
i=i+2
j=j*-1
k++}

alert("el valor de pi es "+vlorpi)
}
}

function ejercicio40() {
//Hacer un algoritmo en JavaScript que cumpla con la aproximación del número pi con la serie de Nilakantha. La formula que se debe aplicar es:
//Pi = = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - 4/(8*9*10) + 4/(10*11*12) - 4/(12*13*14) ...
i=-1
j=2
vlpi=3
l=4
m=0
n=3
let interr=parseInt(prompt("escribir 1comenzar 2cerar"))
if (interr==1) {
while (m<400) {
vlpi+=-i*(4/(j*n*l))
i=i*-1
j+++
n+++
l+++
m++
}
alert("el vlor de pi es "+vlpi)
}

}