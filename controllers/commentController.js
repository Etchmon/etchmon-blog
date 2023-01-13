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
];

exports.get_comment = async function (req, res, next) {
    try {
        // Get comment from data-base
        const comment = await Comment.findById(req.params.id);
        // If search comes back empty return 404
        if (!comment) {
            return res.status(404).json({ err: 'comment not found' })
        };
        // Comment found, respond with json data
        res.status(200).json({ comment })
    } catch (err) {
        next(err);
    }
};

exports.get_comments = async function (req, res, next) {
    try {

    } catch (err) {

    }
};

exports.update_comment = async function (req, res, next) {
    try {

    } catch (err) {

    }
};

exports.delete_comment = async function (req, res, next) {
    try {

    } catch (err) {

    }
};

exports.delete_all_comments = async function (req, res, next) {
    try {

    } catch (err) {

    }
};
