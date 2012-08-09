var RadiusModel = Backbone.Model.extend({
    defaults: {
        x: 0,
        y: 0,
        diam: 1
    },

    validate: function(attrs) {
        if (!attrs.title || !attrs.y) {
            if(!attrs.title){
                console.log('no title provided')
                return "cannot have an empty title";
            }  else if (!attrs.y) {
                console.log('no y set');
                return "cannot have empty Y value";
            }

        };

    },

    getDiam: function() {
        return this.get('diam');
    }

});