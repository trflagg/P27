/**
 * Goal.js
 * Pickup all of these to complete the level.
 */
define(['Pickup'], function(Pickup) {

    /**
     * Goal Constructor
     * @param {Paper} paper Raphael paper object.
     */
    var Goal = function(paper) {
        // call parent constructor
        Pickup.call(this, paper);

        this.sprite = paper.path("M 0.000 2.000 L 2.351 3.236 L 1.902 0.618 L 3.804 -1.236 L 1.176 -1.618 L 0.000 -4.000 L -1.176 -1.618 L -3.804 -1.236 L -1.902 0.618 L -2.351 3.236 L 0.000 2.000");
        this._requiresTranslation = true;
    }
    // inherit from parent
    Goal.prototype = Object.create(Pickup.prototype);

    Goal.prototype.pickup = function() {
        return this;
    }

    return Goal;
})