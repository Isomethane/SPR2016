function unitCheckers() {
    
    this.size = {value : parseFloat(document.getElementById("Size").value)};

    this.init = function(anim) {
        var mtl = new material(anim.render.context);
        mtl.setShader("checkers");
        mtl.addFloatUniform(this.size, "size");
        var p0 = new vec(-0.5, -0.5,  0);
        var p1 = new vec(-0.5,  0.5,  0);
        var p2 = new vec( 0.5,  0.5,  0);
        var p3 = new vec( 0.5, -0.5,  0);
        this.quadrangle = createQuadrangle(anim.render.context, p0, p1, p2, p3, mtl);
    };

    this.response = function() {
        this.size.value = parseFloat(document.getElementById("Size").value);
    };

    this.render = function() {
        this.quadrangle.draw();
    };
}