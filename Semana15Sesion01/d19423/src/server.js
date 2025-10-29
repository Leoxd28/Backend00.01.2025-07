const express =  require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);

const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

const session = require('express-session');




require('dotenv').config();


const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET;

app.use(
    cookieSession({
        name: 'google-auth-session',
        keys:['key1','key2']
    })
);

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret: SECRET}));

app.get("/",(req,res)=>{
    res.send("Listo");
});

server.listen(PORT,()=>{
    console.log("Servidor iniciado");
})