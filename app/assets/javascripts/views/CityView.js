var CityView = Backbone.View.extend({
    template:'',
    tagName: "li",

    initialize: function(options) {
        //define template structure
        var source   = "<span id='spanText'>x={{x}}, y={{y}}, diam={{diam}}</span><a href='#'>{{y}}</a>";
        //compile template using Handlebars
        this.template = Handlebars.compile(source);
    },

    events: {
        "click a": "onClicked"
    },

    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    onClicked: function(e) {
        //change the value of the item clicked
        $(e.target).css('color','#ffeecc').text('-i have been clicked').removeAttr('href');
    }

});