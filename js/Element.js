

define([], function() {

    var Element = function(paper) {
        this._paper = paper;
        this._scene = null;
        this._sprite = null;

        this._xPosAttr = 'x';
        this._yPosAttr = 'y';
    };

    Element.prototype.setScene = function(scene) {
        this._scene = scene;
    };

    Element.prototype.percentX = function(x) {
        return this._scene.frameWidth * x;
    };

    Element.prototype.percentY = function(y) {
        return this._scene.frameHeight * y;
    };

    Element.prototype.positionPercent = function(x, y) {
        var sprite = this._sprite,
            scene = this._scene;

        if (sprite && scene) {
            var px = x * scene.frameWidth;
            var py = y * scene.frameHeight;
            sprite.attr(this._xPosAttr, px);
            sprite.attr(this._yPosAttr, py);
        }
    };

    return Element;
})