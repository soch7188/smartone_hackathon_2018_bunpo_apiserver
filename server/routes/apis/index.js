'use strict';

const
    express = require('express'),
    v1ApiRoute = require('./v1');

let router = express.Router();

router.use('/*', (req, res, next) => {
    console.log('apis router called: ' + req.url);
    next();
});

router.use('/v1', v1ApiRoute);

module.exports = router;
