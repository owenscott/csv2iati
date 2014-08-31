var Hapi = require('hapi'),
	fs = require('fs'),
	path = require('path'),
	CSV2XML = require('csv2xml'),
	_ = require('underscore');

var conf = JSON.parse(fs.readFileSync('./server/conf.json').toString());

var server = new Hapi.Server(conf.host, conf.port);

server.route({
	path: '/',
	method: 'GET',
	handler: function(request, reply) {
		reply.file('./server/built-routes/index.html')
	}
})

//index.html route

server.route({
	path: '/assets/{type}/{resource}',
	method: 'GET',
	handler: function(request, reply) {
		reply.file(path.join('./server/built-assets/', request.params.type, '/', request.params.resource));
	}
});

//file upload route
//many thanks to http://stackoverflow.com/questions/21823379/how-to-upload-files-using-nodejs-and-hapi

server.route({
	path: '/submit-data',
	method: 'POST',
	config:{
			payload:{
		        maxBytes: 209715200,
		        output:'stream',
		        parse: true
		  },
			handler: function(request, reply) {
				var conf = _.pick(request.params, 'primaryKey', 'sorted', 'mapping');
				console.log(request.payload);
				reply('Processing File');
			}
		}
});

server.start();

console.log('Server listening on ' + conf.host + ':' + conf.port);