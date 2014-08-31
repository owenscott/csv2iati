var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

var fs = require('fs');

module.exports = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(fs.readFileSync('./client/templates/sideNavPill.ejs').toString());
		this.model.bind('change:complete', this.render, this);
	},

	events: {
		'click': 'onClick'
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));

		if(this.model.get('active')) {
			this.$el.addClass('active');
		}

		if(!this.model.get('enabled')) {
			this.$el.addClass('disabled');
		}

	},

	onClick: function() {
		if (this.model.get('enabled')) {
			this.model.set('active', true)
		}
	}

})