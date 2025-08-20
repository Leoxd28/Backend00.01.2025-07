function calculator(num1, operacion, num2) {
  switch (operacion) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case 'x':
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    case '%':
      return num1 % num2;
    default:
      return "El parámetro no es reconocido";
  }
}
console.log(calculator(2,'+',6))