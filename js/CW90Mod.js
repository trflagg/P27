
define(['Mod', 'ButtonMods'], function(Mod, ButtonMods) {

    var CW90Mod = function(scene, paper, buttonType) {
        // call parent constructor
        Mod.call(this, scene, paper);
        this.buttonType = buttonType;

        // reply icon
        this.loadSprite(0xf064, buttonType); 
    }

    // inherit from parent
    CW90Mod.prototype = Object.create(Mod.prototype);

    CW90Mod.prototype.pickup = function(p) {
        p.bindButton(this.buttonType, ButtonMods.CCW90);
        return true;
    }

    return CW90Mod;
})