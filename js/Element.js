

define([], function() {

    var Element = function(paper) {
        this._paper = paper;
        this._scene = null;
        this.sprite = null;
        this._requiresTranslation = false;

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

    Element.prototype.x = function() {
        if (this.sprite) {
            return this.sprite.attr(this._xPosAttr);
        }
        return null;
    }

    Element.prototype.y = function() {
        if (this.sprite) {
            return this.sprite.attr(this._yPosAttr);
        }
        return null;
    }

    Element.prototype.positionPercent = function(x, y) {
        var sprite = this.sprite,
            scene = this._scene;

        var px = x * scene.frameWidth;
        var py = y * scene.frameHeight;

        if (this._requiresTranslation) {
            sprite.transform('T'+px+','+py);
            return this;
        }

        this.sprite.attr(this._xPosAttr, px);
        this.sprite.attr(this._yPosAttr, py);
        return this;
    };

    Element.prototype.positionRelative = function(x,y) {
        var sprite = this.sprite,
            scene = this._scene;

        var px = scene.relativeSize(x);
        var py = scene.relativeSize(y);
        this.sprite.attr(this._xPosAttr, px);
        this.sprite.attr(this._yPosAttr, py);
    };

    return Element;
})