const router = require('express').Router();
const Author = require('../models/Author');


router.post('/', async(req, res, next)=>{
    try{
        const author = await Author.create(req.body);
        res.status(201).json(author);
    }
    catch(err){
        next(err);
    }
});


router.get('/', async(req,res,next)=>{
    try {
        // await Author.find().then(data=>{
        //     res.status(200).json(data)
        // })

        const{q, limit = 20, page= 1} = req.query;
        const filter = q ? {name: new RegExp(q, 'i')}:{};
        const skip = (Number(page)-1)*Number(limit);
        const [items, total] = await Promise.all([
            Author.find(filter).sort({name:1}).skip(skip).limit(limit).lean(),
            Author.countDocuments(filter)
        ]);
        res.json({total, page: Number(page), items});
        
    } catch (error) {
        next(error);
    }
})

router.get('/:id',async(req,res,next)=>{
    try {
        const author = await Author.findById(req.params.id);
        if(!author) return res.status(404).json({message: "Author not found"});
        res.json(author);
    } catch (error) {
        
    }
})

router.put('/:id',async(req,res,next)=>{
    try {
        const updated = await Author.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        )
        if(!updated)return res.status(404).json({message: "Author not found"});
        res.json(updated);
    } catch (error) {
        next(error);
    }
})

router.delete('/:id',async(req,res,next)=>{
    try {
        const deleted = await Author.findByIdAndDelete(req.params.id)
        if(!deleted)return res.status(404).json({message: "Author not found"});
        res.status(204).send();
    } catch (error) {
        next(error);
    }
})

module.exports = router;