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
    });
});