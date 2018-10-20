const
    express = require('express');
    itemService = require('../../../services/item');

let router = express.Router();

// Authentication related User APIs.
router.post('/updateItemPrice', itemService.updateItemPrice);
router.get('/getItemPrice', itemService.getItemPrice);

module.exports = router;
