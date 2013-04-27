/**
 * Scene.js
 * Holds the player P and an array of elements for checking collisiion.
 */
define([],function() {

    /**
     * Scene constructor.
     */
    var Scene = function(paper) {
        this.width = null;
        this.height = null;

        this._P = null;
        this._elements = [];
        this._paper = paper;
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

    Scene.prototype.resize = function(width, height) {
        this.width = width;
        this.height = height;
    }

    return Scene;
});