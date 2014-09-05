//TODO: all of the code is pretty inefficient/inelegant for checking completeness
//	(add unit tests and then fix it)

var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

Backbone.$ = $;

var Mapping = require('./../models/mapping.js');

module.exports = Backbone.Collection.extend({
	
	initialize: function() {
		this.on('change:value', this.validateMappings);
	},

	model: Mapping,

	validateMappings: function() {

		this.models.forEach(function(m) {
			m.set('invalid', false, {silent:true})
		})

		var hashMap = {};
		
		var nonEmptyModels = _.chain(this.models).filter(function(m) {return m.get('value')}).value();

		nonEmptyModels.forEach(function(m) {
			var key = m.get('value');
			if (hashMap[key]) {
				hashMap[key] = hashMap[key] + 1;
			}
			else {
				hashMap[key] = 1
			}
		})

		nonEmptyModels.forEach(function(m) {
			var key = m.get('value');
			if (hashMap[key] > 1 && m.get('invalid') === false) {
				m.set('invalid', true);
			}
			else if (hashMap[key] === 1 && m.get('invalid') === true) {
				m.set('invalid', false);
			}
		})

	},

	isInvalid: function() {
		//TODO: there is a better function than uniq (am on an airplane)
		var valids = _.chain(this.models).map(function(m) {return m.get('invalid')}).contains(true).value();
		return valids;
	},

	getCount: function() {
		var models = _.chain(this.models).map(function(m) {return m.get('value')}).compact().value();
		return models.length;
	},

	getFormattedMapping: function() {
		
		var result = {};

		_.chain(this.models)
			.filter(function(m) {
				return m.get('value');
			})
			.each(function(m) {
				result[m.get('header')] = m.get('value');
			})

		return result;

	}

})