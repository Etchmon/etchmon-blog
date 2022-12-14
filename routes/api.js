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

/// ----- LOGIN/LOGOUT ----- ///
router.get('/login', auth_controller.login_get);
router.post('/login', auth_controller.login_post);
// router.get('/logout', auth_controller.logout_get);

module.exports = router;
