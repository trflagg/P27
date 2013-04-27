
require(["jquery"], function($) {
    $(function() {
    	
        //create drawing surface
        var paper = Raphael(0,0,$(window).width(), $(window).height() );

        //draw background
        var back = paper.rect(0,0,$(window).width(), $(window).height() );
        back.attr("fill", "#fff");

        // draw circle
        var circle =  paper.circle($(window).width() * (2/3), $(window).height() - 20, 10);
        circle.attr("fill","#000");
        circle.animate({cx: $(window).width() + 10}, 10000);

        back.click(function() {
            circle.stop();
            circle.animate({cy: 0}, 10000);

        })
    });
});