requirejs.config({
    shim: {
        'lib/underscore': {
            exports: '_'
        }
    }
});

require(["jquery", 'Scene'], function($, Scene) {
    $(function() {

        var scene = new Scene($(window).width(), $(window).height());

        $(document).on('mousedown keydown', function(event) {scene.buttonDown.call(scene,event); return false;});
        $(document).on('mouseup keyup', function(event) {scene.buttonUp.call(scene,event)});

        $('#frame').on('mousemove', function(e) {
            posx = e.pageX - $(document).scrollLeft() - $('#frame').offset().left;
            posx -= 90;
            posy = e.pageY - $(document).scrollTop() - $('#frame').offset().top;
            console.log('('+posx+','+posy+')');
        });

        window.setInterval(function() {
            scene.update();
        }, 20);
    });
});