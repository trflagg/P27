
define(['Pickup'], function(Pickup) {

    var Mod = function(scene, paper) {
        // call parent constructor
        Pickup.call(this, paper);
        this._scene = scene;
    }

    // inherit from parent
    Mod.prototype = Object.create(Pickup.prototype);

    Mod.prototype.loadSprite = function(charCode) {
        this.sprite = this._paper.text(-1000,-1000, String.fromCharCode(charCode)); // icon-fullscreen 
        this.sprite.attr({'font-family': 'FontAwesome'});
        this.sprite.attr({'font-size': this._scene.relativeSize(16)});
    }

    Mod.prototype.pickup = function() {
        return true;
    }

    return Mod;
})