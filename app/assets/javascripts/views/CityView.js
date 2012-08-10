var CityView = Backbone.View.extend({

    tagName: "li",

    initialize: function(options) {
        this.template = _.template("x=<%= x %>, y=<%= y %>, diam=<%= diam %>")//Handlebars.compile(options.template || "");
    },

    events: {
    },

    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    edit: function() {
    }

});