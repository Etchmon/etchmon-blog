const Post = require('../models/post');
const Comment = require('../models/comment');
const async = require('async');
const { body, validationResult } = require('express-validator');

exports.create_comment = [
    body("text").trim().escape(),

    async function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({
                data: req.body,
                errors: errors.array(),
            });
            return
        };
        const { text } = req.body;
        const postId = req.params.postid;
        const comment = new Comment(({ text, postId }));
        let post = await Post.findById(postId);
        post.comments = [...post.comments, comment];
        console.log(post.comments);
        comment.save((err) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({ msg: `comment ${comment._id} sent` });
        });
    },
]
