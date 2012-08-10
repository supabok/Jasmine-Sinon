var MapCollection = Backbone.Collection.extend({
    model: RadiusModel,

    parse: function(res) {
        return res.response.radColl;
    }

})