//TODO:
	//- figure out how to pipe to reply
	//- CSV2XML crashes when you only have one mapping
	//- need to sanitize XML output
	//- 

var Hapi = require('hapi'),
	fs = require('fs'),
	path = require('path'),
	CSV2XML = require('csv2xml'),
	_ = require('underscore');

var conf = JSON.parse(fs.readFileSync('./server/conf.json').toString());

if (process.argv[2]) {
	conf.host = process.argv[2];
}

if (process.argv[3]) {
	conf.port = process.argv[3];
}

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


//mappings route

server.route({
	path: '/api/xpaths/{version}',
	method: 'GET',
	handler: function(request, reply) {
		if (request.params.version === '1.4') {
			// var data = fs.createReadStream('./server/data/iati-activities-1.04.json');
			// reply(data);
			reply.file('./server/data/iati-activities-1.04.json');
		}
		else {
			reply('Incorrect version number');
		}

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
				var conf = _.pick(request.payload, 'primaryKey', 'sorted', 'mapping');
				conf.mapping = JSON.parse(conf.mapping);
				var parser = new CSV2XML(conf);
				parser.on('error', function(e) {
					console.log('caught parser error');
					reply('parser error');
				})
				parser.on('end', function() {
					reply('successful parsing');
				})
				var outfile = fs.createWriteStream('./output.xml')
				request.payload.file.pipe(parser)
				reply(parser);
			}
		}
});

server.start();

console.log('Server listening on ' + conf.host + ':' + conf.port);