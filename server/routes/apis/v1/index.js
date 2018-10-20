'use strict';

const
    express = require('express'),
    userController = require('../../../controllers/apis/user'),
    temperatureController = require('../../../controllers/apis/temperature'),
    queueController = require('../../../controllers/apis/queue'),
    itemController = require('../../../controllers/apis/item');


let router = express.Router();

router.use('/*', (req, res, next) => {
    console.log('v1 router called: ' + req.url);
    next();
});

router.use('/user', userController);
router.use('/temperature', temperatureController);
router.use('/queue', queueController);
router.use('/item', itemController);

module.exports = router;
