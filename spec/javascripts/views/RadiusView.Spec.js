describe("CityListView", function() {
    var view,
        collection,
        cityViewStub;

    beforeEach(function() {
        //create a mock collection object -
        //we're not interested in testing the app collection so don't create a real one
        this.collection = new Backbone.Collection();
        this.collection.add(new Backbone.Model({x:1,y:2,diam:3}));

        this.view = new CityListView(this.collection);
    });

    afterEach(function() {
        this.collection = null;
        this.view = null;
    })

    describe("Instantiation", function() {

        it("should create a list element", function() {
            expect(this.view.el.nodeName).toEqual("UL");
        });

        it("should have a class of 'cities'", function() {
            expect($(this.view.el)).toHaveClass('cities');
        });

    });

    describe("Rendering", function() {
        beforeEach(function(){
            //create mock view object
            this.cityView = new Backbone.View();
            this.cityView.render = function() {
                this.el = document.createElement('li');
                return this;
            };

            this.cityViewStub = sinon.stub(window, "CityView").returns(this.cityView);
            this.cityViewRenderSpy = sinon.spy(this.cityView, "render");

            //create dummy models
            this.city1 = new Backbone.Model({x:1,y:2,diam:3});
            this.city2 = new Backbone.Model({x:41,y:5,diam:6});
            this.city3 = new Backbone.Model({x:7,y:8,diam:9});

            //create dummy collection
            this.collection = new Backbone.Collection();
            this.collection.add(this.city1);
            this.collection.add(this.city2);
            this.collection.add(this.city3);
            //pass collection into List View
            this.view = new CityListView(this.collection);
            this.view.render();
        })

        afterEach(function() {
            window.CityView.restore();
        });

        it("should create a cityview for each city model", function() {
            expect(this.cityViewStub.calledThrice).toBeTruthy();

            expect(this.cityViewStub.calledWith({model:this.city1})).toBe(true);
            expect(this.cityViewStub.calledWith({model:this.city2})).toBe(true);
            expect(this.cityViewStub.calledWith({model:this.city3})).toBe(true);
        });

        it("should create a cityview with proper attributes", function() {
            expect(this.cityViewStub.args[0][0].model.attributes).toEqual({x:1,y:2,diam:3});
            expect(this.cityViewStub.args[1][0].model.attributes).toEqual({x:41,y:5,diam:6});
            expect(this.cityViewStub.args[2][0].model.attributes).toEqual({x:7,y:8,diam:9});

        })

        it("should render each cityView", function() {
            expect(this.cityView.render.calledThrice).toBeTruthy();
        });

        it("appends the cityView to the CityViewList", function() {
            expect($(this.view.el).children().length).toEqual(3);
        });
    })

    describe("CityView", function() {

        beforeEach(function() {
            this.model = new Backbone.Model({
                x: 1,
                y: 123,
                diam: 2
            });

            this.view = new CityView({model:this.model});
        });

        describe("Rendering", function() {

            it("returns the view object", function() {
                expect(this.view.render()).toEqual(this.view);
            });

            it("produces the correct HTML", function() {
                this.view.render();
                expect(this.view.el.innerHTML).toEqual('<span id="spanText">x=1, y=123, diam=2</span><a href="#">123</a>');
            });

        });

        describe("Template", function() {
            //use jquery-sinon matchers
            it("has the correct Id attribute", function() {
                this.view.render();
                expect($(this.view.el).find('span')).toHaveId('spanText');
            });

            it("has the correct text inserted", function(){
                this.view.render();
                expect($(this.view.el).find('span')).toHaveText('x=1, y=123, diam=2')
            })
        })

        describe("Events", function() {

            describe("when link clicked, event dispatched", function() {

                beforeEach(function() {
                    this.view.render();
                    this.li = $(this.view.el);
                    this.li.find('a').trigger('click');
                });

                it(" and shows clicked text", function() {
                    expect(this.li.find('a')).toHaveText('-i have been clicked');
                });

                it(" and text color changed", function() {
                    expect(this.li.find('a')).toHaveCss({color:'rgb(255, 238, 204)'});
                    //check css value explicitly-n.b. don't really need this
                    expect(this.li.find('a').css('color')).toContain('rgb(255, 238, 204)');
                });
            });
        });
    });

});