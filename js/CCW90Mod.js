
define(['Mod', 'ButtonMods'], function(Mod, ButtonMods) {

    var CCW90Mod = function(scene, paper) {
        // call parent constructor
        Mod.call(this, scene, paper);

        // reply icon
        this.loadSprite(0xf112); 
    }

    // inherit from parent
    CCW90Mod.prototype = Object.create(Mod.prototype);

    CCW90Mod.prototype.pickup = function(p) {
        p.bindButtonDown(ButtonMods.CCW90);
        return true;
    }

    return CCW90Mod;
})