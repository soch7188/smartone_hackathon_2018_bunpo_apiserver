const
    express = require('express');
	userService = require('../../../services/user');

let router = express.Router();

// Authentication related User APIs.
router.post('/register', userService.registerUser);
router.post('/update_name', userService.updateName);
router.post('/update_points', userService.updatePoints);
router.get('/points', userService.getPoints);

module.exports = router;
