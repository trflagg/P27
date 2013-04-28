/**
 * Pickup.js
 * An item that can be picked up by the player.
 */
define(['Element'], function(Element) {

    /**
     * Pickup Constructor
     * @param {Paper} paper Raphael paper object.
     */
    var Pickup = function(paper) {
        // call parent constructor
        Element.call(this, paper);
    }
    // inherit from parent
    Pickup.prototype = Object.create(Element.prototype);

    Pickup.prototype.pickup = function() {
        return this;
    }

    return Pickup;
})