function unitFractal() {

    this.l = {value : -2};
    this.r = {value :  1};
    this.b = {value : -1.5};
    this.t = {value : 1.5};
    this.m = {value : parseFloat(document.getElementById("M").value)};
    this.n = {value : parseFloat(document.getElementById("N").value)};

    this.init = function(anim) {
        this.anim = anim;

        this.lastPos = anim.mouse.pos;
        this.lastWheelDelta = anim.mouse.wheelDelta;

        var mtl = new material(anim.render.context);
        mtl.setShader("fractal");
        var tex = new texture(anim.render.context);
        tex.init("rainbow-gradient.gif", "gradient")
        mtl.addTexture(tex);
        mtl.addFloatUniform(this.l, "l");
        mtl.addFloatUniform(this.r, "r");
        mtl.addFloatUniform(this.b, "b");
        mtl.addFloatUniform(this.t, "t");

        mtl.addFloatUniform(this.m, "m");
        mtl.addFloatUniform(this.n, "n");

        var p0 = new vec(-1, -1,  0);
        var p1 = new vec(-1,  1,  0);
        var p2 = new vec( 1,  1,  0);
        var p3 = new vec( 1, -1,  0);
        this.quadrangle = createQuadrangle(anim.render.context, p0, p1, p2, p3, mtl);
    };

    this.response = function() {
        this.m.value = parseFloat(document.getElementById("M").value);
        this.n.value = parseFloat(document.getElementById("N").value);

        if (this.anim.mouse.down) {
            var delta = new uv((this.anim.mouse.pos.s - this.lastPos.s) / this.anim.mouse.canvas.width,
                               (this.anim.mouse.pos.t - this.lastPos.t) / this.anim.mouse.canvas.height);
            var w = this.r.value - this.l.value, h = this.t.value - this.b.value;
            this.l.value -= delta.s * w;
            this.r.value -= delta.s * w;
            this.b.value -= delta.t * h;
            this.t.value -= delta.t * h;
        }

        if (this.lastWheelDelta != this.anim.mouse.wheelDelta) {
            var s;
            if (this.lastWheelDelta > this.anim.mouse.wheelDelta)
                s = 9 / 10;
            else
                s = 10 / 9;
            var w = this.r.value - this.l.value, h = this.t.value - this.b.value;
            var x = this.anim.mouse.pos.s / this.anim.mouse.canvas.width;
            var y = this.anim.mouse.pos.t / this.anim.mouse.canvas.height;

            this.l.value += x * w * (1 - s);
            this.r.value = this.l.value + w * s;
            this.b.value += y * h * (1 - s);
            this.t.value = this.b.value + h * s;
        }

        this.lastPos = this.anim.mouse.pos;
        this.lastWheelDelta = this.anim.mouse.wheelDelta;
    };

    this.render = function() {
        this.quadrangle.draw();
    };
}