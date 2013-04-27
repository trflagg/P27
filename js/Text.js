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

        this.sprite = paper.text(-1000,-1000,text);
        this.sprite.attr({'font-family': 'Lato'});
        this.sprite.attr({'font-size': '72'});
        this.sprite.attr({'font-weight': '100'});

    };
    // inherit from parent
    Text.prototype = Object.create(Element.prototype);

    return Text;
})