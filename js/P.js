/**
 * P.js
 * P is the player Point.
 */
define(['Element'], function(Element) {

    /**
     * P Constructor
     * @param {Paper} paper Raphael paper object.
     */
    var P = function(paper) {
        // call parent constructor
        Element.call(this, paper);

        this._sprite = paper.circle(100,100,10);
        this._sprite.attr("fill", "#000");
    }
    // inherit from parent
    P.prototype = Object.create(Element.prototype);

    return P;
})