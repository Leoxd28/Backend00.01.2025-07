function sumaDeCubos(...numeros) {
  return numeros.reduce((total, num) => total + Math.pow(num, 3), 0);
}
console.log(sumaDeCubos(1,5,9))
    