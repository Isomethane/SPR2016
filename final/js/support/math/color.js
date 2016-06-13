function color(r, g, b) {
    this.r = r == null ? 1 : r;
    this.g = g == null ? 1 : g;
    this.b = b == null ? 1 : b;

    this.set = function(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    };

    this.copy = function(c) {
        this.r = c.r;
        this.g = c.g;
        this.b = c.b;
    };

    this.clone = function() {
        return new color(this.r, this.g, this.b);
    };

    this.add = function(c) {
        var r = this;
        r.r += c.r;
        r.g += c.g;
        r.b += c.b;
        return r;
    };

    this.subtract = function(c) {
        var r = this;
        r.r -= c.r;
        r.g -= c.g;
        r.b -= c.b;
        return r;
    };

    this.multiply = function(n) {
        var r = this;
        r.r *= n;
        r.g *= n;
        r.b *= n;
        return r;
    };
    
    this.toVec = function() {
        return new vec(this.r, this.g, this.b);
    }
}