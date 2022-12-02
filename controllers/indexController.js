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