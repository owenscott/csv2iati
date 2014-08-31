var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

var fs = require('fs');

Backbone.$ = $;

module.exports = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(fs.readFileSync('./client/templates/step.ejs').toString());
		this.taskView = this.model.get('task');
		if (!this.taskView) {
			throw new Error ('Step enabled without a task');
		}
		else {
			this.taskView.step = this.model;
			this.taskView.data = this.model.get('data');		
		}
	},

	events: {
		'click #nav-previous': 'navPrevious',
		'click #nav-next': 'navNext'
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.taskView.setElement('#task');
		this.taskView.render();
	},

	navPrevious: function() {
		this.model.get('previous').set('active', true);
	},

	navNext: function() {
		this.model.get('next').set('active', true);
	}

})