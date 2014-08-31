//TODO: 
//	- add autocomplete with jquery mixin
//	- add collection for mappings with extraction and validation methods
//		- each model should have it's value and validation state
//	- construct views from models and have them render on change
//	- get IATI values from API endpoint rather than hard-coded
//		- call should have versioning, as should mapping objects
//	- iterate through headers and do a findWhere from the collection to get mappings or add if don't exist

var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

var fs = require('fs');

var MappingView = require('./mappingRowView.js'),
	Mapping = require('./../../models/mapping');

Backbone.$ = $;

module.exports = Backbone.View.extend({

	initialize: function() {

	},

	events: {
		'click input[type="submit"]': 'submitForm'
	},

	render: function() {
		var self = this;
		this.data.get('headers').forEach(function(h) {
			console.log(h);
			self.$el.append('<div>foo</div>');
			var mappingView = new MappingView({
				el: self.$el.children().last(),
				model: new Mapping({header:h})
			})
			mappingView.render();
		})
	}

})

