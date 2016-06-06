function unitBox() {

    this.init = function(anim) {
        this.anim = anim;

        this.rotateX = 0;
        this.rotateY = 0;
        this.rotateZ = 0;
        this.matrix = new matr();
        this.proj = new matr();
        this.proj.perspective(45, anim.render.context.viewportWidth / anim.render.context.viewportHeight, 0.1, 100.0);
        
        var fMtl = new material(anim.render.context);
        fMtl.setShader("simple_fractal");
        var fTex = new texture(anim.render.context);
        fTex.init("rainbow-gradient.gif", "gradient");
        fMtl.addTexture(fTex);

        var p0 = new vec(-1, -1,  0);
        var p1 = new vec(-1,  1,  0);
        var p2 = new vec( 1,  1,  0);
        var p3 = new vec( 1, -1,  0);
        this.quadrangle = createQuadrangle(anim.render.context, p0, p1, p2, p3, fMtl);
        
        var bTex = new texture(anim.render.context);
        this.framebuffer = new framebuffer(anim.render.context, bTex);
        this.framebuffer.init(512, 512, "fractal");

        var bMtl = new material(anim.render.context);
        bMtl.setShader("box");
        bMtl.addTexture(bTex);
        bMtl.addMatrixUniform(this.matrix, "matrix");
        bMtl.addMatrixUniform(this.proj, "proj");

        this.box = createBox(anim.render.context, bMtl);
    };

    this.response = function() {
        this.rotateX += 90 * this.anim.deltaTime;
        this.rotateY += 90 * this.anim.deltaTime;
        this.rotateZ += 90 * this.anim.deltaTime;

        this.matrix.setIdentity();
        this.matrix.rotate(this.rotateX, new vec(1, 0, 0));
        this.matrix.rotate(this.rotateY, new vec(0, 1, 0));
        this.matrix.rotate(this.rotateZ, new vec(0, 0, 1));
        this.matrix.scale(new vec(1.2, 1.2, 1.2));
        this.matrix.translate(new vec(0, 0, -7));
    };

    this.render = function() {
        this.framebuffer.enable();
        this.quadrangle.draw();
        this.framebuffer.disable();
        this.box.draw();
    };
}