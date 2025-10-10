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
        Book.find().then(data => {
            res.status(200).json(data);
        })


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

module.exports = router;