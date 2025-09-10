const express = require('express');

const {getCurrentDate, formatCurrency} = require("./utils")
const up  = require("upper-case");


console.log("Inicio de la aplicacion de Jhosep Cueva ")

const app = express();
app.get('/', (req, res) => {

    let strHtml = "";
    strHtml+='Hello World! Hola ' + getCurrentDate()
    strHtml+=`<h1>Welcome to our app!</h1>`;
    strHtml+=`<p>Current date: ${getCurrentDate()}</p>`;
    strHtml+=`<p>Formatted amount: ${formatCurrency(99.99)}</p>`;
    res.send(up.upperCase(strHtml))
});
app.listen(8080);

const app = express();
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(8080);

// Variables (let, const, var)
let name = 'Node.js';
const version = 20;

// Function declaration
function greet(user) {
  return `Hello, ${user}!`; // Template literal (ES6)
}

// Arrow function (ES6+)
const add = (a, b) => a + b;

console.log(greet('Developer')); // Hello, Developer!
console.log(add(5, 3)); // 8
// Object
const user = {
  name: 'Alice',
  age: 25,
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

// Array
const colors = ['red', 'green', 'blue'];

// Array methods (ES6+)
colors.forEach(color => console.log(color));
const lengths = colors.map(color => color.length);
console.log(user)

