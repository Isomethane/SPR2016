function uv(s, t) {

    this.s = s;
    this.t = t;

    this.set = function(s, t) {
        this.s = s;
        this.t = t;
        return this;
    };

    this.add = function(c) {
        var r = this;
        r.s += c.s;
        r.t += c.t;
        return r;
    };

    this.sub = function(c) {
        var r = this;
        r.s -= c.s;
        r.t -= c.t;
        return r;
    };

    this.mul = function(n) {
        var r = this;
        r.s *= n;
        r.t *= n;
        return r;
    };

    this.normalize = function() {
        var len = this.length();
        if (len == 0)
            alert("Tried to normalize null-vector.");
        var r;
        r.set(this.s / len, this.t / len);
        return r;
    };

    this.length = function() {
        return Math.sqrt(this.s * this.s + this.t * this.t);
    };
}