var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

var fs = require('fs');

//this is https://github.com/danielfarrell/bootstrap-combobox modified for cjs
var comboBoxPlugin = require('./../../lib/bootstrap-combobox.js');

comboBoxPlugin($);

Backbone.$ = $;

module.exports = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(fs.readFileSync('./client/templates/mappingRow.ejs').toString());
		this.model.bind('change', this.render, this);
	},

	events: {
		'change select': 'onNewSelection'
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$('select').combobox();
	},

	onNewSelection: function(e) {
		this.model.set('value', e.target.value);
	}


})