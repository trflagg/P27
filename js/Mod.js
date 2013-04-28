
define(['Pickup'], function(Pickup) {

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