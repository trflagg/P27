
define(['P', 'Text', 'Goal', 'SizeMod', 'Levels'],function(P, Text, Goal, SizeMod, Levels) {

    var Scene = function(windowWidth, windowHeight) {
        this.windowWidth = null;
        this.windowHeight = null;

        this._P = null;
        this._elements = [];
        this._collidables = [];

        this._buttonDown = false;

        this.windowSize(windowWidth, windowHeight);
        var paper = Raphael("frame", this.frameWidth, this.frameHeight);
        this._paper = paper;

        // background rect
        this.background = paper.rect(0,0,this.frameWidth, this.frameHeight).attr({'fill':'#fff',});

        // button rect
        var buttonRect = paper.rect(0,0,this.frameWidth, this.frameHeight).attr({'stroke': '#000', 'stroke-width': '0'});
        this._buttonRect = buttonRect;

        // load player
        var p = new P(paper);
        this.P(p);
        p.positionRelative(200, 516);

        // load first level
        this.loadLevel(Levels[0]);

        this.start = true;
    };

    Scene.prototype.loadLevel = function(level) {

        if (!level.elements) {
            return;
        }

        var elements = level.elements;

        for(var i=0, ll = level.elements.length; i<ll; i++) {
            var element = elements[i];
            var newElement = null;

            switch(element.type) {
                case 'text':
                    var newElement = new Text(element.text, this._paper)
                    break;

                case 'sizeMod':
                    var newElement = new SizeMod(this, this._paper)
                    newElement.setModSize(element.modSize);
                    break;
            }

            if (newElement) {

                this.add(newElement, newElement.collidable);

                // positionPercent
                if (element.positionPercent) {
                    newElement.positionPercent(element.positionPercent.x, element.positionPercent.y);
                }

                // positionRelative
                if (element.positionRelative) {
                    newElement.positionRelative(element.positionRelative.x, element.positionRelative.y);
                }

                // loop through attrs
                if (element.attrs) {
                    for(var j=0, ll2 = element.attrs.length; j<ll2; j++) {
                        var attribute = element.attrs[j];
                        var value = attribute.value;
                        if (attribute.relative) {
                            value = this.relativeSize(value);
                        }
                        var attrObject = {};
                        attrObject[attribute.attr] = value;
                        newElement.sprite.attr(attrObject);
                    }
                }

            }

        }
    };

    Scene.prototype.update = function() {
        var p = this._P;

        if (p) {
            p.update();
        }

        // collision check
        var collidables = this._collidables;  
        var removalList = [];     

        var pbbox = p.sprite.getBBox();

        for(var i=0, ll=collidables.length; i<ll; i++) {
            var collider = collidables[i];

            var bbox = collider.sprite.getBBox();
            if (Raphael.isBBoxIntersect(bbox,pbbox)) {
                // collision!
                if(collider.pickup(p)) {
                    removalList.push(collider);
                }           
            }
        }

        // remove removalList
        for(var i=0, ll=removalList.length; i<ll; i++) {
            var item = removalList[i];
            collidables.splice(collidables.indexOf(item), 1);
            this._elements.splice(this._elements.indexOf(item), 1);
            item.sprite.remove();
        }
    };

    Scene.prototype.P = function(p) {
        if (p) {
            this._P = p;
            p.setScene(this);
        }

        return this._P;
    };

    Scene.prototype.add = function(element, isCollidable) {
        // isCollidable = false by default
        isCollidable = typeof isCollidable !== 'undefined' ? isCollidable : false;

        this._elements.push(element);
        element.setScene(this);

        if (isCollidable) {
            this._collidables.push(element);
        }
    };

    Scene.prototype.buttonDown = function(event) {
        this._buttonRect.attr({'stroke-width': '20'});
        console.log("Button Down.");
        
        if (!this._buttonDown) {
            this._buttonDown = true;
        }

        if (this.start) {
            this.start = false;
            this.P().moveRight().startMoving();
        }
    }

    Scene.prototype.buttonUp = function(event) {
        this._buttonRect.attr({'stroke-width': '0'});
        console.log("Button Up.");  

        this._buttonDown = false;

    }

    Scene.prototype.windowSize = function(width, height) {
        if (width && height) {
            // scrollbars not included.
            width -= 30;
            height -= 30;

            // calculate golden rectangle
            var frameHeight = height;
            var frameWidth = height * 1.618;

            this.width = width ;
            this.height = height;
            this.frameWidth = frameWidth;
            this.frameHeight = frameHeight;
            this._relativeFactor = frameHeight / 705;
        }
    }

    Scene.prototype.relativeSize = function(num) {
        return num * this._relativeFactor;
    }

    return Scene;
});