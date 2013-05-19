
define(['Mover', 'ButtonMods'], function(Mover, ButtonMods) {

    var P = function(paper) {
        // call parent constructor
        Mover.call(this, paper);

        this.sprite = paper.circle(100,100,1);
        this.setId("P");
        
        this.sprite.attr("fill", "#000");

        this.xPosAttr = 'cx';
        this.yPosAttr = 'cy';

        this._buttonDown = ButtonMods.NONE;
        this._buttonUp = ButtonMods.NONE;
        this._oldButtonDown = ButtonMods.NONE;
        this._oldButtonUp = ButtonMods.NONE;

        this.initializeMover();
    };
    // inherit from parent
    P.prototype = Object.create(Mover.prototype);

    P.prototype.resize = function(newSize) {
        this.sprite.animate({r: newSize}, 500);
    };

    P.prototype.r = function() {
        return this.sprite.attr('r');
    }

    P.prototype.update = function() {
    };

    P.prototype.bindButton = function(buttonType, modName) {
        if (buttonType == ButtonMods.BUTTON_DOWN) {
            this.bindButtonDown(modName);
        }
        else if (buttonType == ButtonMods.BUTTON_UP) {
            this.bindButtonUp(modName);
        }
    }
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

            case ButtonMods.CW90:
                this.turn90CW();
                break;
        }
    };

    P.prototype.newLevel = function() {
        this._oldButtonDown = this._buttonDown;
        this._oldButtonUp = this._buttonUp;
        if (this.linePath) {
            this.linePath.remove();
            this.linePath = null;
            this.linePathString = null;
        }
    };

    P.prototype.levelReset = function() {
        this._buttonUp = this._oldButtonUp;
        this._buttonDown = this._oldButtonDown;

        if (this.linePath) {
            this.linePath.remove();
            this.linePath = null;
            this.linePathString = null;
        }
    };



    return P;
})