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

        this.collidable = true;
    }
    // inherit from parent
    Pickup.prototype = Object.create(Element.prototype);

    Pickup.prototype.pickup = function(p) {
        return false;
    }

    Pickup.prototype.die = function() {
        var pickup = this;
        this.sprite.animate({'transform': '...S2.5', 'opacity': 0}, 300, function() {
            pickup.sprite.remove();
        })
    }

    return Pickup;
})