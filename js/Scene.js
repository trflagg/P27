/**
 * Scene.js
 * Holds the player P and an array of elements for checking collisiion.
 */
define(['P', 'Text', 'Goal'],function(P, Text, Goal) {

    /**
     * Scene constructor.
     */
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
        paper.rect(0,0,this.frameWidth, this.frameHeight).attr({'fill':'#fff',});

        // button rect
        var buttonRect = paper.rect(0,0,this.frameWidth, this.frameHeight).attr({'stroke': '#000', 'stroke-width': '0'});
        this._buttonRect = buttonRect;

        // demo scene
        var p = new P(paper);
        this.P(p);
        p.positionRelative(200, 516);

        var t = new Text('P27', paper);
        this.add(t);
        t.sprite.attr('font-size', this.relativeSize(72));
        t.positionPercent(.13, .7);


        for (var i=0; i<5; i++) {
            var g = new Goal(paper);
            this.add(g, true);
            g.positionPercent(Math.random(), Math.random());
            g.size(Math.floor(Math.random()*5)+1);

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