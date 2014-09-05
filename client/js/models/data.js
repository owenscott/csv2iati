var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

Backbone.$ = $;

module.exports = Backbone.Model.extend({

	initialize: function() {

	},

	defaults: {
		headers: [],
		mappings: {},
		pkey: '',
		sorted: true,
		file: '',
		fileName: ''
	}

})