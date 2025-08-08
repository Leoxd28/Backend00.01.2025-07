let arrDatos = [true, 12, "Roberto"];

console.log(arrDatos[1])

let objDatos = {
    nombre: "Roberto",
    apellido: "Pineda",
    isSoltero: true,
    edad: 41,
    hobbies: ["aeromodelismo", "musica", "gunpla"],
    padre: {
        nombre: "Rene",
        edad: 65
    }
    ,
    madre: {
        nombre: "Miriam",
        edad: 52
    }
}

objDatos.padre.nombre = "Mauro"

console.log(objDatos.padre.nombre)
console.log(objDatos["padre"])

arrDatos.push(objDatos);

console.log(arrDatos);

if (objDatos.padre.nombre == "Mauro") {
    console.log("Su nombre si es Mauro")
} else {
    console.log("Su nombre no es Mauro")
}

let numero = 55;

if (numero === 55 && numero === undefined) {
    console.log("Si es el 55 y no es indefinido")
} else {
    console.log("No es 55")
}

if (numero === 55) {

} else if (numero === undefined) {

}
else {

}

const today = new Date();
const dayNumber = today.getDay();
console.log(today)
console.log(dayNumber)

switch (dayNumber) {
    case 0:
        console.log("Lunes")
        break;
    case 1:
        console.log("Martes")
        break;
    case 2:
        console.log("Miercoles");
        break;
    case 3:
        console.log("Jueves")
        break;
    case 4:
        console.log("Viernes")
        break;
    case 5:
        console.log("Sabado")
        break;
    default:
        console.log("Domingo")
        break;
}

let edad = 18
let respuesta = edad >= 18 ? "Si puede votar" : "No puede votar"
console.log(respuesta)
let dage = "Cuarenta y uno"
age = Number(dage);
if (isNaN(age)) {
    voteable = "Input is not a number";
    console.log(voteable)
} else {
    voteable = (age < 18) ? "Too young" : "Old enough";
    console.log(voteable)
}

for (let index = 0; index < 10; index++) {
    console.log(index)
}

for (let index = 0; index < arrDatos.length; index++) {
    const element = arrDatos[index];
    console.log(element)
}

arrDatos.forEach(element => {
    console.log(element)
})

arrDatos.map(e => console.log(e))


let bandera = true;
let indice = 0;

while (bandera) {

    indice++
    console.log(indice);
    if (indice === 10) {
        bandera = false
    }
}


bandera = true
do {
    indice--
    console.log(indice);
    if (indice === 0) {
        bandera = false
    }
} while (bandera);

const person = { fname: "John", lname: "Doe", age: 25 };

let text = "";
for (let x in person) {
    text += person[x];
    console.log(text)
}


function sumar(primerNumero, segundoNmero = 0) {
    console.log("Voy a empezar a sumar");
    return primerNumero + segundoNmero
}

let result = sumar(88, 99);
console.log(result)


result = sumar(77, 44);
console.log(result)


result = sumar(77);
console.log(result)


function isPalindromo(frase) {
    const limpio = frase.toLowerCase().replace(/[^a-z0-9]/g, '');
    return limpio === limpio.split('').reverse().join('');
}

// if (isPalindromo("hola lola")) {
//     alert("SI")
// } else {
//     alert("no")
// }

function isPrimo(numero) {
    if (numero <= 1) return false;
    if (numero === 2) return true;
    if (numero % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(numero); i += 2) {
        if (numero % i === 0) return false
    }
    return true;
}

console.log(isPrimo(1))
console.log(isPrimo(2))
console.log(isPrimo(3))
console.log(isPrimo(4))
console.log(isPrimo(5))
console.log(isPrimo(6))
console.log(isPrimo(7))