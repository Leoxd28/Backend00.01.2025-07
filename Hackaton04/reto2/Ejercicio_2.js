const sumOfCubes = (...numeros) =>  numeros.reduce((total, num) => total + Math.pow(num, 3), 0);

console.log(sumOfCubes(1, 5, 9));