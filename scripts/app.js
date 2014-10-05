Backbone.View.prototype.close = function () {
    console.log('Closing view ' + this);
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};

// Override View.remove()'s default behavior
Backbone.View = Backbone.View.extend({
	remove: function() {
		// Empty the element and remove it from the DOM while preserving events
		$(this.el).empty().detach();

		return this;
	}
});



// MODELS

Rates = Backbone.Model.extend({
    urlRoot:"https://openexchangerates.org/api/latest.json?app_id=955605c9e4764913b707dd547bf2fa66"
});

RatesCollection = Backbone.Collection.extend({
    model:Rates,
    url:"https://openexchangerates.org/api/latest.json?app_id=955605c9e4764913b707dd547bf2fa66"
});


// VIEWS

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


// THE APP

var AppRouter = Backbone.Router.extend({

    initialize:function () {
    },

    routes:{
		"":"home"
    },

	home: function() {
		this.ratesList = new RatesCollection();
		this.ratesList.fetch({
			success:function () {
				var rates = app.ratesList;				
				app.showView('#app', new RateView({model:rates}));
			},
			error:function(){
				console.log("Error");
			}
		});
	},
    showView:function (selector, view) {
        if (this.currentView) {
			this.currentView.remove();
			this.currentView.close();
        }
        $(selector).html(view.render().el);
        this.currentView = view;
        return view;
    },

});

Handlebars.registerHelper("inverse", function(cad) {
  var inverserate = 1/cad;
  var roundinverse = Math.round(inverserate * 10000) / 10000
  return roundinverse;
});

Handlebars.registerHelper("cross", function(eur,cad) {
  var crossrate = 1 / (eur/cad)
  var roundcross = Math.round(crossrate * 10000) / 10000
  return roundcross;
});

Handlebars.registerHelper('dateFormat', function(stamp) {
	return moment.unix(stamp).format("MMM DD, YYYY hh:mm:ss A");
  // if (moment) {
  //   var f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
  //   return moment(context).format(f);
  // }else{
  //   return context;
  // };
});