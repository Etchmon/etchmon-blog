var express = require('express');
var router = express.Router();
const auth_controller = require('../controllers/authController');
const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

// ROUTES

/* index route*/
router.get('/', function (req, res, next) {
    res.redirect('/api/posts');
});

// GET all posts
router.get("/posts", post_controller.get_posts);

// GET a single post
router.get("/posts/:id", post_controller.get_post);

// POST a post
router.post("/posts", post_controller.create_post);

// PUT update post 
router.put("/posts/:id", post_controller.update_post);

// DELETE post
router.delete("/posts/:id", post_controller.delete_post);

// POST a comment
router.post("/posts/:postid/comments", comment_controller.create_comment);

// GET all comments
router.get("/posts/:postid/comments", comment_controller.get_comments);

// GET a single comment
router.get("/posts/:postid/comments/:commentid", comment_controller.get_comment);

// DELETE a comment
router.delete("/posts/:postid/comments/:commentid", comment_controller.delete_comment);

// DELETE all comments
router.delete("/posts/:postid/comments", comment_controller.delete_comment);

// PUT update a comment
router.put("/posts/:postid/comments/:commentid", comment_controller.update_comment);

/// ----- LOGIN/LOGOUT ----- ///
router.get('/login', auth_controller.login_get);
router.post('/login', auth_controller.login_post);
// router.get('/logout', auth_controller.logout_get);

module.exports = router;
