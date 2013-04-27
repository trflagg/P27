/**
 * Text.js
 * For when you want text.
 */
define(['Element'], function(Element) {

    /**
     * Text Constructor
     * @param {String} text Text to be displayed.
     * @param {Paper} paper Raphael paper object.
     */
    var Text = function(text, paper) {
        // call parent constructor
        Element.call(this, paper);

        this._sprite = paper.text(100,100,text);
        this._sprite.attr({'font-family': 'Lato'});
        this._sprite.attr({'font-size': '72'});
        this._sprite.attr({'font-weight': '100'});

    };
    // inherit from parent
    Text.prototype = Object.create(Element.prototype);

    return Text;
})