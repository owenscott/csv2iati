var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

var fs = require('fs');

Backbone.$ = $;

module.exports = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(fs.readFileSync('./client/templates/submit.ejs').toString());
	},

	events: {
		'click #submit': 'onSubmit'
	},

	render: function() {
		this.$el.html(this.template(this.data.toJSON()));
	},

	onSubmit: function() {

		$('#interface').html('<p>Uploading file...</p>');
		var data = new FormData();
		data.append('sorted', this.data.get('sorted'));
		data.append('primaryKey', this.data.get('pkey'));
		data.append('mapping', JSON.stringify(this.data.get('mappings').getFormattedMapping()));
		data.append('file', this.data.get('file'));

		//TODO: get this to work
		// $.ajax('http://localhost:8000/submit-data', {
		// 	type: 'POST',
		// 	complete: function() {
		// 		console.log('post request complete')
		// 	},
		// 	success: function() {
		// 		console.log('post request success')
		// 	},
		// 	// contentType: 'multipart/form-data',
		// 	data: data,
		// 	error: function() {
		// 		//TODO: error handling
		// 		console.log('post request error')
		// 	},

		// })

		var xhr = new XMLHttpRequest();
      xhr.open('POST', 'submit-data', true);
      xhr.onload = function(e) { alert(this.responseText) };
      xhr.send(data);
      return false;
		}



})