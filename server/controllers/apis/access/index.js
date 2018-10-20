const
    express = require('express'),
    accessService = require('../../../services/access');

let router = express.Router();

// Authentication related User APIs.
router.get('/get_access', accessService.getAccess);

module.exports = router;
