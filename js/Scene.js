/**
 * Scene.js
 * Holds the player P and an array of elements for checking collisiion.
 */
define([],function() {

    /**
     * Scene constructor.
     */
    var Scene = function() {
        this._P = null;
        this._elements = [];
    };

    /**
     * Gets or sets the P.
     * @param {P} Scene's P is set to p if provided.
     * @return {P} Scene's P.
     */ 
    Scene.prototype.P = function(p) {
        if (p) {
            this._P = p;
        }

        return this._P;
    }

    return Scene;
});