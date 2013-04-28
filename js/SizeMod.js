
define(['Mod'], function(Mod) {


    var SizeMod = function(scene, paper) {
        // call parent constructor
        Mod.call(this, scene, paper);

        // fullscreen icon
        this.loadSprite(0xF0B2); 

        this._modSize = 1;
    }

    // inherit from parent
    SizeMod.prototype = Object.create(Mod.prototype);

    SizeMod.prototype.setModSize = function(s) {
        this._modSize = s;
    }

    SizeMod.prototype.pickup = function(p) {

        //resize it
        p.resize(this._modSize);
        return true;
    }

    return SizeMod;
})