function unitFractal() {

    this.l = -2;
    this.r = 1;
    this.b = -1.5;
    this.t = 1.5;

    this.init = function(anim) {
        this.anim = anim;

        this.lastPos = anim.mouse.pos;
        this.lastWheelDelta = anim.mouse.wheelDelta;

        var mtl = new material(anim.render.context);
        mtl.setShader("fractal");
        var tex = new texture(anim.render.context);
        tex.init("rainbow-gradient.gif", "gradient")
        mtl.addTexture(tex);
        var p0 = new vec(-1, -1,  0);
        var p1 = new vec(-1,  1,  0);
        var p2 = new vec( 1,  1,  0);
        var p3 = new vec( 1, -1,  0);
        this.quadrangle = createQuadrangle(anim.render.context, p0, p1, p2, p3, mtl);

        this.lUniform = anim.render.context.getUniformLocation(mtl.shader.program, "l");
        this.rUniform = anim.render.context.getUniformLocation(mtl.shader.program, "r");
        this.bUniform = anim.render.context.getUniformLocation(mtl.shader.program, "b");
        this.tUniform = anim.render.context.getUniformLocation(mtl.shader.program, "t");

        this.mUniform = anim.render.context.getUniformLocation(mtl.shader.program, "m");
        this.nUniform = anim.render.context.getUniformLocation(mtl.shader.program, "n");
    };

    this.response = function() {
        this.m = parseFloat(document.getElementById("M").value);
        this.n = parseFloat(document.getElementById("N").value);

        if (this.anim.mouse.down) {
            var delta = new uv((this.anim.mouse.pos.s - this.lastPos.s) / this.anim.mouse.canvas.width,
                               (this.anim.mouse.pos.t - this.lastPos.t) / this.anim.mouse.canvas.height);
            var w = this.r - this.l, h = this.t - this.b;
            this.l -= delta.s * w;
            this.r -= delta.s * w;
            this.b -= delta.t * h;
            this.t -= delta.t * h;
        }

        if (this.lastWheelDelta != this.anim.mouse.wheelDelta) {
            var s;
            if (this.lastWheelDelta > this.anim.mouse.wheelDelta)
                s = 9 / 10;
            else
                s = 10 / 9;
            var w = this.r - this.l, h = this.t - this.b;
            var x = this.anim.mouse.pos.s / this.anim.mouse.canvas.width;
            var y = this.anim.mouse.pos.t / this.anim.mouse.canvas.height;

            this.l += x * w * (1 - s);
            this.r = this.l + w * s;
            this.b += y * h * (1 - s);
            this.t = this.b + h * s;
        }

        this.lastPos = this.anim.mouse.pos;
        this.lastWheelDelta = this.anim.mouse.wheelDelta;
    };

    this.render = function() {
        this.anim.render.context.uniform1f(this.lUniform, this.l);
        this.anim.render.context.uniform1f(this.rUniform, this.r);
        this.anim.render.context.uniform1f(this.bUniform, this.b);
        this.anim.render.context.uniform1f(this.tUniform, this.t);

        this.anim.render.context.uniform1f(this.mUniform, this.m);
        this.anim.render.context.uniform1f(this.nUniform, this.n);

        this.quadrangle.draw();
    };
}