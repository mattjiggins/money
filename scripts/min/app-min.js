Backbone.View.prototype.close=function(){console.log("Closing view "+this),this.beforeClose&&this.beforeClose(),this.remove(),this.unbind()},Backbone.View=Backbone.View.extend({remove:function(){return $(this.el).empty().detach(),this}}),Rates=Backbone.Model.extend({urlRoot:"https://openexchangerates.org/api/latest.json?app_id=955605c9e4764913b707dd547bf2fa66"}),RatesCollection=Backbone.Collection.extend({model:Rates,url:"https://openexchangerates.org/api/latest.json?app_id=955605c9e4764913b707dd547bf2fa66"}),RateView=Backbone.View.extend({className:"rate",initialize:function(){},render:function(e){return this.template=Handlebars.compile($("#test").html()),_.each(this.model.models,function(e){$(this.el).html(this.template(e.attributes))},this),this}});var AppRouter=Backbone.Router.extend({initialize:function(){},routes:{"":"home"},home:function(){this.ratesList=new RatesCollection,this.ratesList.fetch({success:function(){var e=app.ratesList;app.showView("#app",new RateView({model:e}))},error:function(){console.log("Error")}})},showView:function(e,t){return this.currentView&&(this.currentView.remove(),this.currentView.close()),$(e).html(t.render().el),this.currentView=t,t}});Handlebars.registerHelper("inverse",function(e){var t=1/e,n=Math.round(1e4*t)/1e4;return n}),Handlebars.registerHelper("cross",function(e,t){var n=1/(e/t),o=Math.round(1e4*n)/1e4;return o}),Handlebars.registerHelper("dateFormat",function(e){return moment.unix(e).format("MMM DD, YYYY hh:mm:ss A")});