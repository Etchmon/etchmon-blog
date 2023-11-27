var Post = require('../models/post');
var async = require('async');
const { body, validationResult } = require("express-validator");

// Exports create_post, get_posts, get_post, update_post, and delete_post

// index_get
exports.get_posts = async (req, res, next) => {

    try {
        // Populate posts to be displayed on homepage.
        const posts = await Post.find();
        if (!posts) {
            return res.status(404).json({ err: "posts not found" })
        }
        // res.status(200).json({ posts });
        res.render('catalog', { posts: posts })
    } catch (err) {
        return next(err);
    }
};

exports.get_post = async function (req, res, next) {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ err: `post with id ${req.params.id} not found` })
        };
        res.status(200).json({ post })
    } catch (err) {
        next(err);
    }
};

exports.update_post = async function (req, res, next) {
    try {
        let post = await Post.findById(req.params.id);
        post.title = req.body.title;
        post.text = req.body.text;
        post = await post.save();
        if (!post) {
            return res.status(404).json({ msg: "update failed" });
        };
        res.status(200).json({ msg: "updated succesfully" })
    } catch (err) {
        next(err);
    }
};

exports.delete_post = async function (req, res, next) {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        };
        res.status(200).json({ msg: 'Post deleted successfully' });
    } catch (err) {
        next(err);
    };
};

exports.create_post_get = (req, res, next) => {
    console.log(res.locals.currentUser);
    if (!res.locals.currentUser) {
        // Users not logged in cannot access "create a message page"
        return res.redirect("/api/login");
    }
    res.render('create-post', { user: req.user });
};

exports.create_post = [
    body("title").trim().escape(),
    body("text").trim().escape(),

    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json({
                data: req.body,
                errors: errors.array(),
            })
        };

        const post = new Post({
            title: req.body.title,
            text: req.body.text,
            date: Date.now()
        });

        post.save((err) => {
            if (err) {
                return next(err);
            };
            res.status(200).json({ msg: "post sent" })
        });
    }
];

exports.delete_post = async function (req, res, next) {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ err: `posts with id ${req.params.id} not found` });
        }
        res.status(200).json({ msg: `post with id ${req.params.id} deleted successfully` });
    } catch (err) {
        next(err);
    }
};

exports.update_post = async function (req, res, next) {
    try {
        let post = await Post.findById(req.params.id);
        post.title = req.body.title;
        post.text = req.body.text;
        post = await post.save();
        if (!post) {
            return res.status(404).json({ msg: `update failed` });
        }
        res.status(200).json({ msg: `update successful` })
    } catch (err) {
        next(err);
    }
}
