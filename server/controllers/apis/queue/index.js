const
    express = require('express'),
    queueService = require('../../../services/queue');

let router = express.Router();

// Authentication related User APIs.
router.post('/update_queue', queueService.updateQueue);
router.get('/get_queue', queueService.getQueue);

module.exports = router;
