var CityListView = Backbone.View.extend({
    tagName: "ul",
    className: "cities",

    initialize: function(_coll) {
        var _this = this;
        this.collection = _coll;
        _.each(this.collection.models, function(_id) {
            _this.addRadius(_id)
        });
    },

    render: function() {

        return this;
    },

    addRadius: function(rad) {
        var view = new CityView({model: rad});
        $(this.el).append(view.render().el);
    }

});