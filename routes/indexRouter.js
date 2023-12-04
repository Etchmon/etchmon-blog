var express = require('express');
var router = express.Router();
var post_controller = require('../controllers/postController');

// ROUTES

/* index route*/
router.get('/', post_controller.get_posts);

router.get('/create', post_controller.create_post_get);

router.get('/catalog', post_controller.get_catalog);

module.exports = router;
