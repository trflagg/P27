/**
 * P.js
 * P is the player Point.
 */
define(['Element'], function(Element) {

    /**
     * P Constructor
     * @param {Paper} paper Raphael paper object.
     */
    var P = function(paper) {
        // call parent constructor
        Element.call(this, paper);

        this.sprite = paper.circle(100,100,1);
        this.sprite.attr("fill", "#000");

        this._xPosAttr = 'cx';
        this._yPosAttr = 'cy';

        this._moving = false;
        this._movementType = null;
        this._angle = null;
        this._dx = 0;
        this._dy = 0;
    }
    // inherit from parent
    P.prototype = Object.create(Element.prototype);

    // MOVEMENT
    P.prototype.startMoving = function() {
        this._moving = true;
        return this;
    }
    P.prototype.stopMoving = function() {
        this._moving = false;
        return this;
    }
    P.prototype.moving = function() {
        return this._moving;
    }

    P.prototype.movementType = function(movementType) {
        if (movementType) {
            this._movementType = movementType;
            return this;
        }
        return this._movementType;
    }

    P.prototype.moveRight = function() {
        this._angle = 0;
        this._moving;
        this.sprite.animate({'cx': this.sprite.attr('cx') + this._scene.frameWidth}, 10000);

        return this;
    }

    P.prototype.update = function() {
        if (this._moving) {
            
        }
    }


    return P;
})