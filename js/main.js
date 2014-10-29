requirejs.config({
    paths: {
        'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
        'lib/underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.0/underscore-min'
    }
    , shim: {
        'lib/underscore': {
            exports: '_'
        }
    }
});

require(["jquery", 'Scene'], function($, Scene) {
    $(function() {


        //event listeners
        $(document).on('mousedown keydown', function(event) {scene.buttonDown.call(scene,event); return false;});
        $(document).on('mouseup keyup', function(event) {scene.buttonUp.call(scene,event)});

        $('#frame').on('mousemove', function(e) {
            posx = e.pageX - $(document).scrollLeft() - $('#frame').offset().left;
            posx -= 90;
            posy = e.pageY - $(document).scrollTop() - $('#frame').offset().top;
            console.log('('+posx+','+posy+')');
        });

        //create scene
        var scene = new Scene($(window).width(), $(window).height());

        window.setInterval(function() {
            scene.update();
        }, 20);
    });
});
