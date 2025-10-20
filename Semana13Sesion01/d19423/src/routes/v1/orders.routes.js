const express = require('express');
const router = express.Router();
const {dtoCreateOrder} = require('../../middlewares/validates');

const multer = require('multer');
const upload = multer({
    dest: 'uploads/',
    limits: {fileSize: 2*1024*1024, files: 1}
});

const imgOnly = (req,file,cb)=>{
    if(!file.mimetype.startsWith('image/')) return cb(new Error('Only images allowed'));
    cb(null,true);
}

const uploadImage = multer({
    dest: 'uploads/',
    fileFilter: imgOnly
})

function requireAuth(req,res,next){
    if(req.headers['x-token']!== 'secret') return res.status(401).json({error: "Requiere Auth"});
    next();
}


router.use('/',requireAuth);
router.post('/', dtoCreateOrder, (req,res)=>{
    res.status(201).json({message:"Created", order: req.body});
})

router.post('/envio-captura',upload.single('captura'), (req,res)=>{
    res.json({
        originalName: req.file.originalname,
        storedAs: req.file.filename,
        size: req.file.size
    })
})

router.post('/fotos', uploadImage.array('photos',3),(req,res)=>{
    res.json({count: req.files.length});
})

const seen = new Map();

router.post('/payment', (req,res)=>{
    const key = req.headers['idempotency-key'];
    if(!key) return res.status(400).json({error: 'header idempotency-key is required'});
    if(seen.has(key)) return res.status(200).json(seen.get(key));
    const result = {paymentId: cryptoRandom(), status: 'ok'};
    seen.set(key, result);
    res.status(201).json(result);
})



function cryptoRandom(){ return Math.random().toString(36).slice(2)}

module.exports = router;