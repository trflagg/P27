define(['lib/underscore'], function() {
    return {

        initializeMover: function() {
            this._moving = false;
            this._movementType = null;
            this._angle = null;
            this._currentAnimation = null;
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
                animation = {};

            // cos() = adj/hyp
            // adj = cos() * hyp
            var dx = Math.cos(Raphael.rad(this._angle)) * (this._scene.frameWidth * 2);

            // sin() = opp/hyp
            // opp = sin() * hyp
            var dy = Math.sin(Raphael.rad(this._angle)) * (this._scene.frameWidth * 2);

            animation[xPos] = this.sprite.attr(xPos) + dx;
            animation[yPos] = this.sprite.attr(yPos) + dy;

            //TODO: Only stop the last moving animation, not all of them!
            if (this._currentAnimation) {
                this.sprite.stop(this._currentAnimation);
            }

            this._currentAnimation = Raphael.animation(animation, 20000);
            this.sprite.animate(this._currentAnimation);
        },


        drawPath: function( canvas, pathstr, duration, attr, callback )
        {
            var guide_path = canvas.path( pathstr ).attr( { stroke: "none", fill: "none" } );
            var path = canvas.path( guide_path.getSubpath( 0, 1 ) ).attr( attr );
            var total_length = guide_path.getTotalLength( guide_path );
            var last_point = guide_path.getPointAtLength( 0 );
            var start_time = new Date().getTime();
            var interval_length = 50;
            var result = path;        

            var interval_id = setInterval( function()
            {
                var elapsed_time = new Date().getTime() - start_time;
                var this_length = elapsed_time / duration * total_length;
                var subpathstr = guide_path.getSubpath( 0, this_length );            
                attr.path = subpathstr;

                path.animate( attr, interval_length );
                if ( elapsed_time >= duration )
                {
                    clearInterval( interval_id );
                    if ( callback != undefined ) callback();
                        guide_path.remove();
                }                                       
            }, interval_length );  
            return result;
        }
    }
})