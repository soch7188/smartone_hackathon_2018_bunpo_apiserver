'use strict';

const
    apiRoute = require('./apis')

function init(server) {
    server.get('*', function (req, res, next) {
        console.log('Request was made to: ' + req.originalUrl);
        return next();
    });

    server.get('/', function (req, res) {
        res.redirect('/error');
    });
    server.use('/api', apiRoute);
    server.use('/error', function(req, res){
        res.status(500).json({message: 'unknown error'})
    });
}

module.exports = {
    init: init
};