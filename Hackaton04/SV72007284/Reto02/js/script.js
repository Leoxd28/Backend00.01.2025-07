//#region Ejercicio01
//Utilizando función arrow, crear una función que reciba como parámetros un nombre, apellido y edad y los retorne en un string concatenado “Hola mi nombre es sebastián yabiku y mi edad 33”
const parametrosConcatenados = (nombre, apellido, edad) => (`Hola mi nombre es ${nombre} ${apellido} y mi edad ${edad}`);
console.log(parametrosConcatenados("Alexander", "Córdova", 23));
//#endregion
//#region Ejercicio02
//Cree una función que tome números y devuelva la suma de sus cubos. sumOfCubes(1, 5, 9) ➞ 855
// Since 1^3 + 5^3 + 9^3 = 1 + 125 + 729 = 855
const sumaCubos = (...numeros) => {
    let suma = 0;
    for (let index = 0; index < numeros.length; index++) {
        suma += Math.pow(numeros[index], 3);
    }
    return suma;
}
console.log(sumaCubos(1, 5, 9));
//#endregion
//#region Ejercicio03
//Crear una funcion que me retorne el tipo de valor entregado, invocar la función para los distintos tipos de js
const tipoDeDato = (valor) => typeof (valor);
console.log(tipoDeDato(3));
//#endregion
//#region Ejercicio04
//Crear una función que reciba n cantidad de argumentos y los sume ( utilizar parametros rest)
const sumatoria = (...numbers) => {
    return numbers.reduce((acumulador, actual) => acumulador + actual, 0);
}
console.log(sumatoria(1, 2, 5, 22, 77));
//#endregion
//#region Ejercicio05
//Crear una función que reciba un array de valores y filtre los valores que no son string
let arrayValores = ["Aleander", 23, true, "Córdova"]
const filtrarString = (valores) => {
    return valores.filter(valor => typeof valor === "string");
}
console.log(filtrarString(arrayValores));
//#endregion
//#region Ejercicio06
//Cree una función que tome una matriz de números y devuelva los números mínimos y máximos, en ese orden.
//minMax([1, 2, 3, 4, 5]) ➞ [1, 5]
const minMax = (valores) => {
    const min = Math.min(...valores);
    const max = Math.max(...valores);
    return [min, max];
}
console.log(minMax([1, 2, 3, 4, 5]));
//#endregion
//#region Ejercicio07
//Escriba una función que tome una matriz de 10 enteros (entre 0 y 9) y devuelva una cadena en forma de un número de teléfono.
//formatPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) ➞ "(123) 456-7890"
const formatPhoneNumber = (valores) => {
    if (valores.length === 10) {
        const cadena = valores.join('');
        return (`(${cadena.slice(0, 3)}) ${cadena.slice(3, 6)}-${cadena.slice(6)}`);

    } else {
        console.log("La matriz debe contener solo 10 números");
    }

}
console.log(formatPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]))
//#endregion
//#region Ejercicio08
//Cree una función que tome una matriz de matrices con números. Devuelve una nueva matriz (única) con el mayor número de cada uno.
//findLargestNums([[4, 2, 7, 1], [20, 70, 40, 90], [1, 2, 0]]) ➞ [7, 90, 2]
const findLargestNums = (valores) => {
    return valores.map(matrizUnica => Math.max(...matrizUnica));
}
console.log(findLargestNums([[4, 2, 7, 1], [20, 70, 40, 90], [1, 2, 0]]));
//#endregion Ejercicio09
//#region 