const express = require('express');
const {getCurrentDate, formatCurrency} = require("./utils")
const up  = require("upper-case");

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