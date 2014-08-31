var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

Backbone.$ = $;

module.exports = Backbone.Model.extend({

	initialize: function() {

	},

	defaults: {
		complete: false,
		enabled: false,
		active: false,
		name: '',
		isComplete: function() {return true},
		next: false,
		previous: false
	}

})