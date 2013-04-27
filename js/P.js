
define([], function() {

    var P = function(paper) {
        this._sprite = paper.circle(100,100,10);
        this._sprite.attr("fill", "#000");
    }

    return P;
})