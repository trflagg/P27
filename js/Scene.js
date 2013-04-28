
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

        // demo scene
        // var t = new Text('P27', paper);
        // this.add(t);
        // t.sprite.attr('font-size', this.relativeSize(72));
        // t.positionPercent(.13, .7);


        // for (var i=0; i<5; i++) {
        //     var g = new Goal(paper);
        //     this.add(g, true);
        //     g.positionPercent(Math.random(), Math.random());
        //     g.size(this.relativeSize(Math.floor(Math.random()*8)+3));

        // }

        // var sm = new SizeMod(this, paper);
        // this.add(sm, true);
        // sm.setModSize(10);
        // sm.positionPercent(.5, .5);
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
        if (this._P) {
            this._P.update();
        }

        // collision check
        var collidables = this._collidables;  
        var removalList = [];     

        var pbbox = this._P.sprite.getBBox();

        for(var i=0, ll=collidables.length; i<ll; i++) {
            var collider = collidables[i];

            var bbox = collider.sprite.getBBox();
            if (Raphael.isBBoxIntersect(bbox,pbbox)) {
                // collision!
                if(collider.pickup(this._P)) {
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
        console.log("Button Down.");
        if (!this._buttonDown) {
            this._buttonDown = true;
            this._buttonRect.attr({'stroke-width': '20'});
            if (!this.P().moving()) {
                this.P().moveRight();
            }
            else {
                this.P().turn90CCW();
            }
        }
    }

    Scene.prototype.buttonUp = function(event) {
        console.log("Button Up.");  
        this._buttonDown = false;              
        this._buttonRect.attr({'stroke-width': '0'});
        this.P().turn90CCW();

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