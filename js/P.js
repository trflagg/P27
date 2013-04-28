
define(['Element', 'Mover', 'ButtonMods'], function(Element, Mover, ButtonMods) {

    var P = function(paper) {
        // call parent constructor
        Element.call(this, paper);

        this.sprite = paper.circle(100,100,1);
        this.sprite.attr("fill", "#000");

        this._xPosAttr = 'cx';
        this._yPosAttr = 'cy';

        this._buttonDown = ButtonMods.NONE;
        this._buttonUp = ButtonMods.NONE;
        this._oldButtonDown = ButtonMods.NONE;
        this._oldButtonUp = ButtonMods.NONE;

        this.initializeMover();
    };
    // inherit from parent
    P.prototype = Object.create(Element.prototype);
    P.prototype = _.extend(Mover, P.prototype);

    P.prototype.resize = function(newSize) {
        this.sprite.animate({r: newSize}, 500);
    };

    P.prototype.r = function() {
        return this.sprite.attr('r');
    }

    P.prototype.update = function() {
        if (this._moving) {
            
        }
    };

    P.prototype.bindButtonDown = function(modName) {
        this._buttonDown = modName;
    };
    P.prototype.bindButtonUp = function(modName) {
        this._buttonUp = modName;
    };

    P.prototype.buttonDown = function() {
        this.runButtonMod(this._buttonDown);
    };
    P.prototype.buttonUp = function() {
        this.runButtonMod(this._buttonUp);
    };

    P.prototype.runButtonMod = function(buttonMod) {
        switch (buttonMod) {
            case ButtonMods.CCW90:
                this.turn90CCW();
                break;
        }
    }

    P.prototype.newLevel = function() {
        this._oldButtonDown = this._buttonDown;
        this._oldButtonUp = this._buttonUp;
        if (this._linePath) {
            this._linePath.remove();
            this._linePath = null;
            this._linePathString = null;
        }
    }

    P.prototype.levelReset = function() {
        this._buttonUp = this._oldButtonUp;
        this._buttonDown = this._oldButtonDown;

        if (this._linePath) {
            this._linePath.remove();
            this._linePath = null;
            this._linePathString = null;
        }
    }



    return P;
})