describe('Map Collection', function() {//
    var radStub,
        model,
        mapColl,
        fixture,
        server;

    describe("when instantiated with model literal", function() {
        beforeEach(function() {
            //set up a test model
            this.radStub = sinon.stub(window, "RadiusModel");
            this.model = new Backbone.Model({
                id: 5,
                title: "Foo"
            });
            this.radStub.returns(this.model);

            //set up collection
            this.mapColl = new MapCollection();
            this.mapColl.model = this.radStub; // reset model relationship to use stub
            this.mapColl.add({
                id: 5,
                title: "Foo"
            });
        });

        afterEach(function() {
            this.radStub.restore();
        });

        it("should add a model", function() {
            expect(this.mapColl.length).toEqual(1);
        });

        it("should find a model by id", function() {
            expect(this.mapColl.get(5).get("id")).toEqual(5);
        });
    });

    describe("should fetch models from the server", function(){

        beforeEach(function() {
            this.fixture = this.fixtures.RadiusModel.valid;
            this.server = sinon.fakeServer.create();//fake the server
            this.server.respondWith(  //fake the response
                "GET",
                "/radius",
                this.validResponse(this.fixture)//use helper & fixture for response
            );

            this.mapColl = new MapCollection();
            this.mapColl.url = "/radius";
        });

        afterEach(function() {
            this.server.restore();
        });

        it("should make the correct request", function() {
            this.mapColl.fetch();

            expect(this.server.requests.length).toEqual(1);
            expect(this.server.requests[0].method).toEqual("GET");
            expect(this.server.requests[0].url).toEqual("/radius");
        });

        it("should parse radius collection from the response", function() {
            this.mapColl.fetch();
            this.server.respond();
            expect(this.mapColl.length).toEqual(this.fixture.response.radColl.length);
            expect(this.mapColl.get(1).get('title')).toEqual(this.fixture.response.radColl[0].title);
        });

    })

});
