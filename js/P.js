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

        this.sprite = paper.circle(100,100,1);
        this.sprite.attr("fill", "#000");

        this._xPosAttr = 'cx';
        this._yPosAttr = 'cy';
    }
    // inherit from parent
    P.prototype = Object.create(Element.prototype);

    return P;
})