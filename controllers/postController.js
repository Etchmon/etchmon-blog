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
        res.status(200).json({ posts });
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

exports.create_post_get = (req, res, next) => {
    if (!res.locals.currentUser) {
        // Users not logged in cannot access "create a message page"
        return res.redirect("/users/login");
    }
    res.render('create-post', { user: req.user });
};

exports.create_post = [
    body("title").trim().isLength({ min: 1 }).withMessage("Title must not be empty"),
    body("content").trim().isLength({ min: 1 }).withMessage("Text must not be empty"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("create-post", { errors: errors.array() });
        };

        const post = new Post({
            title: req.body.title,
            text: req.body.content,
            date: Date.now()
        });

        post.save((err) => {
            if (err)
                return next(err);
            res.redirect("/");
        });
    }
];
