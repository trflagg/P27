
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

        // load first level
        this.currentLevel = 0;
        this.loadLevel(Levels[0]);

        this.start = true;
        this.playing = false;
    };

    Scene.prototype.loadLevel = function(level) {
        console.log('load level ');

        if (!level.elements || !level.p) {
            return;
        }

        var elements = level.elements;

        this.goalsRemaining = 0;

        // position p
        // TODO: This is a copy from for loop below
        // throw all of this into a separate method
        if (level.p.positionPercent) {
            this._P.positionPercent(level.p.positionPercent.x, level.p.positionPercent.y);
        }

        // positionRelative
        if (level.p.positionRelative) {
            this._P.positionRelative(level.p.positionRelative.x, level.p.positionRelative.y);
        }

        // loop through attrs
        if (level.p.attrs) {
            for(var j=0, ll2 = level.p.attrs.length; j<ll2; j++) {
                var attribute = level.p.attrs[j];
                var value = attribute.value;
                if (attribute.relative) {
                    value = this.relativeSize(value);
                }
                var attrObject = {};
                attrObject[attribute.attr] = value;
                this._P.sprite.attr(attrObject);
           }
       }


        // position elemenst
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

                case 'goalsRemaining':
                    this.goalsRemaining++;
                    var newElement = new Goal(this._paper)
                    if (element.size) 
                        newElement.size(element.size);
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
        if (this.playing) {
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

            // check for p out of bounds
            var x = p.x(),
                y = p.y(),
                r = p.r();
            if ( ((x + r) < -5) ||
                 ((x - r) > this.frameWidth + 5) ||
                 ((y + r) < -5) ||
                 ((y - r) > this.frameHeight + 5))
            {
                // did we get all of the goals?
                if (this.goalsRemaining <= 0) {
                    this.endLevel();
                }
                else {
                    this.restartLevel();
                }
            }
        }
    };

    Scene.prototype.restartLevel = function() {
        console.log('restart level');
        this.removeElements();
        this.loadLevel(Levels[this.currentLevel]);
    };

    Scene.prototype.endLevel = function() {
        console.log('end level');
        this.removeElements();
        this.currentLevel++;
        if (this.currentLevel >= Levels.length) {
            // game over
            this.endGame();
            return;
        }

        this.loadLevel(Levels[this.currentLevel]);
    };

    Scene.prototype.endGame = function() {
        alert('Thanks for playing!');
        this.playing = false;
    };

    Scene.prototype.removeElements = function() {
        this._collidables.length = 0;
        for (var i=0, ll=this._elements.length; i<ll; i++) {
            if (this._elements[i].sprite) {
                this._elements[i].sprite.remove();
            }
        }
        this._elements.length = 0;
    };

    Scene.prototype.goalPickedUp = function() {
        this.goalsRemaining--;
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
        if (!event.metaKey) {
            this._buttonRect.attr({'stroke-width': '20'});
            console.log("Button Down.");
            
            if (!this._buttonDown) {
                this._buttonDown = true;
            }

            if (this.start) {
                this.start = false;
                this.playing = true;
                this.P().moveRight().startMoving();
            }
        }
        else {
            // Cmd-r: reload page
            if (event.keyCode == 82) {
                window.location.reload(false); 
            }
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
        return Math.max(num * this._relativeFactor, 1);
    }

    return Scene;
});