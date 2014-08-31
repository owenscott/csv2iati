var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

Backbone.$ = $;

module.exports = Backbone.Model.extend({

	defaults: {
		headers: []
	}

})