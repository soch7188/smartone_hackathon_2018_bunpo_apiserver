/**
 * Server Index
 *
 * @date 2018-01-13
 * @author 김지원
 * @updated 2018-01-13
 */

'use strict';

const
	express = require('express'),
	bodyParser = require('body-parser'),
	syncDatabase = require('./database'),
	morgan = require('morgan')

module.exports = function() {
	let
		server = express(),
		create,
		start;

	create = function(config) {
		let routes = require('./routes');

		// Server settings
		server.set('env', config.env);
		server.set('port', config.port);
		server.set('hostname', config.hostname);
		server.set('token_domain', config.token_domain);
		server.set('jwt_secret', config.jwt_secret); // secret variable

		// Enable CORS
		// server.use(function(req, res, next) {
		// 	console.log('Enable CORS')
		// 	let allowedOrigins = ['http://localhost:4000', 'http://localhost:80','http://localhost', 'http://localhost:8081',
		// 		"https://bundleport.com", "https://www.bundleport.com", "https://dev.bundleport.com",
		// 		"http://bundleport.com", "http://www.bundleport.com", "http://dev.bundleport.com",
		// 		'https://console.bundleport.com', 'http://console.bundleport.com'];

		// 	let origin
		// 	if (req.headers){
		// 		origin = req.headers.origin;
		// 	}
		// 	if(allowedOrigins.indexOf(origin) > -1){
		// 		res.header('Access-Control-Allow-Origin', origin);
		// 	} else {
		// 		res.header('Access-Control-Allow-Origin', '*');
		// 	}

		// 	if (origin){
		// 		console.log('origin: ' + origin);
		// 		res.setHeader('log-origin', origin)
		// 	}

		// 	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
		// 	res.header("Access-Control-Allow-Credentials", true);
		// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie");
		// 	next();
		// });

		// Returns middleware that parses json
		server.use(bodyParser.json());
		server.use(bodyParser.urlencoded({ extended: false })); // Extended: Support nested json

		// -------------- Forward HTTP to HTTPS ---------- //
		console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV)
        if (config.env !== 'production' && config.env !== 'dev') {
			server.use(morgan('dev'));      // MW: log requests to console
		} else {
			server.enable('trust proxy');
			server.use(function (req, res, next) {
				if (req.secure) {
					next();
				} else {
					res.redirect('https://' + req.headers.host + req.url);
				}
			});
			server.set('trust proxy', 1)
		}

		// Set up routes
		routes.init(server);
	};

	start = function() {
		let
			hostname = server.get('hostname'),
			port = server.get('port');

		server.listen(process.env.PORT || port, function (){
			console.log('Express server listening on - http(s)://' + hostname + ':' + port + '. Environment (config.env): ' + server.get('env'));
			console.log('process.env.PORT || server.get(\'port\') || 3000: ' + (process.env.PORT || port || 3000));
			syncDatabase().then(() => {console.log('Database sync');})
		})
	};

	return {
		create: create,
		start: start
	};
};

