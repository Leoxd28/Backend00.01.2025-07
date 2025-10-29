const express = require('express');
const router = express.Router();

router.get('/',(req,res)=> res.json({id:1, name:"David"}));
router.post('/', (req,res)=> res.status(201).json({id:2,...req.body}));
router.get('/:id', (req,res)=>res.json({id:req.params.id, name:"David"}));
router.put('/',(req,res)=>res.status(204).json({message:"Actualizado correctamente"}));

module.exports = router;