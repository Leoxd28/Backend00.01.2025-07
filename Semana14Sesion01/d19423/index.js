require('dotenv').config();

const PORT = process.env.PORT || 8080;
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cookieSesion = require('cookie-session');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({windowMs: 60_000, max: 100});

app.use('/api/', limiter);
app.use(
    cookieSesion({
        name: "auth-session",
        keys: [process.env.COOKIE_SECRET],
        httpOnly:true
}));

require('./src/routes/auth.routes')(app);

app.get('/',(req,res)=>{
    res.send('Hola');
})

const db = require('./src/models');
const Role = db.role;

db.mongoose.connect(process.env.MONGO_URI,{}).then(()=>{
    console.log("Estas conectado");
    init();
}).catch((error)=>{
    console.log(error)
    process.error(error);
    process.exit();
})


function init(){
    Role.estimatedDocumentCount((err,count)=>{
        if(!err & count === 0){
            new Role({
                name: "user"
            }).save((error)=>{
                if(error){
                    console.log("Error al crear el Rol user");
                }
                console.log("Rol user creado");
            })
            new Role({
                name: "moderator"
            }).save((error)=>{
                if(error){
                    console.log("Error al crear el Rol moderator");
                }
                console.log("Rol moderator creado");
            })
            new Role({
                name: "admin"
            }).save((error)=>{
                if(error){
                    console.log("Error al crear el Rol admin");
                }
                console.log("Rol admin creado");
            })
        }
    })
}

app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})