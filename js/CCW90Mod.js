
define(['Mod', 'ButtonMods'], function(Mod, ButtonMods) {

    var CCW90Mod = function(scene, paper, buttonType) {
        // call parent constructor
        Mod.call(this, scene, paper);
        this.buttonType = buttonType;

        // reply icon
        this.loadSprite(0xf112, buttonType); 
    }

    // inherit from parent
    CCW90Mod.prototype = Object.create(Mod.prototype);

    CCW90Mod.prototype.pickup = function(p) {
        p.bindButton(this.buttonType, ButtonMods.CCW90);
        return true;
    }

    return CCW90Mod;
})