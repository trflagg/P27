

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

        this.animated = false;
        this.delay = null;
        this.duration = null;
        this.timingFunction = null;
        this.animatingProperty = null,
        this.animatedValue = null,
        this.nextAnimationFrame = null,
        this.animationTimer = null,
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
            this.animated = true;
        }
        else {
            this.removeClass("FnE_AnimateAll");
            this.addClass("FnE_AnimateNone");
            this.animated = false;
        }
        return this;
    };
    animationDelay : function(delayInMiliseconds) {
        if (delayInMiliseconds === undefined) {
            return this.delay;
        }
        this.delay = delayInMiliseconds;
        this.$el.css("-webkit-transition-delay", delayInMiliseconds+"ms");
        this.$el.css("-moz-transition-delay", delayInMiliseconds+"ms");
        this.$el.css("-o-transition-delay", delayInMiliseconds+"ms");
        this.$el.css("-ms-transition-delay", delayInMiliseconds+"ms");
        this.$el.css("transition-delay", delayInMiliseconds+"ms");
        return this;
    };
    animationDuration : function(durationInMiliseconds) {
        if (durationInMiliseconds === undefined) {
            return this.duration;
        }
        this.duration = durationInMiliseconds;
        this.$el.css("-webkit-transition-duration", durationInMiliseconds+"ms");
        this.$el.css("-moz-transition-duration", durationInMiliseconds+"ms");
        this.$el.css("-o-transition-duration", durationInMiliseconds+"ms");
        this.$el.css("-ms-transition-duration", durationInMiliseconds+"ms");
        this.$el.css("transition-duration", durationInMiliseconds+"ms");
        return this;
    };
    animationTimingFunction : function(timingFunction) {
        if (timingFunction === undefined) {
            return this.timingFunction;
        }
        this.timingFunction = timingFunction;
        this.$el.css("-webkit-transition-timing-function", timingFunction);
        this.$el.css("-moz-transition-timing-function", timingFunction);
        this.$el.css("-o-transition-timing-function", timingFunction);
        this.$el.css("-ms-transition-timing-function", timingFunction);
        this.$el.css("transition-timing-function", timingFunction);
        return this;
    };
    isAnimated : function() {
        return this.animated;
    };
    animateProperty : function(propertyName, value) {
        this.animate();
        this.$el.css("-webkit-transition-property", propertyName);
        this.$el.css("-moz-transition-property", propertyName);
        this.$el.css("-o-transition-property", propertyName);
        this.$el.css("-ms-transition-property", propertyName);
        this.$el.css("transition-property", propertyName);
        this._animatingProperty = propertyName;
        this._animatedValue = value;
        this.css(propertyName, value);

        //set timer so we guarantee animation frames complete
        if(this.nextAnimationFrame) {
            var thisElement = this;
            this.animationTimer = window.setTimeout(this.nextAnimationFrame, this.duration + 200);
        }

        return this;
    };



    return Element;
})