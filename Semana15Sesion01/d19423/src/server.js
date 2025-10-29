const express =  require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

const session = require('express-session');

const con = require('./database/db');



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

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/login.html')
})

let username;
let connections = [];
function chat_start(){
    io.sockets.on('connection',(socket)=>{
        connections.push(socket);
        socket.on('disconnect',(data)=>{
            connections.splice(connections.indexOf(data), 1);

        });
        socket.on('initial-messages', (data)=>{
            console.log(data)
            sql = "Select * from message";
            con.query(sql, (err, result, fields)=>{
                let jsonMessages = JSON.stringify(result);
                io.sockets.emit('initial-messages', {msg:jsonMessages});
            })
        });
        socket.on('username',(data)=>{
            console.log(data);
            socket.emit('username', {username: username});
        })
    })
}


function authenticate(req, res){
    if(!req.session.user){
         res.sendFile(__dirname+'/public/login.html')
    }else{
        username = req.session.user;
        res.sendFile(__dirname+'/public/chat.html')
    }
}

function login(req,res){
    let post = req.body;
    username = post.user;
    let password = post.password;
    console.log(req.body)
    let sql = `select * from login where usermane = '${username}' `;
    con.query(sql, (err,result,fields)=>{
        console.log(result);
        if(result.length === 1){
            let jsonString = JSON.stringify(result);
            let jsonData = JSON.parse(jsonString);
            if(password == jsonData[0].password){
                req.session.user = post.user;
                username = post.user;
                res.redirect('/chat_start');
            }
            else{
                res.redirect('/login');
            }
        }
        else{
            res.redirect('/login');
        }
    })
}

app.get('/login', (req,res)=>{
    authenticate(req,res);
});
app.post('/login',(req,res)=>{
    login(req,res);
});

app.get('/chat_start',(req,res)=>{
    authenticate(req,res);
})
app.get('/logout',(req,res)=>{
    delete req.session.user;
    req.session = null;
    res.redirect('/login');
})
chat_start();
server.listen(PORT,()=>{
    console.log("Servidor iniciado");
})