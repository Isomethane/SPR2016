function vec(x, y, z) {

    this.x = x;
    this.y = y;
    this.z = z;

    this.set = function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    };

    this.add = function(v) {
        var r = this;
        r.x += v.x;
        r.y += v.y;
        r.z += v.z;
        return r;
    };

    this.sub = function(v) {
        var r = this;
        r.x -= v.x;
        r.y -= v.y;
        r.z -= v.z;
        return r;
    };

    this.mul = function(n) {
        var r;
        r.x *= n;
        r.y *= n;
        r.z *= n;
        return r;
    };

    this.normalize = function() {
        var len = this.length();
        if (len == 0)
            alert("Tried to normalize null-vector.");
        var r = this;
        r.x /= len;
        r.y /= len;
        r.z /= len;
        return r;
    };

    this.length = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
}