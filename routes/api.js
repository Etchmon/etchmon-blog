var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/authController');
const post_controller = require('../controllers/postController');

// ROUTES

/* index route*/
router.get('/', function (req, res, next) {
    res.redirect('/api/posts');
});

// GET all posts
router.get("/posts", post_controller.get_posts);

// GET a single post
router.get("/posts/:id", post_controller.get_post);

// CREATE a post
router.post("/posts", post_controller.create_post);

// PUT update post 
router.put("/posts/:id", post_controller.update_post);

// DELETE post
router.delete("/post/:id", post_controller.delete_post);

/// ----- LOGIN/LOGOUT ----- ///
router.get('/login', auth_controller.login_get);
router.post('/login', auth_controller.login_post);
// router.get('/logout', auth_controller.logout_get);

module.exports = router;
