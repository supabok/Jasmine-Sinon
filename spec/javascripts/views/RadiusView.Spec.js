describe("CityListView", function() {
    var view;

    beforeEach(function() {
        this.view = new CityListView();
    });

    describe("Instantiation", function() {

        it("should create a list element", function() {
            expect(this.view.el.nodeName).toEqual("UL");
        });

        it("should have a class of 'cities'", function() {
            expect($(this.view.el)).toHaveClass('cities');
        });

    });

});