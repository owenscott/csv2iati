var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

var fs = require('fs');

Backbone.$ = $;

module.exports = Backbone.View.extend({

	initialize: function() {
		this.template = '<p>Do things</p>';
	}, 

	render: function() {
		this.$el.html(this.template);
	}

})

