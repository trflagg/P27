requirejs.config({
    shim: {
        'lib/underscore': {
            exports: '_'
        }
    }
});

require(["jquery", 'Scene', 'P'], function($, Scene, P) {
    $(function() {

        var paper = Raphael(0,0,$(window).width(), $(window).height());

        // background rect
        paper.rect(0,0,$(window).width(), $(window).height()).attr({'fill':'#fff',});

        var scene = new Scene(paper);
        scene.resize($(window).width(), $(window).height());
        $(window).resize(function() {
            scene.resize($(window).width(), $(window).height());
        })

        var p = new P(paper);
        scene.P(p);


    });
});