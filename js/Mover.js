define(['lib/underscore'], function() {
    return {

        initializeMover: function() {
            this._moving = false;
            this._movementType = null;
            this._angle = null;
            this._currentAnimation = null;
            this._linePath = null;
            this._linePathString = null;
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
                animation = {},
                x = this.x(),
                y = this.y();

            // cos() = adj/hyp
            // adj = cos() * hyp
            var dx = Math.cos(Raphael.rad(this._angle)) * (this._scene.frameWidth * 2);

            // sin() = opp/hyp
            // opp = sin() * hyp
            var dy = Math.sin(Raphael.rad(this._angle)) * (this._scene.frameWidth * 2);

            animation[xPos] = this.sprite.attr(xPos) + dx;
            animation[yPos] = this.sprite.attr(yPos) + dy;

            if (this._currentAnimation) {
                this.sprite.stop(this._currentAnimation);
            }
            
            // build path for line
            // init
            if (!this._linePath) {
                this._linePathString = Raphael.format('M'+x+','+y);
                this._linePath = this._paper.path(this._linePathString);
            }
            else {
                this._linePathString = this._linePathString + Raphael.format('L'+x+','+y);
                this._linePath.remove();
                this._linePath = this._paper.path(this._linePathString);
            }
            this._linePath.attr({'stroke-width': this.sprite.attr('r'), 'stroke': '#000'});
            // this._linePath.attr('fill','rgb(255,255,102)');
            

            this._currentAnimation = Raphael.animation(animation, 20000);
            this.sprite.animate(this._currentAnimation);
        },

    }
})