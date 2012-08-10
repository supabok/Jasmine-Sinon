beforeEach(function() {
    this.fixtures = _.extend(this.fixtures || {}, {

        RadiusModel: {

            valid: {
                "status": "OK",
                "version": "1.0",
                "response": {
                    "list": "Radius Models",
                    "radColl": [
                        {
                            "id": 1,
                            "title": "a",
                            "y": 2, "x":3, "diam": 50,
                            "done": true
                        },
                        {
                            "id": 2,
                            "title": "b",
                            "y": 4, "x":23, "diam": 20,
                            "done": true
                        },
                        {
                            "id": 3,
                            "title": "c",
                            "y": 12, "x":13, "diam": 30,
                            "done": false
                        },
                        {
                            "id": 4,
                            "title": "d",
                            "y": 32, "x":32, "diam": 40,
                            "done": false
                        }
                    ]
                }
            }

        }

    });
})