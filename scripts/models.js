Rates = Backbone.Model.extend({
    urlRoot:"https://openexchangerates.org/api/latest.json?app_id=955605c9e4764913b707dd547bf2fa66"
});

RatesCollection = Backbone.Collection.extend({
    model:Rates,
    url:"https://openexchangerates.org/api/latest.json?app_id=955605c9e4764913b707dd547bf2fa66"
});