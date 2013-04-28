/**
 * Mod.js
 * Modifies P's movement when picked up.
 */
define(['Pickup'], function(Pickup) {

    /**
     * Mod Constructor
     * @param {Paper} paper Raphael paper object.
     */
    var Mod = function(paper) {
        // call parent constructor
        Pickup.call(this, paper);
    }

    // inherit from parent
    Mod.prototype = Object.create(Pickup.prototype);

    Mod.prototype.pickup = function() {
        return true;
    }

    return Mod;
})