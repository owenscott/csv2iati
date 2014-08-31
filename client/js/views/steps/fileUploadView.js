/* global Papa */

var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

var fs = require('fs');

Backbone.$ = $;

module.exports = Backbone.View.extend({

	initialize: function() {
		this.template = fs.readFileSync('./client/templates/form.ejs').toString();
	},

	events: {
		'change #files': 'fileAdded'
	},

	render: function() {
		this.$el.html(this.template);
	},

	fileAdded: function(e) {
		var files = e.target.files,
			headers = undefined,
			self = this;


		Papa.parse(files[0], {
			step: function(row) {
				//get first row (rest of executions is unused)
				//TODO: find a way to stop parsing the file after getting header row
				headers = headers || row.data[0]
			},
			complete: function() {
				self.data.set('headers', _.clone(headers));
				self.step.set('complete', true);
			}
		})
	}

})

