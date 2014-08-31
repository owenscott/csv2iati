var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

Backbone.$ = $;

var StepsCollection = require('./../collections/steps.js'),
	Step = require('./step.js');

module.exports = Backbone.Model.extend({

	initialize: function() {
		activeStep: undefined	
	},

	defaults: {
		steps: new StepsCollection()
	}

})