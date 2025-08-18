const tipoValor = valor => typeof valor;

console.log(tipoValor(42)); 
console.log(tipoValor("hola")); 
console.log(tipoValor(true));
console.log(tipoValor([])); 
console.log(tipoValor(null)); 
console.log(tipoValor(undefined)); 
console.log(tipoValor(() => {}));