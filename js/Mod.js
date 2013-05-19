
define(['Pickup', 'ButtonMods'], function(Pickup, ButtonMods) {

    var Mod = function(scene, paper) {
        // call parent constructor
        Pickup.call(this, paper);
        this.scene = scene;
    }

    // inherit from parent
    Mod.prototype = Object.create(Pickup.prototype);

    Mod.prototype.loadSprite = function(charCode, buttonType) {
        this.sprite = this.paper.set()
        var icon = this.paper.text(-1000,-1000, String.fromCharCode(charCode)); // icon-fullscreen 
        icon.attr({'font-family': 'FontAwesome'});
        icon.attr({'font-size': this.scene.relativeSize(16)});
        this.sprite.push(icon);

        // if (buttonType) {
        //     if (buttonType == ButtonMods.BUTTON_DOWN) {
        //         var typeIcon = this.paper.text(-1000,-1000, String.fromCharCode(0xf107)); // icon-angle-down 
        //     }
        //     if (buttonType == ButtonMods.BUTTON_UP) {
        //         var typeIcon = this.paper.text(-1000,-100, String.fromCharCode(0xf106)); // icon-angle-up 
        //     }

        //     typeIcon.attr({'font-family': 'FontAwesome'});
        //     typeIcon.attr({'font-size': this.scene.relativeSize(16)});
        //     typeIcon.attr({})
        //     this.sprite.push(typeIcon);
        // }
        if (buttonType) {
            if (buttonType == ButtonMods.BUTTON_DOWN) {
                icon.attr({'fill': '#00F'});
            }
            if (buttonType == ButtonMods.BUTTON_UP) {
                icon.attr({'fill': '#F00'});
            }

        }
    }

    Mod.prototype.pickup = function() {
        return true;
    }
    return Mod;
})