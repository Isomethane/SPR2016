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

    this.copy = function(mtr) {
        for (var i = 0; i < 9; i++)
            this.m[i] = mtr.m[i];

        return this;
    };

    this.clone = function() {
        return new matr3x3().copy(this);
    };

    this.clone4x4 = function() {
        return new matr().set(
            this.m[0], this.m[1], this.m[2], 0,
            this.m[3], this.m[4], this.m[5], 0,
            this.m[6], this.m[7], this.m[8], 0,
            0,         0,         0,         1
        );
    };

    this.transpose = function() {
        var a01 = this.m[1], a02 = this.m[2],
            a10 = this.m[3], a12 = this.m[5],
            a20 = this.m[6], a21 = this.m[7];
            
        this.m[1] = a10;
        this.m[2] = a20;
        this.m[3] = a01;
        this.m[5] = a21;
        this.m[6] = a02;
        this.m[7] = a12;
        
        return this;
    };

    this.invert = function() {
        var a00 = this.m[0], a01 = this.m[1], a02 = this.m[2],
            a10 = this.m[3], a11 = this.m[4], a12 = this.m[5],
            a20 = this.m[6], a21 = this.m[7], a22 = this.m[8],

            b01 =  a22 * a11 - a12 * a21,
            b11 = -a22 * a10 + a12 * a20,
            b21 =  a21 * a10 - a11 * a20,

            det = a00 * b01 + a01 * b11 + a02 * b21;

        if (!det) {
            alert("Tried to invert matrix with null determinant.");
            return;
        }
        det = 1.0 / det;

        this.m[0] = b01 * det;
        this.m[1] = (-a22 * a01 + a02 * a21) * det;
        this.m[2] = (a12 * a01 - a02 * a11) * det;
        this.m[3] = b11 * det;
        this.m[4] = (a22 * a00 - a02 * a20) * det;
        this.m[5] = (-a12 * a00 + a02 * a10) * det;
        this.m[6] = b21 * det;
        this.m[7] = (-a21 * a00 + a01 * a20) * det;
        this.m[8] = (a11 * a00 - a01 * a10) * det;
        
        return this;
    };

    this.invert4x4 = function(mtr) {
        var a00 = mtr.m[0], a01 = mtr.m[1], a02 = mtr.m[2],
            a10 = mtr.m[4], a11 = mtr.m[5], a12 = mtr.m[6],
            a20 = mtr.m[8], a21 = mtr.m[9], a22 = mtr.m[10],

            b01 =  a22 * a11 - a12 * a21,
            b11 = -a22 * a10 + a12 * a20,
            b21 =  a21 * a10 - a11 * a20,

            det = a00 * b01 + a01 * b11 + a02 * b21;

        if (!det) {
            alert("Tried to invert matrix with null determinant.");
            return;
        }
        det = 1.0 / det;

        this.m[0] = b01 * det;
        this.m[1] = (-a22 * a01 + a02 * a21) * det;
        this.m[2] = (a12 * a01 - a02 * a11) * det;
        this.m[3] = b11 * det;
        this.m[4] = (a22 * a00 - a02 * a20) * det;
        this.m[5] = (-a12 * a00 + a02 * a10) * det;
        this.m[6] = b21 * det;
        this.m[7] = (-a21 * a00 + a01 * a20) * det;
        this.m[8] = (a11 * a00 - a01 * a10) * det;

        return this;
    };

    this.setIdentity = function() {
        this.m = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ];
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

        this.m[0] =  a00;
        this.m[1] =  a01;
        this.m[2] =  a02;
        this.m[3] =  a03;
        this.m[4] =  a10;
        this.m[5] =  a11;
        this.m[6] =  a12;
        this.m[7] =  a13;
        this.m[8] =  a20;
        this.m[9] =  a21;
        this.m[10] = a22;
        this.m[11] = a23;
        this.m[12] = a30;
        this.m[13] = a31;
        this.m[14] = a32;
        this.m[15] = a33;

        return this;
    };

    this.copy = function(mtr) {
        for (var i = 0; i < 16; i++)
            this.m[i] = mtr.m[i];

        return this;
    };

    this.clone = function() {
        return new matr().copy(this);
    };

    this.clone3x3 = function() {
        return new matr3x3().set(
            this.m[0], this.m[1], this.m[2],
            this.m[4], this.m[5], this.m[6],
            this.m[8], this.m[9], this.m[10]
        );
    };

    this.invert = function() {
        var a00 = this.m[0],  a01 = this.m[1],  a02 = this.m[2],  a03 = this.m[3],
            a10 = this.m[4],  a11 = this.m[5],  a12 = this.m[6],  a13 = this.m[7],
            a20 = this.m[8],  a21 = this.m[9],  a22 = this.m[10], a23 = this.m[11],
            a30 = this.m[12], a31 = this.m[13], a32 = this.m[14], a33 = this.m[15],

            b00 = a00 * a11 - a01 * a10,
            b01 = a00 * a12 - a02 * a10,
            b02 = a00 * a13 - a03 * a10,
            b03 = a01 * a12 - a02 * a11,
            b04 = a01 * a13 - a03 * a11,
            b05 = a02 * a13 - a03 * a12,
            b06 = a20 * a31 - a21 * a30,
            b07 = a20 * a32 - a22 * a30,
            b08 = a20 * a33 - a23 * a30,
            b09 = a21 * a32 - a22 * a31,
            b10 = a21 * a33 - a23 * a31,
            b11 = a22 * a33 - a23 * a32,

            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

        if (Math.abs(det) < epsilon) {
            alert("Tried to invert matrix with null determinant.");
            return;
        }
        det = 1.0 / det;

        this.m[0] =  (a11 * b11 - a12 * b10 + a13 * b09) * det;
        this.m[1] =  (a02 * b10 - a01 * b11 - a03 * b09) * det;
        this.m[2] =  (a31 * b05 - a32 * b04 + a33 * b03) * det;
        this.m[3] =  (a22 * b04 - a21 * b05 - a23 * b03) * det;
        this.m[4] =  (a12 * b08 - a10 * b11 - a13 * b07) * det;
        this.m[5] =  (a00 * b11 - a02 * b08 + a03 * b07) * det;
        this.m[6] =  (a32 * b02 - a30 * b05 - a33 * b01) * det;
        this.m[7] =  (a20 * b05 - a22 * b02 + a23 * b01) * det;
        this.m[8] =  (a10 * b10 - a11 * b08 + a13 * b06) * det;
        this.m[9] =  (a01 * b08 - a00 * b10 - a03 * b06) * det;
        this.m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        this.m[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        this.m[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        this.m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        this.m[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        this.m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

        return this;
    };

    this.multiply = function (mtr) {
        var a00 = this.m[0], a01 = this.m[1], a02 = this.m[2], a03 = this.m[3],
            a10 = this.m[4], a11 = this.m[5], a12 = this.m[6], a13 = this.m[7],
            a20 = this.m[8], a21 = this.m[9], a22 = this.m[10], a23 = this.m[11],
            a30 = this.m[12], a31 = this.m[13], a32 = this.m[14], a33 = this.m[15];

        var b0 = mtr.m[0], b1 = mtr.m[1], b2 = mtr.m[2], b3 = mtr.m[3];
        this.m[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.m[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.m[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.m[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = mtr.m[4]; b1 = mtr.m[5]; b2 = mtr.m[6]; b3 = mtr.m[7];
        this.m[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.m[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.m[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.m[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = mtr.m[8]; b1 = mtr.m[9]; b2 = mtr.m[10]; b3 = mtr.m[11];
        this.m[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.m[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.m[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.m[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = mtr.m[12]; b1 = mtr.m[13]; b2 = mtr.m[14]; b3 = mtr.m[15];
        this.m[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.m[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.m[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.m[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        return this;
    };

    this.setIdentity = function() {
        this.m[0] =  1;
        this.m[1] =  0;
        this.m[2] =  0;
        this.m[3] =  0;
        this.m[4] =  0;
        this.m[5] =  1;
        this.m[6] =  0;
        this.m[7] =  0;
        this.m[8] =  0;
        this.m[9] =  0;
        this.m[10] = 1;
        this.m[11] = 0;
        this.m[12] = 0;
        this.m[13] = 0;
        this.m[14] = 0;
        this.m[15] = 1;

        return this;
    };

    this.setTranslate = function(v) {
        this.m[0] =  1;
        this.m[1] =  0;
        this.m[2] =  0;
        this.m[3] =  0;
        this.m[4] =  0;
        this.m[5] =  1;
        this.m[6] =  0;
        this.m[7] =  0;
        this.m[8] =  0;
        this.m[9] =  0;
        this.m[10] = 1;
        this.m[11] = 0;
        this.m[12] = v.x;
        this.m[13] = v.y;
        this.m[14] = v.z;
        this.m[15] = 1;

        return this;
    };

    this.translate = function(v) {
        this.m[12] += v.x;
        this.m[13] += v.y;
        this.m[14] += v.z;

        return this;
    };

    this.setScale = function(v) {
        this.m[0] =  v.x;
        this.m[1] =  0;
        this.m[2] =  0;
        this.m[3] =  0;
        this.m[4] =  0;
        this.m[5] =  v.y;
        this.m[6] =  0;
        this.m[7] =  0;
        this.m[8] =  0;
        this.m[9] =  0;
        this.m[10] = v.z;
        this.m[11] = 0;
        this.m[12] = 0;
        this.m[13] = 0;
        this.m[14] = 0;
        this.m[15] = 1;

        return this;
    };

    this.scale = function(v) {
        this.m[0] *=  v.x;
        this.m[1] *=  v.x;
        this.m[2] *=  v.x;
        this.m[3] *=  v.x;
        this.m[4] *=  v.y;
        this.m[5] *=  v.y;
        this.m[6] *=  v.y;
        this.m[7] *=  v.y;
        this.m[8] *=  v.z;
        this.m[9] *=  v.z;
        this.m[10] *= v.z;
        this.m[11] *= v.z;

        return this;
    };

    this.setRotate = function(rad, axis) {
        var x = axis.x, y = axis.y, z = axis.z,
            len = Math.sqrt(x * x + y * y + z * z),
            s, c, t;

        if (Math.abs(len) < epsilon) {
            alert("Tried to rotate around null-vector.");
            return;
        }

        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;

        s = Math.sin(rad);
        c = Math.cos(rad);
        t = 1 - c;

        this.m[0] =  x * x * t + c;
        this.m[1] =  y * x * t + z * s;
        this.m[2] =  z * x * t - y * s;
        this.m[3] =  0;
        this.m[4] =  x * y * t - z * s;
        this.m[5] =  y * y * t + c;
        this.m[6] =  z * y * t + x * s;
        this.m[7] =  0;
        this.m[8] =  x * z * t + y * s;
        this.m[9] =  y * z * t - x * s;
        this.m[10] = z * z * t + c;
        this.m[11] = 0;
        this.m[12] = 0;
        this.m[13] = 0;
        this.m[14] = 0;
        this.m[15] = 1;

        return this;
    };

    this.rotate = function (rad, axis) {
        var x = axis.x, y = axis.y, z = axis.z,
            len = Math.sqrt(x * x + y * y + z * z),
            s, c, t,
            a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            b00, b01, b02,
            b10, b11, b12,
            b20, b21, b22;

        if (Math.abs(len) < epsilon) {
            alert("Tried to rotate around null-vector.");
        }

        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;

        s = Math.sin(rad);
        c = Math.cos(rad);
        t = 1 - c;

        a00 = this.m[0]; a01 = this.m[1]; a02 = this.m[2];  a03 = this.m[3];
        a10 = this.m[4]; a11 = this.m[5]; a12 = this.m[6];  a13 = this.m[7];
        a20 = this.m[8]; a21 = this.m[9]; a22 = this.m[10]; a23 = this.m[11];

        b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
        b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
        b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

        this.m[0] =  a00 * b00 + a10 * b01 + a20 * b02;
        this.m[1] =  a01 * b00 + a11 * b01 + a21 * b02;
        this.m[2] =  a02 * b00 + a12 * b01 + a22 * b02;
        this.m[3] =  a03 * b00 + a13 * b01 + a23 * b02;
        this.m[4] =  a00 * b10 + a10 * b11 + a20 * b12;
        this.m[5] =  a01 * b10 + a11 * b11 + a21 * b12;
        this.m[6] =  a02 * b10 + a12 * b11 + a22 * b12;
        this.m[7] =  a03 * b10 + a13 * b11 + a23 * b12;
        this.m[8] =  a00 * b20 + a10 * b21 + a20 * b22;
        this.m[9] =  a01 * b20 + a11 * b21 + a21 * b22;
        this.m[10] = a02 * b20 + a12 * b21 + a22 * b22;
        this.m[11] = a03 * b20 + a13 * b21 + a23 * b22;

        return this;
    };

    this.setRotateX = function(rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad);

        this.m[0] =  1;
        this.m[1] =  0;
        this.m[2] =  0;
        this.m[3] =  0;
        this.m[4] =  0;
        this.m[5] =  c;
        this.m[6] =  s;
        this.m[7] =  0;
        this.m[8] =  0;
        this.m[9] = -s;
        this.m[10] = c;
        this.m[11] = 0;
        this.m[12] = 0;
        this.m[13] = 0;
        this.m[14] = 0;
        this.m[15] = 1;

        return this;
    };

    this.rotateX = function (rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad),
            a10 = this.m[4],
            a11 = this.m[5],
            a12 = this.m[6],
            a13 = this.m[7],
            a20 = this.m[8],
            a21 = this.m[9],
            a22 = this.m[10],
            a23 = this.m[11];

        this.m[4] =  a10 * c + a20 * s;
        this.m[5] =  a11 * c + a21 * s;
        this.m[6] =  a12 * c + a22 * s;
        this.m[7] =  a13 * c + a23 * s;
        this.m[8] =  a20 * c - a10 * s;
        this.m[9] =  a21 * c - a11 * s;
        this.m[10] = a22 * c - a12 * s;
        this.m[11] = a23 * c - a13 * s;

        return this;
    };

    this.setRotateY = function(rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad);

        this.m[0] =  c;
        this.m[1] =  0;
        this.m[2] = -s;
        this.m[3] =  0;
        this.m[4] =  0;
        this.m[5] =  1;
        this.m[6] =  0;
        this.m[7] =  0;
        this.m[8] =  s;
        this.m[9] =  0;
        this.m[10] = c;
        this.m[11] = 0;
        this.m[12] = 0;
        this.m[13] = 0;
        this.m[14] = 0;
        this.m[15] = 1;

        return this;
    };

    this.rotateY = function (rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad),
            a00 = this.m[0],
            a01 = this.m[1],
            a02 = this.m[2],
            a03 = this.m[3],
            a20 = this.m[8],
            a21 = this.m[9],
            a22 = this.m[10],
            a23 = this.m[11];

        this.m[0] =  a00 * c - a20 * s;
        this.m[1] =  a01 * c - a21 * s;
        this.m[2] =  a02 * c - a22 * s;
        this.m[3] =  a03 * c - a23 * s;
        this.m[8] =  a00 * s + a20 * c;
        this.m[9] =  a01 * s + a21 * c;
        this.m[10] = a02 * s + a22 * c;
        this.m[11] = a03 * s + a23 * c;

        return this;
    };

    this.setRotateZ = function(rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad);

        this.m[0]  = c;
        this.m[1]  = s;
        this.m[2]  = 0;
        this.m[3]  = 0;
        this.m[4] = -s;
        this.m[5] = c;
        this.m[6] = 0;
        this.m[7] = 0;
        this.m[8] = 0;
        this.m[9] = 0;
        this.m[10] = 1;
        this.m[11] = 0;
        this.m[12] = 0;
        this.m[13] = 0;
        this.m[14] = 0;
        this.m[15] = 1;

        return this;
    };

    this.rotateZ = function (rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad),
            a00 = this.m[0],
            a01 = this.m[1],
            a02 = this.m[2],
            a03 = this.m[3],
            a10 = this.m[4],
            a11 = this.m[5],
            a12 = this.m[6],
            a13 = this.m[7];

        this.m[0] = a00 * c + a10 * s;
        this.m[1] = a01 * c + a11 * s;
        this.m[2] = a02 * c + a12 * s;
        this.m[3] = a03 * c + a13 * s;
        this.m[4] = a10 * c - a00 * s;
        this.m[5] = a11 * c - a01 * s;
        this.m[6] = a12 * c - a02 * s;
        this.m[7] = a13 * c - a03 * s;

        return this;
    };

    this.getTranslation = function() {
        return new vec(this.m[12], this.m[13], this.m[14]);
    };

    this.frustum = function (left, right, bottom, top, near, far) {
        var rl = 1 / (right - left),
            tb = 1 / (top - bottom),
            nf = 1 / (near - far);
        this.m[0] = (near * 2) * rl;
        this.m[1] = 0;
        this.m[2] = 0;
        this.m[3] = 0;
        this.m[4] = 0;
        this.m[5] = (near * 2) * tb;
        this.m[6] = 0;
        this.m[7] = 0;
        this.m[8] = (right + left) * rl;
        this.m[9] = (top + bottom) * tb;
        this.m[10] = (far + near) * nf;
        this.m[11] = -1;
        this.m[12] = 0;
        this.m[13] = 0;
        this.m[14] = (far * near * 2) * nf;
        this.m[15] = 0;

        return this;
    };

    this.perspective = function (fovy, aspect, near, far) {
        var f = 1.0 / Math.tan(fovy / 2),
            nf = 1 / (near - far);
        this.m[0] = f / aspect;
        this.m[1] = 0;
        this.m[2] = 0;
        this.m[3] = 0;
        this.m[4] = 0;
        this.m[5] = f;
        this.m[6] = 0;
        this.m[7] = 0;
        this.m[8] = 0;
        this.m[9] = 0;
        this.m[10] = (far + near) * nf;
        this.m[11] = -1;
        this.m[12] = 0;
        this.m[13] = 0;
        this.m[14] = (2 * far * near) * nf;
        this.m[15] = 0;

        return this;
    };

    this.lookAt = function(eye, center, up) {

        var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;

        if (Math.abs(eye.x - center.x) < epsilon &&
            Math.abs(eye.y - center.y) < epsilon &&
            Math.abs(eye.z - center.z) < epsilon) {
            return this.setIdentity();
        }

        z0 = eye.x - center.x;
        z1 = eye.y - center.y;
        z2 = eye.z - center.z;

        len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;

        x0 = up.y * z2 - up.z * z1;
        x1 = up.z * z0 - up.x * z2;
        x2 = up.x * z1 - up.y * z0;
        len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        if (!len) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        } else {
            len = 1 / len;
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }

        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;

        len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        if (!len) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        } else {
            len = 1 / len;
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }

        this.m[0] = x0;
        this.m[1] = y0;
        this.m[2] = z0;
        this.m[3] = 0;
        this.m[4] = x1;
        this.m[5] = y1;
        this.m[6] = z1;
        this.m[7] = 0;
        this.m[8] = x2;
        this.m[9] = y2;
        this.m[10] = z2;
        this.m[11] = 0;
        this.m[12] = -(x0 * eye.x + x1 * eye.y + x2 * eye.z);
        this.m[13] = -(y0 * eye.x + y1 * eye.y + y2 * eye.z);
        this.m[14] = -(z0 * eye.x + z1 * eye.y + z2 * eye.z);
        this.m[15] = 1;

        return this;
    };
}
