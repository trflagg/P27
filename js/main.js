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

        $(document).on('mousedown keydown', function(event) {scene.buttonDown.call(scene,event)});
        $(document).on('mouseup keyup', function(event) {scene.buttonUp.call(scene,event)});

        window.setInterval(function() {
            scene.update();
        }, 20);
    });
});