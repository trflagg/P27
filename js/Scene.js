/**
 * Scene.js
 * Holds the player P and an array of elements for checking collisiion.
 */
define(['P', 'Text'],function(P, Text) {

    /**
     * Scene constructor.
     */
    var Scene = function(windowWidth, windowHeight) {
        this.windowWidth = null;
        this.windowHeight = null;

        this._P = null;
        this._elements = [];

        this.windowSize(windowWidth, windowHeight);
        var paper = Raphael("frame", this.frameWidth, this.frameHeight);
        this._paper = paper;

        // background rect
        paper.rect(0,0,this.frameWidth, this.frameHeight).attr({'fill':'#fff',});

        // demo scene

        var p = new P(paper);
        this.P(p);
        p.positionPercent(.6667, .6667);

        var t = new Text('P27', paper);
        this.add(t);
        t.positionPercent(.6, .6);
    };

    Scene.prototype.P = function(p) {
        if (p) {
            this._P = p;
            p.setScene(this);
        }

        return this._P;
    }

    Scene.prototype.add = function(element) {
        this._elements.push(element);
        element.setScene(this);
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
        }
    }

    return Scene;
});