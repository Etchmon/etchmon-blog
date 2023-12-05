var express = require('express');
var router = express.Router();
var post_controller = require('../controllers/postController');

// ROUTES

/* index route*/
router.get('/', post_controller.get_posts);

// GET create post page
router.get('/create', post_controller.create_post_get);

module.exports = router;
