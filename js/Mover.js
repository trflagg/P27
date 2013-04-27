define(['lib/underscore'], function() {
    return {

        initializeMover: function() {
            this._moving = false;
            this._movementType = null;
            this._angle = null;
        },
        startMoving: function() {
            this._moving = true;
            return this;
        },
        stopMoving: function() {
            this._moving = false;
            return this;
        },
        moving: function() {
            return this._moving;
        },

        movementType: function(movementType) {
            if (movementType) {
                this._movementType = movementType;
                return this;
            }
            return this._movementType;
        },

        moveRight: function() {
            var xPos = this._xPosAttr,
                yPos = this._yPosAttr;
            var animation = {};

            this._angle = 0;
            this._moving = true;
            animation[xPos] = this.sprite.attr(xPos) +this._scene.frameWidth;
            this.sprite.animate(animation, 10000);

            return this;
        },

        turn45CCW: function() {
            this._angle -= 45;
            this.setAnimationByAngle();
        },
        turn45CW: function() {
            this._angle += 45;
            this.setAnimationByAngle();
        },

        turn90CCW: function() {
            this._angle -= 90;
            this.setAnimationByAngle();
        },
        turn90CW: function() {
            this._angle += 90;
            this.setAnimationByAngle();
        },

        setAnimationByAngle: function() {
            var xPos = this._xPosAttr,
                yPos = this._yPosAttr,
                animation = {};

            // cos() = adj/hyp
            // adj = cos() * hyp
            var dx = Math.cos(Raphael.rad(this._angle)) * this._scene.frameWidth;

            // sin() = opp/hyp
            // opp = sin() * hyp
            var dy = Math.sin(Raphael.rad(this._angle)) * this._scene.frameWidth;

            animation[xPos] = this.sprite.attr(xPos) + dx;
            animation[yPos] = this.sprite.attr(yPos) + dy;
            this.sprite.stop().animate(animation, 10000);
        }
    }
})