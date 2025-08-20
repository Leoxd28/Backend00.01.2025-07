const squaresSum = n => Array.from({length: n}, (_, i) => (i+1)**2).reduce((a,b) => a+b, 0);

console.log(squaresSum(3));