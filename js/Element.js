

define([], function() {

    var Element = function(paper) {
        this._paper = paper;
        this._scene = null;
    };

    Element.prototype.setScene = function(scene) {
        this._scene = scene;
    };

    return Element;
})