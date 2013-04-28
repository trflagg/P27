
define(['Mod'], function(Mod) {


    var SizeMod = function(scene, paper) {
        // call parent constructor
        Mod.call(this, paper);

        this.sprite = paper.text(-1000,-1000, String.fromCharCode(0xF0B2)); // icon-fullscreen 
        this.sprite.attr({'font-family': 'FontAwesome'});
        this.sprite.attr({'font-size': scene.relativeSize(16)});

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