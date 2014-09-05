var Backbone = require('backbone'),
	_ = require('underscore'),
	$ = require('jquery');

var fs = require('fs');

Backbone.$ = $;

module.exports = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(fs.readFileSync('./client/templates/settings.ejs').toString());
	},

	events: {
		'change #pkey': 'onPkeySelect',
		'change sorted': 'onSortedChange'
	},

	render: function() {
		var self = this;
		this.$el.html(this.template(this.data.toJSON()));
	},

	onPkeySelect: function(e) {
		this.data.set('pkey', $(e.target).val());
		if (this.data.get('pkey')) {
			this.step.set('complete', true);
		}
		else {
			this.step.set('complete', false);
		}
	},

	onSortedChange: function() {
		//TODO: implement (not needed right now b/c server-side library only supports sorted CSVs)
	}

})
