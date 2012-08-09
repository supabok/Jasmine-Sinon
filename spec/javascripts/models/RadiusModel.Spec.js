describe('Radius model', function() {//this spec aims to test common model tasks – instantiation, default values, URLs and validation.

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
    describe('when instantiated', function() {
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
    describe('when no attributes passed in', function() {

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
    describe("url", function() {

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

            //using sinon-rails
            //expect(this.eventSpy).toHaveBeenCalledWith(this.radius, 'cannot have an empty title').toBe(false);
            //expect(this.eventSpy).toHaveBeenCalled();
            //expect(this.eventSpy).toHaveBeenCalledWith(this.radius, 'cannot have an empty title');
        });

        it("should not save when missing an attribute value", function() {
            this.radius.bind('error', this.eventSpy);
            //we set title but not Y value to trigger error event on validation
            this.radius.save({"title":"abc", "y":""});

            expect(this.eventSpy.calledWith(this.radius, "cannot have empty Y value")).toBe(true);
            expect(this.eventSpy.calledTwice).toBeTruthy();

        })

    })
});