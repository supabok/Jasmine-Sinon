// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require ./lib/jquery-1.7.2.min
//= require ./lib/underscore-min
//= require ./lib/backbone-min
//= require_tree ./views/
//= require_tree ./models/
//= require_tree .

$(document).ready(function(){
    var websockets_support = !!window.WebSocket;
    console.log(websockets_support+' do we support websockets?!');

    var mapHolder = Raphael("mapHolder", 903, 600),
        map = mapHolder.image("../assets/namerica.png", 10, 10, 903, 573),
        targets = mapHolder.set(),
        collection;

    var mapData = [
        {x:300, y:100, diam: 20},
        {x:50, y:150, diam:36,title:''},
        {x:100, y:200, diam:10},
        {x:150, y:250, diam:12},
        {x:200, y:390, diam:30},
        {x:470, y:410, diam:10},//texas
        {x:300, y:400, diam:20},
        {x:400, y:150, diam:25},
        {x:580, y:250, diam:25},
        {x:680, y:280, diam:35},
        {x:685, y:355, diam:16},
        {x:800, y:520, diam:11},
        {x:750, y:475, diam:9},
        {x:840, y:75, diam:29},
        {x:850, y:155, diam:10}, //near canada
        {x:350, y:300, diam:23},
        {x:700, y:220, diam:38}
    ];

    function createMapCollection() {
        collection = new MapCollection(mapData)
    }

    //create the original points for the map
    function initMap() {
        _.each(collection.models, function(_id) {
            targets.push(mapHolder.circle(_id.get('x'),_id.get('y',"")).attr({stroke:"none", "opacity": "0.7"}));
            _id.bind('error',function(){console.log('changd')})
        })
    }

    function initAnim() {
        var len = collection.length;

        while(len--){
            var radius = mapData[len].diam;
            var fillCol = (len % 2 ) == 0 ? '#9d3637' : '#51938f';
            targets[len].attr({fill:fillCol})
            if(len > 0) {
                targets[len].animate({r:radius}, 500+(100*len), 'easeInOut')
            } else {
                targets[len].animate({r:radius}, 1500+(100*len), 'easeInOut', function() {
                    initLineGraph();
                    initViewDisplay();
                })
            }
        }
    }

    function initViewDisplay(){
        var cityListView = new CityListView(collection)
        _.each(collection.models, function(_id) {
            cityListView.addRadius(_id)
        });

        $('#cityHolder').append(cityListView.render().el);

    };

    function initLineGraph(){
        console.log('init graph would be here')
    }

    createMapCollection();
    initMap();
    initAnim();
});
