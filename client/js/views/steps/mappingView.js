//TODO: all of the code is pretty inefficient/inelegant for checking completeness
//	(add unit tests and then fix it)

var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

var fs = require('fs');

var MappingView = require('./mappingRowView.js'),
	Mapping = require('./../../models/mapping');

Backbone.$ = $;

var Mappings = require('./../../collections/mappings');

module.exports = Backbone.View.extend({

	initialize: function() {
		this.collection = new Mappings();
		this.collection.bind('change:value', this.checkComplete, this);
	},

	events: {
		'click input[type="submit"]': 'submitForm'
	},

	render: function() {

		var self = this;
		
		if (this.xpaths) {
			this.assignModelsToCollection();
			this.appendMappingsToView();
		}
		else {
			this.$el.html('<p>Loading...</p>')
			$.get('api/xpaths/1.4', function(data) {
				//TODO: should set content-type on the server to application/json so jquery parses automatically...
				if (typeof data === 'string') {
					data = JSON.parse(data);
				}
				self.xpaths = data;
				self.assignModelsToCollection();
				self.appendMappingsToView();
			})
		}

	},

	assignModelsToCollection: function() {

		var self = this;

		if(!this.collection.models.length) {
			this.data.get('headers').forEach(function(h) {
				self.collection.add({header: h, xpaths: self.xpaths})
			})
		}

		this.data.set('mappings', this.collection);

	},

	appendMappingsToView: function() {

		var tempEl = $('<div></div>');

		this.collection.models.forEach(function(h) {
			var foo = tempEl.append('<div></div>').children().last();
			var mappingView = new MappingView({
				el: foo,
				model: h
			})
			mappingView.render();
		})

		this.$el.html(tempEl);

	},

	checkComplete: function() {
		if (!this.collection.isInvalid() && this.collection.getCount() > 0) {
			this.step.set('complete', true);
		}
		else {
			this.step.set('complete', false);
		}
	}


})

