RateView = Backbone.View.extend({		
	className: 'rate',

    initialize:function () {
    },

	render:function (eventName) {		
		this.template = Handlebars.compile( $('#test').html() );
        _.each(this.model.models, function (data) {
            $(this.el).html(this.template(data.attributes));
        }, this);
        return this;
	}
});