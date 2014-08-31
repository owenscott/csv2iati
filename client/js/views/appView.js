var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

var fs = require('fs');

var StepView = require('./stepView.js'),
	NavPillView = require('./sideNavPillView.js');

Backbone.$ = $;

module.exports = Backbone.View.extend({

	initialize: function() {
		this.template = fs.readFileSync('./client/templates/app.ejs').toString();
		this.collection.bind('change:active', this.render, this);
		this.collection.bind('change:enabled', this.render, this);
	},

	render: function() {

		var self = this

		this.$el.html(this.template);

		//create side nav
		this.collection.models.forEach(function(step) {
			self.$('#side-nav').append('<li></li>');
			var navPill = new NavPillView({
				el: self.$('#side-nav').children().last(),
				model: step
			})
			navPill.render();
		});

		var activeStep = this.collection.getActiveStep();

		var stepView = new StepView({
			el: '#step',
			model: activeStep
		})

		stepView.render();

	}

});