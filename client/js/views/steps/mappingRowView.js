var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

var fs = require('fs');

module.exports = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(fs.readFileSync('./client/templates/mappingRow.ejs').toString());
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
	}


})