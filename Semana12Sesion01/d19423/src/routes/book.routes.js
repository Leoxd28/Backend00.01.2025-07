const router = require('express').Router();
const Book = require('../models/Book');


router.post('/', async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        // Book.find().then(data => {
        //     res.status(200).json(data);
        // })
    const {
        page=1, limit=20, select, q, sort='-createdAt', tag, inStock, minPrice, maxPrice
    } = req.query;
    console.log(q);
    const filter = {deletedAt: null};
    if(q) filter.$text= {$search: q};
    if(tag) filter.tags = tag.toLowerCase();
    if(inStock !== undefined) filter.inStock=inStock===true;
    if(minPrice||maxPrice){
        filter.price ={}
        if(minPrice) filter.price.$gte=Number(minPrice);
        if(maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page)-1)* Number(limit);
    const projection = select ? select.split(',').join(' '):'';
    const query =  Book.find(filter)
         .select(projection)
         .sort(sort)
         .skip(skip)
         .limit(Number(limit))
         .populate('author', 'name country')
         .lean();
      const [items, total] = await Promise.all([
          query,
          Book.countDocuments(filter)
     ])

    res.json({total, page: Number(page), items});

    } catch (error) {
        next(error)
    }
})
router.get('/:id', async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id).populate('author', 'name country');
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json({...book.toObject(), isClassic: book.isClassic});
    } catch (error) {
        next(error);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runVlidators: true });
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json(book);

    } catch (error) {
        next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, { deletedAt: new Date() }, { new: true });
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
})

router.get('/stats/top-tags', async(req,res,next)=>{
    try {
        const data = await Book.aggregate([
            {$match: {deletedAt:null}},
            {$unwind: '$tags'},
            {$group: {_id: '$tags', count: {$sum: 1}}},
            {$sort: {count: -1}},
            {$limit: 5}
        ])
        res.json(data);
    } catch (error) {
        next(error)
    }
})


module.exports = router;