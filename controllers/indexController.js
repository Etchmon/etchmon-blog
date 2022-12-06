var Post = require('../models/post');
var async = require('async');
const { body, validationResult } = require("express-validator");

// index_get
exports.index_get = async (req, res, next) => {

    try {
        // Populate posts to be displayed on homepage.
        const posts = await Post.find();
        return res.render('index', { user: req.user, posts: posts })
    } catch (err) {
        return next(err);
    }
};

exports.create_post_get = (req, res, next) => {
    if (!res.locals.currentUser) {
        // Users not logged in cannot access "create a message page"
        return res.redirect("/users/login");
    }
    res.render('create-post', { user: req.user });
}

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

exports.catalog_get = async (req, res, next) => {
    if (!res.locals.currentUser) {
        // Users not logged in cannot access "create a message page"
        return res.redirect("/");
    };

    try {
        // Populate posts to be displayed on catalog page
        const posts = await Post.find();
        return res.render('catalog', { user: req.user, posts: posts });
    } catch (err) {
        return next(err);
    }
}
