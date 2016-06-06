function unitSimple() {
    
    this.init = function(anim) {
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
    };
    
    this.response = function() {
    };

    this.render = function() {
        this.quadrangle.draw();
    };
}