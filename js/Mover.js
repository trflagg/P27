define(['Element'], function(Element) {

    var Mover = function(paper) {
        // call parent constructor
        Element.call(this, paper);

        this.moving = false;
        this.movementType = null;
        this.angle = null;
        this.currentAnimation = null;
        this.linePath = null;
        this.linePathString = null;

    }
    // inherit from parent
    Mover.prototype = Object.create(Element.prototype);

    Mover.prototype.startMoving = function() {
        this.moving = true;
        return this;
    };
    Mover.prototype.stopMoving = function() {
        this.moving = false;
        return this;
    };
    Mover.prototype.moving = function() {
        return this.moving;
    };

    Mover.prototype.movementType = function(movementType) {
        if (movementType) {
            this.movementType = movementType;
            return this;
        }
        return this.movementType;
    };

    Mover.prototype.turn45CCW = function() {
        this.angle -= 45;
        this.setAnimationByAngle();
    };
    Mover.prototype.turn45CW = function() {
        this.angle += 45;
        this.setAnimationByAngle();
    };

    Mover.prototype.turn90CCW = function() {
        this.angle -= 90;
        this.setAnimationByAngle();
    };
    Mover.prototype.turn90CW = function() {
        this.angle += 90;
        this.setAnimationByAngle();
    };

    Mover.prototype.setAnimationByAngle = function() {
        var xPos = this.xPosAttr,
            yPos = this.yPosAttr,
            animation = {},
            x = this.x(),
            y = this.y();

        // cos() = adj/hyp
        // adj = cos() * hyp
        var dx = Math.cos(Raphael.rad(this.angle)) * (this.scene.frameWidth * 2);

        // sin() = opp/hyp
        // opp = sin() * hyp
        var dy = Math.sin(Raphael.rad(this.angle)) * (this.scene.frameWidth * 2);

        animation[xPos] = this.sprite.attr(xPos) + dx;
        animation[yPos] = this.sprite.attr(yPos) + dy;
        // var newX = this.sprite.attr(xPos) + dx;
        // var newY = this.sprite.attr(yPos) + dy;

        if (this.currentAnimation) {
            this.sprite.stop(this.currentAnimation);
        }
        
        // build path for line
        // init
        if (!this.linePath) {
            this.linePathString = Raphael.format('M'+x+','+y);
            this.linePath = this.paper.path(this.linePathString);
        }
        else {
            this.linePathString = this.linePathString + Raphael.format('L'+x+','+y);
            this.linePath.remove();
            this.linePath = this.paper.path(this.linePathString);
        }
        this.linePath.attr({'stroke-width': this.sprite.attr('r'), 'stroke': '#000'});
        // this.linePath.attr('fill','rgb(255,255,102)');
        

        this.currentAnimation = Raphael.animation(animation, 20000);
        this.sprite.animate(this.currentAnimation);
    };


    // animation controls
    animate : function(turnOn) {
        if (turnOn === undefined) {
            turnOn = true;
        }
        if (turnOn) {
            this.removeClass("FnE_AnimateNone");
            this.addClass("FnE_AnimateAll");
            this._animated = true;
        }
        else {
            this.removeClass("FnE_AnimateAll");
            this.addClass("FnE_AnimateNone");
            this._animated = false;
        }
        return this;
    };
    animationDelay : function(delayInMiliseconds) {
        if (delayInMiliseconds === undefined) {
            return this._delay;
        }
        this._delay = delayInMiliseconds;
        this._jquery.css("-webkit-transition-delay", delayInMiliseconds+"ms");
        this._jquery.css("-moz-transition-delay", delayInMiliseconds+"ms");
        this._jquery.css("-o-transition-delay", delayInMiliseconds+"ms");
        this._jquery.css("-ms-transition-delay", delayInMiliseconds+"ms");
        this._jquery.css("transition-delay", delayInMiliseconds+"ms");
        return this;
    };
    animationDuration : function(durationInMiliseconds) {
        if (durationInMiliseconds === undefined) {
            return this._duration;
        }
        this._duration = durationInMiliseconds;
        this._jquery.css("-webkit-transition-duration", durationInMiliseconds+"ms");
        this._jquery.css("-moz-transition-duration", durationInMiliseconds+"ms");
        this._jquery.css("-o-transition-duration", durationInMiliseconds+"ms");
        this._jquery.css("-ms-transition-duration", durationInMiliseconds+"ms");
        this._jquery.css("transition-duration", durationInMiliseconds+"ms");
        return this;
    };
    animationTimingFunction : function(timingFunction) {
        if (timingFunction === undefined) {
            return this._timingFunction;
        }
        this._timingFunction = timingFunction;
        this._jquery.css("-webkit-transition-timing-function", timingFunction);
        this._jquery.css("-moz-transition-timing-function", timingFunction);
        this._jquery.css("-o-transition-timing-function", timingFunction);
        this._jquery.css("-ms-transition-timing-function", timingFunction);
        this._jquery.css("transition-timing-function", timingFunction);
        return this;
    };
    isAnimated : function() {
        return this._animated;
    };
    animateProperty : function(propertyName, value) {
        this.animate();
        this._jquery.css("-webkit-transition-property", propertyName);
        this._jquery.css("-moz-transition-property", propertyName);
        this._jquery.css("-o-transition-property", propertyName);
        this._jquery.css("-ms-transition-property", propertyName);
        this._jquery.css("transition-property", propertyName);
        this._animatingProperty = propertyName;
        this._animatedValue = value;
        this.css(propertyName, value);

        //set timer so we guarantee animation frames complete
        if(this._nextAnimationFrame) {
            var thisElement = this;
            this._animationTimer = window.setTimeout(this._nextAnimationFrame, this._duration + 200);
        }

        return this;
    };


    return Mover;
})