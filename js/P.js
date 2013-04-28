
define(['Element', 'Mover'], function(Element, Mover) {

    var P = function(paper) {
        // call parent constructor
        Element.call(this, paper);

        this.sprite = paper.circle(100,100,1);
        this.sprite.attr("fill", "#000");

        this._xPosAttr = 'cx';
        this._yPosAttr = 'cy';

        this.initializeMover();
    };
    // inherit from parent
    P.prototype = Object.create(Element.prototype);
    P.prototype = _.extend(Mover, P.prototype);

    P.prototype.resize = function() {
        this.sprite.animate({r: this._modSize}, 500);
    };

    P.prototype.update = function() {
        if (this._moving) {
            
        }
    };


    return P;
})