const { StatusCodes } = require('http-status-codes');
const Comment = require('../models/Comment');


module.exports.createComment = (req, res, next) => {
    const { comment, id } = req.body;

    Comment.create({user: id, comment: comment})
    .then((created) => {
        res.status(StatusCodes.CREATED).json(created);
    })
    .catch(next)
}

module.exports.getComments = (req, res, next) => {
    const id = req.params.id;
    
    Comment.find({user: id})
    .populate('user')
    .then((comments) => {
        res.status(StatusCodes.OK).json(comments);
    })
    .catch(next)
}

module.exports.deleteComment = (req, res, next) => {
    const commentId = req.params.id;
    
    Comment.findByIdAndDelete(commentId)
    .then((deleted) => {
        res.status(StatusCodes.OK).json(deleted);
    })
    .catch(next)
}