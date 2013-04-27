
require(["jquery", 'Scene', 'P'], function($, Scene, P) {
    $(function() {
        var paper = Raphael(0,0,$(window).width(), $(window).height());
        paper.rect(0,0,$(window).width(), $(window).height()).attr({'fill':'#fff',});
        var p = new P(paper);
        var scene = new Scene();
        scene.P(p);

    });
});