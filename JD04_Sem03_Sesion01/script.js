/*document.getElementById("btn03").addEventListener("click", ()=>{
    alert("Hizo click en el boton 3")
});*/

// console.log("Hola");
// alert("Hola");

var nombre;
nombre = "Roberto";
var edad = 41;
var casado = false;

//nombre = 43;

var edad = 99;

const PI = 3.14159;

//PI = 3.121212;
//let edad = 88;
//let edad = 33;
{
    let edad = 99;
}

let resultado = document.getElementById("resultado");

let primerNumero = 33;
let segundoNmero = 44;
resultado.innerText = primerNumero+segundoNmero;

console.log(primerNumero + segundoNmero)

let apellido = "Pineda";

console.log(nombre+apellido)

console.log(edad);
console.log(edad++)
console.log(edad)

let estadoCivil = 'Soltero';
let descripcion = `Hola como estas
sigo en otra linea
y asi yal cual se va a ver en cualquier lado 
La edad de ${nombre} es ${edad}`

console.log(descripcion)
resultado.innerText = descripcion

let text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let length = text.length;

console.log(length)

text = "HELLO WORLD";
let char = text.at(4);
console.log(char    )

let text1 = "Hello";
let text2 = "World";
let text3 = text1.concat(" ", text2);

console.log(text3)

let str = "Apple, Banana, Kiwi";
console.log(str.substring(7, 13));

let fecha = "05/08/2025"

let dia = fecha.substring(0,2)
let mes = fecha.substring(3,5)
let año = fecha.substring(6,10)
console.log(año)

console.log(text1.toUpperCase())

text1 = "      Hello World!      ";
console.log(text1)
console.log( text1.trim());

text = "5";
console.log(text.padStart(4,"0"));
console.log(text.padEnd(4,"0"));

text = "Please visit Microsoft Microsoft!";
let newText = text.replace("Microsoft", "W3Schools");

console.log(newText)

text = "Please visit Microsoft and Microsoft!";
newText = text.replace(/Microsoft/g, "W3Schools");

console.log(newText)

let arrNumeros = [33,55,66,77];

console.log(arrNumeros[1])

let arrCosas = [33, "Roberto", true, 3.44];

console.log(arrCosas[0])

arrCosas.push(999)

console.log(arrCosas)

arrCosas.pop()
console.log(arrCosas)

arrCosas.shift()
console.log(arrCosas)


console.log(arrCosas.length)