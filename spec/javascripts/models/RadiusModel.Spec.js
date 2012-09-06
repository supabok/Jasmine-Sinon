//this spec aims to test common model tasks – instantiation, default values, URLs and validation.
describe('Radius model', function() {

    var radius;
    var emptyRadius;
    var collection;
    var eventSpy;

    beforeEach(function() {
        //create a stub collection
        this.collection = {
            url: "/collection"
        };

        //create a new model with params
        this.radius = new RadiusModel({
            x: 1,
            y: 10,
            diam:20
        });

        //add collection object to model
        this.radius.collection = this.collection;

        //create a default model
        this.emptyRadius = new RadiusModel({});
    });

    afterEach(function() {
        this.radius = new RadiusModel();
        this.emptyRadius = null;
        this.eventSpy = null;
    })

    //on model created with params
    describe('instantiation', function() {
        it('should contain values for x attribute', function() {
            expect(this.radius.get('x')).toEqual(1);
        });

        it('should contain values for y attribute', function() {
            expect(this.radius.get('y')).toEqual(10);
        });

        it('should contain values for diam attribute', function() {
            expect(this.radius.get('diam')).toEqual(20);
        });

    });

    //check default model values i.e. no params passed in
    describe('attributes', function() {

        it('should have y default value of 0', function() {
            expect(this.emptyRadius.get('y')).toEqual(0);
        })

        it('should have x default value of 0', function() {
            expect(this.emptyRadius.get('x')).toEqual(0);
        })

        it('should have diam default value of 1', function() {
            expect(this.emptyRadius.get('diam')).toEqual(1);
        })

        it('should not have any null attributes', function() {
            expect(this.radius.get('x')).not.toBe(null);
            expect(this.radius.get('y')).not.toBe(null);
            expect(this.radius.get('diam')).not.toBe(null);
        });

    })

    //url & id checks
    describe("URL", function() {

        it("should return the collection URL", function() {
            expect(this.radius.url()).toEqual("/collection");
        });

        it("should return the collection URL and id", function() {
            this.radius.id = 1;
            expect(this.radius.url()).toEqual("/collection/1");
        });
    });

    describe("validations", function() {

        beforeEach(function() {
            this.radius = new RadiusModel({y:10});
            //create eventSpy to watch events from model
            this.eventSpy = sinon.spy();
        });

        afterEach(function() {
            this.eventSpy = null;
        })

        //check validate method works and that error event is dispatched from Model
        it("should not save when title is empty", function() {
            this.radius.bind('error', this.eventSpy);
            this.radius.save({"title": ''});

            expect(this.eventSpy.calledOnce).toBeTruthy();
            expect(this.eventSpy.calledWith(this.radius, 'cannot have an empty title')).toBe(true);

            /** using sinon-rails
                //expect(this.eventSpy).toHaveBeenCalledWith(this.radius, 'cannot have an empty title').toBe(false);
                //expect(this.eventSpy).toHaveBeenCalled();
                //expect(this.eventSpy).toHaveBeenCalledWith(this.radius, 'cannot have an empty title');
             */
        });

        it("should not save when missing an attribute value", function() {
            this.radius.bind('error', this.eventSpy);
            //we set title but not Y value to trigger error event on validation
            this.radius.save({"title":"abc", "y":""});

            expect(this.eventSpy.calledWith(this.radius, "cannot have empty Y value")).toBe(true);
            expect(this.eventSpy.calledOnce).toBeTruthy();

        })

    })

    describe("when saving", function() {
        beforeEach(function() {
            this.server = sinon.fakeServer.create();//fake the server
            this.responseBody = '{"description":null,"id":3,"title":"Hello","x":20,"y":10,"diam":5}';
            this.server.respondWith(
                "POST",
                "/radius",
                [
                    200,
                    {"Content-Type": "application/json"},
                    this.responseBody
                ]
            );
            //set url for radius model
            this.radius.url = "/radius";
            //set spy to track events from radius
            this.eventSpy = sinon.spy();
        });

        afterEach(function() {
            this.server.restore();
            this.eventSpy = null;
        });

        it("should make a save request to server", function() {
            this.radius.save();

            expect(this.server.requests[0].method).toEqual("POST");
            expect(this.server.requests[0].url).toEqual("/radius");
            expect(JSON.parse(this.server.requests[0].requestBody)).toEqual(this.radius.attributes);
        })

        it("should fire a change event and provide returned radius model", function() {
            this.radius.bind("change", this.eventSpy);
            this.radius.save();
            this.server.respond();

            expect(this.eventSpy.calledOnce).toBeTruthy();//check that eventSpy has actually been triggered by change evt
            expect(this.eventSpy.getCall(0).args[0].constructor).toBe(RadiusModel);//check object returned is actually a model
            //check that the object returned matches the response body set - i.e. has actually been saved
            expect(this.eventSpy.getCall(0).args[0].attributes).toEqual(JSON.parse(this.responseBody));
        });
    })
});