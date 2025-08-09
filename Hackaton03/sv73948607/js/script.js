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