/* global Papa */

var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

var fs = require('fs');

Backbone.$ = $;

module.exports = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(fs.readFileSync('./client/templates/form.ejs').toString());
	},

	events: {
		'change #files': 'fileAdded',
		'click #new-file': 'newFile'
	},

	render: function() {
		this.$el.html(this.template(this.data.toJSON()));
	},

	fileAdded: function(e) {
		var files = e.target.files,
			headers = undefined,
			self = this;

		this.data.set('file', files[0]);

		$('#status').html('File loading...');

		Papa.parse(files[0], {
			worker: true,

			step: function(row) {
				//get first row (rest of executions is unused)
				//TODO: find a way to stop parsing the file after getting header row
				headers = headers || row.data[0];
				
				// $('#status').innerHTML('Processing file...');
			},
			complete: function() {
				self.data.set('headers', _.clone(headers));
				//TODO: replace this with the actual file API call
				self.step.set('complete', true);
			}
		})
	},

	newFile: function() {

		//TODO: kind of hacky, but only time we need to reset this so...meh
		this.data.set('file', '');
		this.data.set('fileName', '');
		this.data.set('headers', []);
		this.data.set('mappings', {});
		this.data.set('pkey', '');
		// end hack

		this.step.set('complete', false);
		this.render();

	}

})

