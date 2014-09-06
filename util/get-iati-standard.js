var request = require('request'),
	cheerio = require('cheerio'),
	_ = require('underscore'),
	fs = require('fs');


request('http://iatistandard.org/activity-standard/summary-table/', function(err, response) {
	var $ = cheerio.load(response.body);


	var table = $('#activity-standard-summary-table').find('.docutils');
	var rows = table.find('tr');
	var xpaths = [];

	// rows.forEach(function(r) {
	// 	console.log(r);
	// })

	_.range(0,rows.length).forEach(function(r) {
		// console.log(rows[r]);
		var childNodes = _.filter(rows[r].children, function(c) {
			return c.type && c.type === 'tag';
		})
		var contents = _.map(childNodes, function(n) {return n.children[0].data});
		var xpath = contents[5];
		
		//conciously ignoring root nodes for now
		if( xpath.indexOf('iati-activities/iati-activity') > -1 && (xpath.indexOf('text()') > -1 || xpath.indexOf('@') > -1)) {
			xpaths.push({
				label: xpath.replace(/iati-activities\/iati-activity\//, '').replace(/\/text\(\)/,''),
				value: xpath
			});
		}


	})

	xpaths.push({
		label: 'transaction/value',
		value: 'iati-activities/iati-activity/transaction/value/text()'
	});

	xpaths.push({
		label: 'title', 
		value: 'iati-activities/iati-activity/title/text()'
	})

	fs.writeFileSync('./server/data/iati-activities-1.04.json', JSON.stringify(xpaths));

	console.log(xpaths);


})