const db = require('../models');
const Post = db.Post;
const User = db.User;


exports.addPost = async (req,res)=>{
    let post = req.body;
    post.authorId = req.params.authorId;
    
    console.log(post);
    await Post.create(post).then(data=>{
        res.status(201).send(data)
    }).catch(error=>{
        res.status(500).send({message:error})
    })
}

exports.getPosts = async(req,res)=>{
    await Post.findAll(
       
    ).then(data=>{
        res.status(200).send(data)
    }).catch(error=>{
        res.status(500).send({message:error})
    })
}

exports.deletePost = async(req,res)=>{
    await Post.destroy({
        where: { id: req.params.id },
     }).then(result => {
        if (result) {
            res.status(200).send({ message: `Record with ID ${req.params.id} deleted successfully.` });
        } else {
            res.status(200).send({ message: `No record found with ID ${req.params.id}.` });
        }

    }).catch(error => {
        console.log(error);
        res.status(500).send({ message: error })
    });
}