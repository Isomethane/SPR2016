function matr3x3() {

    this.m = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ];

    this.set = function(
        a00, a01, a02,
        a10, a11, a12,
        a20, a21, a22) {
        this.m = [
            a00, a01, a02,
            a10, a11, a12,
            a20, a21, a22
        ];
    };

    this.transpose = function() {
        var m = [
            this.m[0], this.m[3], this.m[6],
            this.m[1], this.m[4], this.m[7],
            this.m[2], this.m[5], this.m[8]
        ];
        this.m = m;
    };

    this.setIdentity = function() {
        this.m = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ];
    };

    this.toMatr4x4 = function() {
        var mtr = new matr();
        mtr.set(
            this.m[0], this.m[1], this.m[2], 0,
            this.m[3], this.m[4], this.m[5], 0,
            this.m[6], this.m[7], this.m[8], 0,
                    0,         0,         0, 1
        );
        return mtr;
    };
}

function matr() {

    this.m = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];

    this.set = function(
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        a30, a31, a32, a33) {
        this.m = [
            a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            a30, a31, a32, a33
        ];

        return this;
    };

    this.copy = function(mtr) {
        this.m = [
             mtr.m[0],  mtr.m[1],  mtr.m[2],  mtr.m[3],
             mtr.m[4],  mtr.m[5],  mtr.m[6],  mtr.m[7],
             mtr.m[8],  mtr.m[9], mtr.m[10], mtr.m[11],
            mtr.m[12], mtr.m[13], mtr.m[14], mtr.m[15]
        ];

        return this;
    };

    this.transpose = function() {
        var m = [
            this.m[0], this.m[4],  this.m[8], this.m[12],
            this.m[1], this.m[5],  this.m[9], this.m[13],
            this.m[2], this.m[6], this.m[10], this.m[14],
            this.m[3], this.m[7], this.m[11], this.m[15]
        ];
        this.m = m;

        return this;
    };

    this.transpose = function() {
        var c =  this.m[0], d =  this.m[1], e =  this.m[2],  g = this.m[3],
            f =  this.m[4], h =  this.m[5], i =  this.m[6],  j = this.m[7],
            k =  this.m[8], l =  this.m[9], o = this.m[10], m = this.m[11],
            n = this.m[12], p = this.m[13], r = this.m[14], s = this.m[15],
            A = c * h - d * f,
            B = c * i - e * f,
            C = l * r - o * p,
            D = l * s - m * p,
            E = o * s - m * r,
            t = c * j - g * f,
            u = d * i - e * h,
            v = d * j - g * h,
            w = e * j - g * i,
            x = k * p - l * n,
            y = k * r - o * n,
            z = k * s - m * n,
            q = 1 / (A * E - B * D + t * C + u * z - v * y + w * x);

        this.m[0]  = ( h * E - i * D + j * C) * q;
        this.m[1]  = (-d * E + e * D - g * C) * q;
        this.m[2]  = ( p * w - r * v + s * u) * q;
        this.m[3]  = (-l * w + o * v - m * u) * q;
        this.m[4]  = (-f * E + i * z - j * y) * q;
        this.m[5]  = ( c * E - e * z + g * y) * q;
        this.m[6]  = (-n * w + r * t - s * B) * q;
        this.m[7]  = ( k * w - o * t + m * B) * q;
        this.m[8]  = ( f * D - h * z + j * x) * q;
        this.m[9]  = (-c * D + d * z - g * x) * q;
        this.m[10] = ( n * v - p * t + s * A) * q;
        this.m[11] = (-k * v + l * t - m * A) * q;
        this.m[12] = (-f * C + h * y - i * x) * q;
        this.m[13] = ( c * C - d * y + e * x) * q;
        this.m[14] = (-n * u + p * B - r * A) * q;
        this.m[15] = ( k * u - l * B + o * A) * q;

        return this;
    };

    this.multiply = function(mtr) {
        var d =  this.m[0], e =  this.m[1], g  = this.m[2], f =  this.m[3],
            h =  this.m[4], i =  this.m[5], j  = this.m[6], k =  this.m[7],
            l =  this.m[8], o =  this.m[9], m = this.m[10], n = this.m[11],
            p = this.m[12], r = this.m[13], s = this.m[14], a = this.m[15];

        var A =  mtr.m[0], B =  mtr.m[1], t =  mtr.m[2], u =  mtr.m[3],
            v =  mtr.m[4], w =  mtr.m[5], x =  mtr.m[6], y =  mtr.m[7],
            z =  mtr.m[8], C =  mtr.m[9], D = mtr.m[10], E = mtr.m[11],
            q = mtr.m[12], F = mtr.m[13], G = mtr.m[14], b = mtr.m[15];

        this.m[0]  = A * d + B * h + t * l + u * p;
        this.m[1]  = A * e + B * i + t * o + u * r;
        this.m[2]  = A * g + B * j + t * m + u * s;
        this.m[3]  = A * f + B * k + t * n + u * a;
        this.m[4]  = v * d + w * h + x * l + y * p;
        this.m[5]  = v * e + w * i + x * o + y * r;
        this.m[6]  = v * g + w * j + x * m + y * s;
        this.m[7]  = v * f + w * k + x * n + y * a;
        this.m[8]  = z * d + C * h + D * l + E * p;
        this.m[9]  = z * e + C * i + D * o + E * r;
        this.m[10] = z * g + C * j + D * m + E * s;
        this.m[11] = z * f + C * k + D * n + E * a;
        this.m[12] = q * d + F * h + G * l + b * p;
        this.m[13] = q * e + F * i + G * o + b * r;
        this.m[14] = q * g + F * j + G * m + b * s;
        this.m[15] = q * f + F * k + G * n + b * a;

        return this;
    }

    this.setIdentity = function() {
        this.m = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        return this;
    };

    this.setTranslate = function(v) {
        this.m = [
              1,   0,   0, 0,
              0,   1,   0, 0,
              0,   0,   1, 0,
            v.x, v.y, v.z, 1
        ];

        return this;
    };

    this.translate = function(v) {
        this.m[12] += v.x;
        this.m[13] += v.y;
        this.m[14] += v.z;

        return this;
    };

    this.setScale = function(v) {
        this.m = [
            v.x,   0,   0, 0,
              0, v.y,   0, 0,
              0,   0, v.z, 0,
              0,   0,   0, 1
        ];

        return this;
    };

    this.scale = function(v) {
        this.m[0] *= v.x;
        this.m[1] *= v.x;
        this.m[2] *= v.x;
        this.m[3] *= v.x;
        this.m[4] *= v.y;
        this.m[5] *= v.y;
        this.m[6] *= v.y;
        this.m[7] *= v.y;
        this.m[8] *= v.z;
        this.m[9] *= v.z;
        this.m[10] *= v.z;
        this.m[11] *= v.z;

        return this;
    };

    this.rotate = function(angle, v) {
        v.normalize();
        angle = deg2rad(angle);

        var sin = Math.sin(angle), cos = Math.cos(angle);
        var b = this.m[0], f = this.m[1], k = this.m[2], l = this.m[3],
            o = this.m[4], m = this.m[5], n = this.m[6], p = this.m[7],
            r = this.m[8], s = this.m[9], A = this.m[10], B = this.m[11],
            t = v.x * v.x * (1 - cos) + cos,
            g = v.z * v.z * (1 - cos) + cos,
            x = v.y * v.y * (1 - cos) + cos,
            y = v.y * v.z * (1 - cos) + v.x * sin,
            z = v.x * v.z * (1 - cos) + v.y * sin,
            u = v.x * v.y * (1 - cos) + v.z * sin,
            e = v.y * v.z * (1 - cos) - v.x * sin,
            h = v.x * v.z * (1 - cos) - v.y * sin,
            w = v.x * v.y * (1 - cos) - v.z * sin;

        this.m[0] = b * t + o * u + r * h;
        this.m[1] = f * t + m * u + s * h;
        this.m[2] = k * t + n * u + A * h;
        this.m[3] = l * t + p * u + B * h;
        this.m[4] = b * w + o * x + r * y;
        this.m[5] = f * w + m * x + s * y;
        this.m[6] = k * w + n * x + A * y;
        this.m[7] = l * w + p * x + B * y;
        this.m[8] = b * z + o * e + r * g;
        this.m[9] = f * z + m * e + s * g;
        this.m[10] = k * z + n * e + A * g;
        this.m[11] = l * z + p * e + B * g;

        return this;
    };

    this.rotateX = function(angle) {
        angle = deg2rad(angle);
        var sin = Math.sin(angle), cos = Math.cos(angle);
        var e = this.m[4], g = this.m[5], f =  this.m[6], h =  this.m[7],
            i = this.m[8], j = this.m[9], k = this.m[10], l = this.m[11];

        this.m[4] = e * cos + i * sin;
        this.m[5] = g * cos + j * sin;
        this.m[6] = f * cos + k * sin;
        this.m[7] = h * cos + l * sin;
        this.m[8] = e * -sin + i * cos;
        this.m[9] = g * -sin + j * cos;
        this.m[10] = f * -sin + k * cos;
        this.m[11] = h * -sin + l * cos;

        return this;
    };

    this.rotateY = function(angle) {
        angle = deg2rad(angle);
        var sin = Math.sin(angle), cos = Math.cos(angle);
        var e = this.m[0], g = this.m[1], f =  this.m[2], h =  this.m[3],
            i = this.m[8], j = this.m[9], k = this.m[10], l = this.m[11];

        this.m[0] = e * cos + i * -sin;
        this.m[1] = g * cos + j * -sin;
        this.m[2] = f * cos + k * -sin;
        this.m[3] = h * cos + l * -sin;
        this.m[8] = e * sin + i * cos;
        this.m[9] = g * sin + j * cos;
        this.m[10] = f * sin + k * cos;
        this.m[11] = h * sin + l * cos;

        return this;
    };

    this.rotateZ = function(angle) {
        angle = deg2rad(angle);
        var sin = Math.sin(angle), cos = Math.cos(angle);
        var e = this.m[0], g = this.m[1], f = this.m[2], h = this.m[3],
            i = this.m[4], j = this.m[5], k = this.m[6], l = this.m[7];

        this.m[0] = e * cos + i * sin;
        this.m[1] = g * cos + j * sin;
        this.m[2] = f * cos + k * sin;
        this.m[3] = h * cos + l * sin;
        this.m[4] = e * -sin + i * cos;
        this.m[5] = g * -sin + j * cos;
        this.m[6] = f * -sin + k * cos;
        this.m[7] = h * -sin + l * cos;
    };

    this.frustum = function(a, b, c, d, e, g) {
        var h = b - a, i = d - c, j = g - e;
        this.m[0] = e * 2 / h;
        this.m[1] = 0;
        this.m[2] = 0;
        this.m[3] = 0;
        this.m[4] = 0;
        this.m[5] = e * 2 / i;
        this.m[6] = 0;
        this.m[7] = 0;
        this.m[8] = (b + a) / h;
        this.m[9] = (d + c) / i;
        this.m[10] = -(g + e) / j;
        this.m[11] = -1;
        this.m[12] = 0;
        this.m[13] = 0;
        this.m[14] = -(g * e * 2) / j;
        this.m[15] = 0;
    };
    
    this.perspective = function(a, b, c, d) {
        a = c * Math.tan(a * Math.PI / 360);
        b = a * b;
        this.frustum(-b, b, -a, a, c, d);
    };
}
