
define(['Pickup'], function(Pickup) {

    var Goal = function(paper) {
        // call parent constructor
        Pickup.call(this, paper);

        this.sprite = paper.path("M 0.000 2.000 L 2.351 3.236 L 1.902 0.618 L 3.804 -1.236 L 1.176 -1.618 L 0.000 -4.000 L -1.176 -1.618 L -3.804 -1.236 L -1.902 0.618 L -2.351 3.236 L 0.000 2.000");
        this._requiresTranslation = true;
        this.sprite.attr('stroke-width',1);
        this.sprite.attr('fill','rgb(255,255,102)');
        this._size = 1;
    }

    // inherit from parent
    Goal.prototype = Object.create(Pickup.prototype);

    Goal.prototype.pickup = function(p) {
        this.scene.goalPickedUp();
        return true;
    }

    Goal.prototype.size = function(size) {
        if (size) {
            this.sprite.transform('...S'+size);
            this._size = size;
            return this;
        }
        
        return this._size;
    }
    return Goal;
})