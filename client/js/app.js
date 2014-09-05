//lib
var $ = require('jquery');

//main app
var AppView = require('./views/appView'),
	App = require('./models/app'),
	Steps = require('./collections/steps.js'),
	Step = require('./models/step.js'),
	Data = require('./models/data.js');

//tasks
var FileUpload = require('./views/steps/fileUploadView.js'),
	PrimaryKey = require('./views/steps/primaryKeyView.js'),
	Mapping = require('./views/steps/mappingView.js'),
	Instructions = require('./views/steps/instructions.js'),
	Submit = require('./views/steps/submitView.js');

$(document).ready(function() {

	var steps = new Steps(),
		data = new Data();

	//add steps to collection with add method to trigger listener

	steps.add({
		name:'Instructions',
		enabled: true,
		active: true,
		complete: true,
		task: new Instructions()
	})

	steps.add({
		name:'Upload CSV File',
		enabled: true,
		task: new FileUpload(),
		data: data
	})

	steps.add({
		name: 'Choose Primary Key',
		task: new PrimaryKey(),
		data: data
	});

	steps.add({
		name: 'Map CSV Fields to IATI',
		task: new Mapping(),
		data: data
	});

	steps.add({
		name: 'Convert to XML',
		task: new Submit(),
		data: data
	});

	var appView = new AppView({
		el: '#app',
		collection: steps
	})

	appView.render();

});