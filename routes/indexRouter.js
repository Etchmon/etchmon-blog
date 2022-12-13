var express = require('express');
var router = express.Router();
var post_controller = require('../controllers/postController');

/* GET home page. */
router.get('/', post_controller.index_get);

router.get('/create-post', post_controller.create_post_get);

router.post('/create-post', post_controller.create_post);

router.get('/catalog', post_controller.catalog_get);

module.exports = router;
