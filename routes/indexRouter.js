var express = require('express');
var router = express.Router();
var index_controller = require('../controllers/indexController');

/* GET home page. */
router.get('/', index_controller.index_get);

router.get('/create-post', index_controller.create_post_get);

router.post('/create-post', index_controller.create_post);

router.get('/catalog', index_controller.catalog_get);

module.exports = router;
