var express = require('express');
var router = express.Router();
var post_controller = require('../controllers/postController');

// ROUTES

/* index route*/
router.get('/', function (req, res, next) {
    res.redirect('/api/posts');
});

module.exports = router;
