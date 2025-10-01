const db = require('../models');
const Post = db.Post;
const User = db.User;
const Comment = db.Comment;

exports.createComment = async (req,res)=>{
    let newComment = {
        PostId: req.params.postId,
        UserId: req.params.userId,
        body: req.body.comment
    }

    await Comment.create(newComment).then(data=>{
        res.status(201).send(data)
    }).catch(error=>{
        res.status(500).send({message:error})
    })

}
exports.getComments = async(req,res)=>{

    await Comment.findAll({
        include:[
            {model:User}, 
            {model:Post}
        ]
    }
    ).then(data=>{
        res.status(200).send(data)
    }).catch(error=>{
        res.status(500).send({message:error})
    })
}