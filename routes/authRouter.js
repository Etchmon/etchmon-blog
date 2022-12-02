var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/authController');

/// ----- LOGIN/LOGOUT ----- ///
router.get('/login', auth_controller.login_get);
router.post('/login', auth_controller.login_post);
// router.get('/logout', auth_controller.logout_get);

module.exports = router;
