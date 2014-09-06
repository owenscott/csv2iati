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

		var self = this;

		$('#interface').html('<p>Uploading file...</p>');
		var data = new FormData();
		data.append('sorted', this.data.get('sorted'));
		data.append('primaryKey', this.data.get('pkey'));
		data.append('mapping', JSON.stringify(this.data.get('mappings').getFormattedMapping()));
		data.append('file', this.data.get('file'));


		//TODO: do some unit tests and see in how many browsers this actually works!
		var xhr = new XMLHttpRequest();
      xhr.open('POST', 'submit-data', true);
      xhr.onload = function(e) { 
      	self.step.set('complete', true); 
      	//see https://stackoverflow.com/questions/16086162/handle-file-download-from-ajax-post/23797348#23797348
        var blob = new Blob([this.responseText], {type: 'application/xml'});
        var url = window.URL || window.webkitURL;
        var downloadUrl = url.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'result.xml';
        document.body.appendChild(a);
        a.click();
      };
      xhr.onerror = function(e) {
      	alert('error', arguments);
      }
      xhr.send(data);
      return false;
		}



})