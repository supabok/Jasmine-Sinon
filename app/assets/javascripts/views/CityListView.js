var CityListView = Backbone.View.extend({
    tagName: "ul",
    className: "cities",

    initialize: function(_coll) {
        this.collection = _coll;
    },

    render: function() {
        return this;
    },

    addRadius: function(rad) {
        var view = new CityView({model: rad});
        $(this.el).append(view.render().el);
    }

});