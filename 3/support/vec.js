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

    this.subtract = function(v) {
        var r = this;
        r.x -= v.x;
        r.y -= v.y;
        r.z -= v.z;
        return r;
    };

    this.multiply = function(n) {
        var r;
        r.x *= n;
        r.y *= n;
        r.z *= n;
        return r;
    };

    this.transform = function(mtr) {
        var x = this.x, y = this.y, z = this.z;
        this.x = mtr.m[0] * x + mtr.m[4] * y +  mtr.m[8] * z + mtr.m[12];
        this.y = mtr.m[1] * x + mtr.m[5] * y +  mtr.m[9] * z + mtr.m[13];
        this.z = mtr.m[2] * x + mtr.m[6] * y + mtr.m[10] * z + mtr.m[14];
        return this;
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