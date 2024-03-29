const Post = require('../models/post');
const Comment = require('../models/comment');
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
        };

        console.log('here');
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
        // Get comment from database
        const comment = await Comment.findById(req.params.commentid);
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
        // Get all comments from database
        const allComments = await Comment.find();
        const comments = allComments.filter((comment) => comment.postId).sort((a, b) => b.date - a.date);
        console.log(comments);
        // If search comes back empty return 404
        if (!comments) {
            return res.status(404).json({ err: 'Comment not found' });
        };
        // Comment found, respond with json data}
        res.status(200).json({ comments });

    } catch (err) {
        next(err);
    }
};

exports.update_comment = async function (req, res, next) {
    try {
        const { text } = req.body;
        const comment = await Comment.findByIdAndUpdate(req.params.commentid, { text });
        if (!comment) {
            return res.status(404).json({ err: 'Comment not found' });
        };
        res.status(200).json({ msg: "Comment updated successfully" });
    } catch (err) {
        next(err);
    }
};

exports.delete_comment = async function (req, res, next) {
    try {
        let commentId = req.params.commentid;
        // Delete comment from post
        let post = await Post.findById(req.params.postid);
        let postComment = await Comment.findById(commentId);
        let newComments = await post.comments.filter((comment) => comment.toString() !== postComment._id.toString());
        post.comments = [...newComments];
        post = await post.save();
        // Delete comment from comments
        const comment = await findByIdAndDelete(commentId);
        if (!comment) {
            return res.status(404).json({ err: 'Comment not found' });
        };
        res.status(200).json('Comment deleted successfully');
    } catch (err) {
        next(err);
    }
};

exports.delete_all_comments = async function (req, res, next) {
    try {
        const comment = await Comment.deleteMany({ postId: req.params.postid });
        if (!comment) {
            return res.status(404).json({ err: 'Comment not found' });
        }
        res.status(200).json('Comments deleted succesfully');
    } catch (err) {
        next(err);
    }
};
