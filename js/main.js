requirejs.config({
    shim: {
        'lib/underscore': {
            exports: '_'
        }
    }
});

require(['Scene'], function(Scene) {
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