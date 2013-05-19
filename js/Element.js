

define([], function() {

    var Element = function(paper) {
        this.paper = paper;
        this.scene = null;
        this.sprite = null;
        this.requiresTranslation = false;

        this.xPosAttr = 'x';
        this.yPosAttr = 'y';

        this.collidable = false;

        this.id = null;
        this.$el = null;
    };

    Element.prototype.setScene = function(scene) {
        this.scene = scene;
    };

    Element.prototype.id = function(id) {
        if (id === undefined) {
            return this.id;
        }
        this.id = id;
        this.el($("#"+id));
    }
    Element.prototype.el = function(jqElement) {
        if (jqElement === undefined) {
            return this.$el;
        }
        this.$el = jqElement;
    }

    // class handlers
    addClass : function(className) {
        this.$el.addClass(className);
        return this;
    },
    removeClass : function(className) {
        this.$el.removeClass(className);
        return this;
    },

    Element.prototype.percentX = function(x) {
        return this.scene.frameWidth * x;
    };

    Element.prototype.percentY = function(y) {
        return this.scene.frameHeight * y;
    };

    Element.prototype.x = function() {
        if (this.sprite) {
            return this.sprite.attr(this.xPosAttr);
        }
        return null;
    }

    Element.prototype.y = function() {
        if (this.sprite) {
            return this.sprite.attr(this.yPosAttr);
        }
        return null;
    }

    Element.prototype.positionPercent = function(x, y) {
        var sprite = this.sprite,
            scene = this.scene;

        var px = x * scene.frameWidth;
        var py = y * scene.frameHeight;

        if (this.requiresTranslation) {
            sprite.transform('T'+px+','+py);
            return this;
        }

        this.sprite.attr(this.xPosAttr, px);
        this.sprite.attr(this.yPosAttr, py);
        return this;
    };

    Element.prototype.positionRelative = function(x,y) {
        var sprite = this.sprite,
            scene = this.scene;

        var px = scene.relativeSize(x);
        var py = scene.relativeSize(y);

        if (this.requiresTranslation) {
            sprite.transform('T'+px+','+py);
            return this;
        }

        this.sprite.attr(this.xPosAttr, px);
        this.sprite.attr(this.yPosAttr, py);
        return this;
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



    return Element;
})