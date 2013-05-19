

define([], function() {

    var Element = function(paper) {
        this.paper = paper;
        this.scene = null;
        this.sprite = null;
        this.requiresTranslation = false;

        this.xPosAttr = 'x';
        this.yPosAttr = 'y';

        this.collidable = false;
    };

    Element.prototype.setScene = function(scene) {
        this.scene = scene;
    };

    Element.prototype.percentX = function(x) {
        return this.scene.frameWidth * x;
    };

    Element.prototype.percentY = function(y) {
        return this.scene.frameHeight * y;
    };

    Element.prototype.x = function() {
        if (this.sprite) {
            return this.sprite.attr(this.xPosAttr);
        }
        return null;
    }

    Element.prototype.y = function() {
        if (this.sprite) {
            return this.sprite.attr(this.yPosAttr);
        }
        return null;
    }

    Element.prototype.positionPercent = function(x, y) {
        var sprite = this.sprite,
            scene = this.scene;

        var px = x * scene.frameWidth;
        var py = y * scene.frameHeight;

        if (this.requiresTranslation) {
            sprite.transform('T'+px+','+py);
            return this;
        }

        this.sprite.attr(this.xPosAttr, px);
        this.sprite.attr(this.yPosAttr, py);
        return this;
    };

    Element.prototype.positionRelative = function(x,y) {
        var sprite = this.sprite,
            scene = this.scene;

        var px = scene.relativeSize(x);
        var py = scene.relativeSize(y);

        if (this.requiresTranslation) {
            sprite.transform('T'+px+','+py);
            return this;
        }

        this.sprite.attr(this.xPosAttr, px);
        this.sprite.attr(this.yPosAttr, py);
        return this;
    };

    return Element;
})