var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

Backbone.$ = $;

var Step = require('./../models/step.js');

module.exports = Backbone.Collection.extend({

	initialize: function() {
		this.bind('add', this.onModelAdded, this)
		this.bind('change:active', this.setModelsAsInactive, this);
		this.bind('change:complete', this.onCompleteChange, this);
		this.bind('change:enabled', this.onEnabledChange, this);
	},

	model: Step,

	getActiveStep: function() {
		var activeSteps = _.filter(this.models, function(m) {
			return m.get('active');
		})

		return _.first(activeSteps);
	},

	//incrementally create a doubly linked-list type data structure
	onModelAdded: function(model, collection, options) {
		var currentStepIndex = collection.length - 1;
		if (collection.length > 1) {
			collection.models[currentStepIndex - 1].set('next', model);
			collection.models[currentStepIndex].set('previous', collection.models[currentStepIndex - 1]);
		} 
	},

	//when one step is set as active, set others as inactive
	setModelsAsInactive: function(model) {
		_.chain(this.models)
			.filter(function(m) { return m !== model; })
			.each(function(m) {
				m.set('active', false, {silent:true});
			})
	},

	//enables or disables the next step when a step is completed/uncompleted
	onCompleteChange: function(model, complete) {
		console.log('complete changed');
		if (complete) {
			model.get('next') && model.get('next').set('enabled', true);
		}
		else {
			model.get('next') && model.get('next').set('enabled', false)
		}
	},

	//makes sure that if any step is disabled all subsequent steps are disabled
	onEnabledChange: function(model, enabled) {
		if(!enabled) {
			this._recursivelyDisableSteps(model);
		}
	},

	_recursivelyDisableSteps: function(model) {
		
		if (model.get('next') && model.get('next').get('enabled') === true) {
			model.set('enabled', false, {silent:true});
			model.set('complete', false, {silent:true}); //only trigger re-rendering at end of cascade
			this._recursivelyDisableSteps(model.get('next'));
		}
		else {
			model.set('complete', false, {silent:true});
			model.set('enabled', false);
		}
	}



})