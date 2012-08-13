var CityView = Backbone.View.extend({
    template:'',
    tagName: "li",

    initialize: function(options) {
        //define template structure
        var source   = "<span>x={{x}}, y={{y}}, diam={{diam}}</span>";
        //compile template using Handlebars
        this.template = Handlebars.compile(source);
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