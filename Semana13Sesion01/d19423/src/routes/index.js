const express = require('express');
const router = express.Router();

const asyncMW = require('../middlewares/async');
//onst error = require('../middlewares/errorHandler');
const HttpError = require('../middlewares/httpError')

router.get('/health', (req,res)=>res.json({status:'ok'}));

router.get('/users/:id', (req,res)=>{

    const id = Number(req.params.id);
    console.log(id)
    if(Number.isNaN(id)) {
        res.status(400).send({message: "El parametro debe ser un numero"})
    }
    res.json({userId : id});

});

router.get('/orders/:year/:month',(req,res)=>{
    const {year, month} = req.params;
    const {status = "all", page= 1} = req.query;
    res.json({year, month, status, page: Number(page)});
});

router.route('/profile')
    .get((req,res)=>res.json({me: 'GET Profile'}))
    .post((req,res)=>res.json({me: 'POST Profile'}))
    .put((req,res)=>res.json({me: 'PUT Profile'}))
    .delete((req,res)=>res.json({me: 'DELETE Profile'}))
router.get('/risky', asyncMW(async (req,res)=>{
    const ok = Math.random()>0.5;
    if(!ok) throw new HttpError(503, "Servicio no disponible (Random)");
    res.json({ok})
}))

function validateCreateUser(req,res,next){
    const {email,name} = req.body || {};
    if(email||name) return next(new HttpError(400, "email y nombre son requeridos"));
    next();
}

function validateAccess(req,res,next){
    const {email,name} = req.body || {};
    if(email||name) return next(new HttpError(400, "el access es requeridos"));
    next();
}

router.get('/users', [validateAccess, validateCreateUser], (req,res)=>res.status(201).send({message:"Se creo correctamente"}));


router.use('/v1', require('./v1'));
router.use('/v2', require('./v2'));



module.exports = router;