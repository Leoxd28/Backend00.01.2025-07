const mongoose = require('mongoose');
const Author = require('../models/Author');
const Book = require('../models/Book');
const router = require('express').Router();

router.post('/author-book', async (req,res,next) => {
    
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        
        const {author, book} = req.body;
        const createdAuthor = await Author.create([author], {session});
        const createdBook = await Book.create([{...book, author: createdAuthor[0]._id}], {session});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({author: createdAuthor[0]._id, book: createdBook[0]});

    } catch (error) {
        
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

})

module.exports = router;
