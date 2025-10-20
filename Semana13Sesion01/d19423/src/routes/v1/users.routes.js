const express = require('express');
const router = express.Router();

router.get('/',(req,res)=> res.json({id:1, name:"Roberto"}));
router.post('/', (req,res)=> res.status(201).json({id:2,...req.body}));
router.get('/:id', (req,res)=>res.json({id:req.params.id, name:"David"}));

module.exports = router;