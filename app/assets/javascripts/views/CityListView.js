var CityListView = Backbone.View.extend({
    tagName: "ul",
    className: "cities",

    initialize: function(_coll) {
        this.collection = _coll;
    },

    render: function() {
        var _this = this;
        _.each(this.collection.models, function(_id) {
            _this.addRadius(_id)
        });
        return this;
    },

    addRadius: function(rad) {
        var view = new CityView({model: rad});
        $(this.el).append(view.render().el);
    }

});